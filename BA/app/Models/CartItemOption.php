<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CartItemOption extends Model
{
    use HasFactory;

    protected $fillable = [
        'cart_item_id',
        'sku_value_id',
    ];

    // Quan hệ với bảng CartItem
    public function cartItem()
    {
        return $this->belongsTo(CartItem::class);
    }

    // Quan hệ với bảng SkuValue
    public function skuValue()
    {
        return $this->belongsTo(SkuValue::class);
    }
}