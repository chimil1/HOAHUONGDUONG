<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Order_detail extends Model
{
    protected $fillable = [
        'product_name',
        'quantity',
        'price',
        'color',
        'size',
        'order_id',
    ];
}
