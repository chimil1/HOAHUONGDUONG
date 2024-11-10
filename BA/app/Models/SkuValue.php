<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class SkuValue extends Model
{
    protected $fillable = ['product_sku_id', 'product_id', 'option_id', 'option_value_id'];

    

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
