<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Order_detail extends Model
{
    use HasFactory;
    protected $fillable = [
        'product_name',
        'quantity',
        'price',
        'color',
        'size',
        'order_id'
    ];
    public function order()
    {
        return $this->belongsTo(Order::class, 'order_id');
    }
}
