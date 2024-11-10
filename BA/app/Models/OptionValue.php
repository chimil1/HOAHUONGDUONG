<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class OptionValue extends Model
{
    protected $fillable = ['number_value','option_id', 'product_id', 'value_name'];

    public function option()
    {
        return $this->belongsTo(Option::class);
    }
    public function product()
    {
        return $this->belongsTo(Product::class);
    }
}
