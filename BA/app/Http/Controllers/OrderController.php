<?php

namespace App\Http\Controllers;

use App\Mail\OrderSendMail;
use App\Models\Order;
use App\Models\Order_detail;
use Carbon\Carbon;
use App\Models\CartItem;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Mail;
use App\Models\User;
use Illuminate\Support\Facades\Log;

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
                // CartItem::where('user_id', $userId)->delete();
            }

            if ($request->payment_type === "1") {
                // Thông tin VNPay
                $vnp_TmnCode = env('VNP_TMNCODE');
                $vnp_HashSecret = env('VNP_HASHSECRET');
                $vnp_Url = env('VNP_URL');
                $vnp_Returnurl = env('VNP_RETURNURL');

                $vnp_TxnRef = $order->id; // Mã giao dịch là ID đơn hàng
                $vnp_OrderInfo = "Thanh toán đơn hàng #" . $order->id;
                $vnp_Amount = $request->amount * 100; // Số tiền (đơn vị VNĐ)
                $vnp_IpAddr = "127.0.0.1";
                $vnp_Locale = 'vn';
                $vnp_BankCode = '';
                $vnp_ExpireDate = date('YmdHis', strtotime('+15 minutes'));

                // Dữ liệu gửi đến VNPay
                $inputData = [
                    "vnp_Version" => "2.1.0",
                    "vnp_TmnCode" => $vnp_TmnCode,
                    "vnp_Amount" => $vnp_Amount,
                    "vnp_Command" => "pay",
                    "vnp_CreateDate" => date('YmdHis'),
                    "vnp_CurrCode" => "VND",
                    "vnp_IpAddr" => $vnp_IpAddr,
                    "vnp_Locale" => $vnp_Locale,
                    "vnp_OrderInfo" => $vnp_OrderInfo,
                    "vnp_OrderType" => "billpayment",
                    "vnp_ReturnUrl" => $vnp_Returnurl,
                    "vnp_TxnRef" => $vnp_TxnRef,
                    // "vnp_BankCode" => $vnp_BankCode,
                    // "vnp_ExpireDate"=>$vnp_ExpireDate,
                ];

                if (isset($vnp_BankCode) && $vnp_BankCode != "") {
                    $inputData['vnp_BankCode'] = $vnp_BankCode;
                }

                // Sắp xếp tham số
                ksort($inputData);
$query = "";
                $i = 0;
                $hashdata = "";
                foreach ($inputData as $key => $value) {
                    if ($i == 1) {
                        $hashdata .= '&' . urlencode($key) . "=" . urlencode($value);
                    } else {
                        $hashdata .= urlencode($key) . "=" . urlencode($value);
                        $i = 1;
                    }
                    $query .= urlencode($key) . "=" . urlencode($value) . '&';
                }

                $vnp_Url = $vnp_Url . "?" . $query;
                if (isset($vnp_HashSecret)) {
                    $vnpSecureHash =   hash_hmac('sha512', $hashdata, $vnp_HashSecret); //  
                    $vnp_Url .= 'vnp_SecureHash=' . $vnpSecureHash;
                }
                return response()->json([
                    'success' => true,
                    'message' => 'Redirect to VNPay',
                    'url' => $vnp_Url,
                ]);
            } else {
                return response()->json([
                    'success' => true,
                    'message' => 'Order created successfully and cart cleared',
                    'data' => $order
                ]);
            }
        } catch (\Exception $e) {
            return response()->json($e->getMessage());
        }
    }


    public function vnpayReturn(Request $request)
    {

        $vnp_HashSecret = env('VNP_HASHSECRET');
        $inputData = array();
        $returnData = array();

        foreach ($_GET as $key => $value) {
            if (substr($key, 0, 4) == "vnp_") {
                $inputData[$key] = $value;
            }
        }

        $vnp_SecureHash = $inputData['vnp_SecureHash'];
        unset($inputData['vnp_SecureHash']);
        ksort($inputData);
        $i = 0;
        $hashData = "";
        foreach ($inputData as $key => $value) {
            if ($i == 1) {
                $hashData = $hashData . '&' . urlencode($key) . "=" . urlencode($value);
            } else {
                $hashData = $hashData . urlencode($key) . "=" . urlencode($value);
                $i = 1;
            }
        }

        $secureHash = hash_hmac('sha512', $hashData, $vnp_HashSecret);
        $vnpTranId = $inputData['vnp_TransactionNo']; //Mã giao dịch tại VNPAY
        $vnp_OrderInfo = $inputData['vnp_OrderInfo']; //Mã đơn hàng
        $vnp_BankCode = $inputData['vnp_BankCode']; //Ngân hàng thanh toán
        $vnp_Amount = $inputData['vnp_Amount'] / 100; // Số tiền thanh toán VNPAY phản hồi

        $Status = 0;
        $orderId = $inputData['vnp_TxnRef'];

        try {
            if ($secureHash == $vnp_SecureHash) {
                $order = NULL;
                if ($order != NULL) {
                    if ($order["Amount"] == $vnp_Amount) {
                        if ($order["Status"] != NULL && $order["Status"] == 0) {
                            if ($inputData['vnp_ResponseCode'] == '00' || $inputData['vnp_TransactionStatus'] == '00') {
                                $Status = 0;
                                $updateOrder = Order::find($vnp_OrderInfo);
                                $updateOrder->update([
                                    'bankname' => $vnp_BankCode,
                                    'account_number' => $vnpTranId,
                                    'status' => $Status,
                                ]);
                            } else {
                                $Status = 2; // Trạng thái thanh toán thất bại / lỗi
                            }
                            $returnData['RspCode'] = '00';
                            $returnData['Message'] = 'Thanh toán hóa đơn thành công';
                        } else {
                            $returnData['RspCode'] = '02';
                            $returnData['Message'] = 'Thanh toán hóa đơn thất bại';
                        }
                    } else {
                        $returnData['RspCode'] = '04';
                        $returnData['Message'] = 'invalid amount';
                    }
                } else {
                    $returnData['RspCode'] = '01';
                    $returnData['Message'] = 'Order not found';
                }
            } else {
                $returnData['RspCode'] = '97';
                $returnData['Message'] = 'Invalid signature';
            }
        } catch (\Exception $e) {
            $returnData['RspCode'] = '99';
            $returnData['Message'] = 'Unknow error';
        }
        //Trả lại VNPAY theo định dạng JSON
        echo json_encode($returnData);
        return response()->json($returnData);
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

            // Kiểm tra trạng thái mới hợp lệ
            if (!is_numeric($status) || !in_array($status, [0, 1, 2, 3, 4, 5])) {
                return response()->json(['message' => 'Trạng thái không hợp lệ'], 400);
            }

            $order = Order::find($id);

            // Kiểm tra đơn hàng tồn tại
            if (!$order) {
                return response()->json(['message' => 'Không tìm thấy đơn hàng với ID ' . $id], 404);
            }

            // Xử lý logic chuyển trạng thái
            switch ($order->status) {
                case 0: // Chờ xác nhận
                    if ($status == 1) { // Xác nhận đơn hàng
                        $order->status = 1;
                        // Gửi email thông báo cho khách hàng
                        $userId = $order->user_id;
                        $userEmail = User::where('id', $userId)->first();
                        $orderDetail = Order_detail::join('orders', 'orders.id', '=', 'order_details.order_id')
                            ->where('order_id', $id)
                            ->get();
                        if ($userEmail) {
                            Mail::to($userEmail->email)->send(new OrderSendMail($order, $orderDetail));
                        }
                    } elseif ($status == 4) { // Hủy đơn hàng
                        $order->status = 4;
                        $order->save();
                    }
                    break;

                case 1: // Đã xác nhận
                    if ($status == 2) { // Đang vận chuyển
                        $order->status = 2;
                    } elseif ($status == 4) { // Hủy đơn hàng
                        $order->status = 4;
                    }
                    break;

                case 2: // Đang vận chuyển
                    if ($status == 3) { // Hoàn thành
                        $order->status = 3;
                    }
                    break;

                case 3: // Hoàn thành
                    if ($status == 5) { // đánh giá
                        $order->status = 5;
                    }
                    break;

                case 4: // Đã hủy
                    return response()->json(['message' => 'Đơn hàng đã hủy, không thể thay đổi trạng thái'], 400);

                default:
                    return response()->json(['message' => 'Không thể chuyển trạng thái này'], 400);
            }

            // Lưu trạng thái mới
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
