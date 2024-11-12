<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Statistical extends Model
{
    use HasFactory;

    // Tên bảng
    protected $table = 'statisticals';  
    // Khóa chính
    protected $primaryKey = 'id';       
    // Không sử dụng timestamps
    public $timestamps = false;         
    // Các trường có thể được gán giá trị
    protected $fillable = [
        'field1', 
        'field2',
        'field3',
    ];

    // Quan hệ 1-n với Order
    public function orders()
    {
        return $this->hasMany(Order::class, 'statistical_id', 'id');
    }

    // Quan hệ hasManyThrough với OrderDetail thông qua Order
    public function orderDetails()
    {
        return $this->hasManyThrough(Order_detail::class, Order::class, 'statistical_id', 'order_id', 'id', 'id');
    }
    public function storeStatistics()
    {
        // Dữ liệu thống kê giả định
        $data = [
            'field1' => 1200, // Doanh thu hàng Ngày
            'field2' => 5000, // Doanh thu hàng tháng
        ];

        // Lưu dữ liệu thống kê vào bảng 'statisticals'
        $statistical = Statistical::create($data);

        return response()->json([
            'message' => 'Thống kê đã được lưu thành công.',
            'statistical' => $statistical,
        ]);
    }
}
