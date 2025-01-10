<?php

namespace App\Http\Controllers;

use App\Models\Order;
use App\Models\Order_detail;
use Carbon\Carbon;
use App\Models\CartItem;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Mail;
use App\Mail\OrderInvoiceMail;
use App\Models\User;

class OrderController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $orders = Order::with('user')->get();
        $orders = $orders->map(function ($order) {
            $order->usern = $order->user->name;
            unset($order->user);
            return $order;
        });
        return response()->json($orders);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }
    public function revenueByMonth()
    {
        // Lấy doanh thu nhóm theo tháng trong năm
        $revenueByMonth = Order::where('status', 3) // Lọc các đơn hàng có trạng thái 2
            ->select(DB::raw('MONTH(created_at) as month'), DB::raw('SUM(amount) as total_revenue'))
            ->whereYear('created_at', Carbon::now()->year) // Lọc theo năm hiện tại
            ->groupBy(DB::raw('MONTH(created_at)'))
            ->orderBy('month')
            ->get();

        // Nếu không có doanh thu trong tháng nào, điền giá trị 0 cho tháng đó
        $allMonths = collect(range(1, 12)); // Mảng các tháng trong năm
        $revenueByMonth = $allMonths->map(function ($month) use ($revenueByMonth) {
            $monthData = $revenueByMonth->firstWhere('month', $month);
            return [
                'month' => $month,
                'total_revenue' => $monthData ? $monthData->total_revenue : 0,
            ];
        });

        return response()->json($revenueByMonth);
    }
    public function totalAmountStatusTwo()
    {
        $totalAmount = Order::where('status', 3)
            ->sum('amount');

        return response()->json(['total_amount' => $totalAmount]);
    }
    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        try {
            $userId = Auth::user()->id;
            // DB::beginTransaction();
            $order = Order::create(
                [
                    "status" => 0,
                    "shipping_address" => $request->shipping_address,
                    "username" => $request->shipping_name,
                    "shipping_phone" => $request->shipping_phone,
                    "amount" => $request->amount,
                    "user_id" => $userId,
                    "payment_type" => $request->payment_type,
                    "bankname" => $request->bankname ?? '',
                    "account_number" => $request->account_number ?? ''
                ]
            );

            if ($order) {
                foreach ($request->orderDetailsData as $detail) {
                    Order_detail::create([
                        'order_id' => $order->id,
                        'product_name' => $detail['product_name'],
                        'quantity' => $detail['quantity'],
                        'price' => $detail['price']
                    ]);
                }
                CartItem::where('user_id', $userId)->delete();
            }

            return response()->json([
                'success' => true,
                'message' => 'Order created successfully and cart cleared',
                'data' => $order
            ]);
        } catch (\Exception $e) {
            return response()->json($e->getMessage());
        }

    }

    /**
     * Display the specified resource.
     */
    public function show(Order $order)
    {
        $order->load(['user:id,name', 'orderDetails']);
        $order->usern = $order->user->name;
        unset($order->user);

        return response()->json($order);
    }
    public function getOrdersByUser($userId)
    {
        $orders = Order::where('user_id', $userId)
            ->with(['orderDetails', 'user:id,name'])
            ->get();
        $orders->each(function ($order) {
            $order->usern = $order->user->name;
            unset($order->user);
        });

        return response()->json($orders);
    }

    public function updateOrderStatus(Request $request, $id)
    {
        try {
            $status = $request->input('status');
            if (!is_numeric($status) || !in_array($status, [0, 1, 2, 3, 4, 5])) {
                return response()->json(['message' => 'Trạng thái không hợp lệ'], 400);
            }
            $order = Order::find($id);
            $orderDetail = Order_detail::join('orders', 'orders.id', '=', 'order_details.order_id')
                ->where('order_id', $id)
                ->get();
            if (!$order) {
                return response()->json(['message' => 'Không tìm thấy đơn hàng với ID ' . $id], 404);
            }
            switch ($order->status) {
                case 0:
                    if ($status == 1) {
                        $order->status = 1;
                        $userId = $order->user_id;
                        $userEmail = User::where('id', $userId)->first();
                        if ($userEmail) {
                            Mail::to($userEmail->email)->send(new OrderInvoiceMail($order, $orderDetail));
                        }
                    }
                case 1:
                    if ($status == 2) {
                        $order->status = 2;
                    }
                    break;
                case 2:
                    if ($status == 3) {
                        $order->status = 3;
                    }
                    break;
                case 3:
                    if ($status == 5) {
                        $order->status = 5;
                    }
                    break;
                case 4:
                    break;
                default:
                    return response()->json(['message' => 'Không thể chuyển trạng thái này'], 400);
            }
            $order->save();

            return response()->json([
                'message' => 'Cập nhật trạng thái thành công',
                'order' => $order,
                'new_status' => $order->status
            ], 200);

        } catch (\Exception $exception) {
            return response()->json([
                'error' => $exception->getMessage(),
                'success' => false,
                'message' => 'Cập nhật trạng thái đơn hàng không thành công.'
            ], 500);
        }
    }

}
