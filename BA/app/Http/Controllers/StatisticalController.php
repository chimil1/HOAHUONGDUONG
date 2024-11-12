<?php

namespace App\Http\Controllers;

use App\Models\Order;
use App\Models\Order_detail;
use Illuminate\Support\Facades\DB;

class StatisticalController extends Controller
{
    // Lấy thông tin tất cả đơn hàng
    public function order()
    {
        // Lấy tất cả các đơn hàng
        $orders = Order::all();
        
        // Trả về dữ liệu JSON
        return response()->json($orders);
    }

    // Lấy thống kê
    public function getStatistics()
    {
        // Tính tổng thu nhập từ bảng order_details (giả sử giá và số lượng tính tổng thu nhập)
        $totalEarningsToday = Order::whereDate('created_at', today())->sum('amount');

        // Đếm số lượng sản phẩm
        $productCount = Order_detail::where('product_id', '!=', null)->count();

        // Trả về dữ liệu thống kê dưới dạng JSON
        return response()->json([
            'totalEarningsToday' => $totalEarningsToday,
            'productCout' => $productCount,
            // 'servicePercent' => $servicePercent,
        ]);
    }
}
