<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    protected $fillable = [
        'status',
        'shipping_phone',
        'shipping_address',
        'amount',
        'payment_type',
        'bankname',
        'account_number',
        'user_id',
    ];
    public function user()
    {
        return $this->belongsTo(User::class);
    }
}