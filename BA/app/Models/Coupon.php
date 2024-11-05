<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Coupon extends Model
{
    use HasFactory;

    protected $fillable = [
        'name_coupon',
        'code_name',
        'discount_type',
        'discount_value',
        'minium_order_value',
        'start_date',
        'end_date'
    ];
}
