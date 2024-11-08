<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Statistical extends Model
{
    use HasFactory;

    protected $table = 'statisticals';  
    protected $primaryKey = 'id';       
    public $timestamps = false;         
    protected $fillable = [
        'field1', 
        'field2',
        'field3',
    ];

    // Liên kết với Order
    public function orders()
    {
        return $this->hasMany(Order::class, 'statistical_id', 'id');
    }

    // Liên kết với OrderDetail thông qua Order
    public function orderDetails()
    {
        return $this->hasManyThrough(Order_Detail::class, Order::class, 'statistical_id', 'order_id', 'id', 'id');
    }
}
