<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Shipping_address extends Model
{
    use HasFactory;
    protected $fillable = [
        'user_id',
        'shipping_phone',
        'shipping_street',
        'shipping_city',
    ];
}
