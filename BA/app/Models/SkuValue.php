<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class SkuValue extends Model
{

    protected $fillable = ['sku_value', 'product_id', 'quantity_sku', 'price_sku'];
    

    public function productSku()
    {
        return $this->belongsTo(ProductSku::class);
    }
    public function option()
    {
        return $this->belongsTo(Option::class);
    }
    public function optionValue()
    {
        return $this->belongsTo(OptionValue::class);
    }
}
