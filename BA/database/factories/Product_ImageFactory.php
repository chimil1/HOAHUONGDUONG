<?php

namespace Database\Factories;

use App\Models\Product;
use App\Models\Product_image;
use Illuminate\Database\Eloquent\Factories\Factory;

class Product_imageFactory extends Factory
{
    protected $model = Product_image::class;

    public function definition()
    {
        return [
            'product_img' => $this->faker->imageUrl(640, 480, 'products'),
            'product_id' => Product::factory(),
        ];
    }
}
