<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    use HasFactory;
    protected $fillable = [
        'product_name',
        'description',
        'status',
        'price',
        'category_id'
    ];

    public function images()
    {
        return $this->hasMany(Product_image::class);
    }
    public function reviews()
    {
        return $this->hasMany(Review::class);
    }
    public function options()
    {
        return $this->hasMany(Option::class);
    }
    public function optionValues()
    {
        return $this->hasMany(OptionValue::class);
    }
    public function productSkus()
    {
        return $this->hasMany(ProductSku::class);
    }
    public function skuValues()
    {
        return $this->hasMany(SkuValue::class);
    }
    public function category()
    {
        return $this->belongsTo(Category::class);
    }
}
