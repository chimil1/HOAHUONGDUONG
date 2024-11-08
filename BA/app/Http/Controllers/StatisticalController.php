<?php

namespace App\Http\Controllers;

use App\Models\Order;
use App\Models\Order_detail; 
use Illuminate\Support\Facades\DB;

class StatisticalController extends Controller
{
    public function order()
    {
        // Lấy tất cả các đơn hàng
        $orders = Order::all();
        
        // Trả về dữ liệu JSON
        return response()->json($orders);
    }

    public function getStatistics()
    {
        // Tính tổng thu nhập từ bảng order_details
        $totalEarnings = Order_detail::sum(DB::raw('price * quantity'));

        // Đếm số sản phẩm
        $productCount = Order_detail::count();

        // Ví dụ tính toán tỷ lệ dịch vụ (giả định)
        $servicePercent = 50; 

        // Trả về dữ liệu JSON
        return response()->json([
            'totalEarnings' => $totalEarnings,
            'productPercent' => $productCount,  
            'servicePercent' => $servicePercent, 
        ]);
    }
}
