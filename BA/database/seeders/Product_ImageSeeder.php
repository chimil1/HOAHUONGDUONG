<?php

namespace Database\Seeders;

use App\Models\Product_image;
use Illuminate\Database\Seeder;

class Product_imageSeeder extends Seeder
{
    public function run()
    {
        Product_image::factory()->count(10)->create();
    }
}
