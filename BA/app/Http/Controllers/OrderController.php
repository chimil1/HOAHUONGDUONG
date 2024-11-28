<?php

namespace App\Http\Controllers;

use App\Models\Order;
use App\Models\Order_detail;

use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;

class OrderController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $orders = Order::with('user')->get();
        $orders = $orders->map(function ($order) {
            $order->username = $order->user->name;
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

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $user = Auth::user()->id;

    // Khởi tạo mảng dữ liệu cho đơn hàng
    $orderData = [
        'user_id' => $user->id,
        'status' => 1, // Cài đặt trạng thái ban đầu
        'shipping_phone' => $request->shipping_phone,
        'shipping_address' => $request->shipping_address,
        'amount' => $request->amount,
    ];

    // Thêm thông tin thanh toán nếu payment_type khác 0
    if ($request->payment_type != 0) {
        $orderData['payment_type'] = $request->payment_type;
        $orderData['bankname'] = $request->bankname;
        $orderData['account_number'] = $request->account_number;
    }

    // Tạo đơn hàng mới với dữ liệu đã cấu hình
    $order = Order::create($orderData);

    // Lưu chi tiết đơn hàng
    foreach ($request->order_details as $detail) {
        Order_detail::create([
            'order_id' => $order->id,
            'product_name' => $detail['product_name'],
            'quantity' => $detail['quantity'],
            'price' => $detail['price']
        ]);
    }

    return response()->json([
        'success' => true,
        'message' => 'Order created successfully',
        'data' => $order
    ]);
    }

    /**
     * Display the specified resource.
     */
    public function show(Order $order)
    {
        $order->load(['user:id,name', 'orderDetails']);
        $order->username = $order->user->name;
        unset($order->user);

        return response()->json($order);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Order $order)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Order $order)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Order $order)
    {
        //
    }
}
