<?php

namespace App\Models;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ShippingAddress extends Model
{

    use HasFactory;
    protected $table = 'shipping_addresses';
    protected $fillable = ['user_id', 'shipping_phone', 'shipping_address','shipping_name'];
    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
