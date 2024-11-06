<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Review extends Model
{
    use HasFactory;
    protected $fillable = [
        'rating',
        'comment',
        'user_id',
        'product_id',
        'order_id'
    ];
    public function product()
    {
        return $this->hasMany(Product::class);
    }
}
