<?php

namespace App\Http\Controllers;

use App\Models\Order;
use App\Models\Order_detail;
use Carbon\Carbon;
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
   // Lấy thống kê
public function getStatistics()
{
    try {
        $today = Carbon::today();
        $oneWeekAgo = $today->copy()->subDays(6);
        $currentYear = Carbon::now()->year;

        // Lấy dữ liệu tổng giá trị mỗi ngày trong tuần
        $statistics = Order::selectRaw('DATE(created_at) as date, SUM(amount) as total_amount')
            ->whereBetween('created_at', [$oneWeekAgo, $today])
            ->groupBy('date')  // Nhóm theo ngày đã tạo đơn hàng
            ->orderBy('date', 'asc')  // Sắp xếp theo thứ tự ngày tăng dần
            ->get();

        // Đếm số lượng sản phẩm bán được
        $productCount = Order_detail::where('product_id', '!=', null)
            ->whereYear('created_at', $currentYear)
            ->count();

        return response()->json([
            'totalEarningsToday' => $statistics,  // Trả về doanh thu hàng ngày
            'productCount' => $productCount,     // Trả về số sản phẩm bán được
        ]);
    } catch (\Exception $exception) {
        return response()->json(['error' => 'Lỗi khi lấy thống kê: ' . $exception->getMessage()], 500);
    }
}


        // Đếm số lượng sản phẩm

        //     // Trả về dữ liệu thống kê dưới dạng JSON
        //     return response()->json([
        //         'totalEarningsToday' => $dailyEarnings,
        //         'orderCount' => $orderCount,
        //         // 'productCout' => $productCount,
        //         // 'servicePercent' => $servicePercent,
        //     ]);
    }
