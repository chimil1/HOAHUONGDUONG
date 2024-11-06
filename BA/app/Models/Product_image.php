<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
class Product_image extends Model
{
    use HasFactory;

    protected $table = 'product_images';

    protected $fillable = [
        'product_img',
        'product_id',
    ];

    public function product()
    {
        return $this->belongsTo(Product::class,'id');
    }
}
