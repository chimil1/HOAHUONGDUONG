<?php

namespace App\Http\Controllers;

use App\Models\Order;
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
        //
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
    public function approveOrder($id)
    {
        try{
            $order = Order::find($id);
            if (!$order) {
                return response()->json(['message' => 'Không tìm thấy đơn hàng'], 404);
            }

            // Cập nhật trạng thái đơn hàng thành "Đã duyệt"
            $order->status = 0; // 0: Đã duyệt, 1: Chờ xác nhận (hoặc các trạng thái khác)
            $order->update();

            return response()->json(['message' => 'Đơn hàng đã được duyệt thành công', 'order' => $order], 200);
        }catch(\Exception $exception){
            return response()->json([
                'error' => $exception,
                'success' => false,
                'message' => 'Thêm dữ liệu không thành công.',
            ], 500);

        }

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
