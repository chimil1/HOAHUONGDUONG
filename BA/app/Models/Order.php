<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    use HasFactory;
    protected $fillable = [
        'status',
        'shipping_phone',
        'shipping_address',
        'amount',
        'payment_type',
        'bankname',
        'account_number',
        'user_id'
    ];
    public function user()
    {
        return $this->belongsTo(User::class);
    }
    public function orderDetails()
    {
        return $this->hasMany(Order_Detail::class, 'order_id');
    }
}