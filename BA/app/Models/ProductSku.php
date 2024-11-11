<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ProductSku extends Model
{
    protected $fillable = ['product_id', 'sku', 'price'];

    public function product()
    {
        return $this->belongsTo(Product::class);
    }

    public function skuValues()
    {
        return $this->hasMany(SkuValue::class);
    }
}
