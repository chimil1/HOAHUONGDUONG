<?php

namespace Database\Factories;

use App\Models\Category;
use Illuminate\Database\Eloquent\Factories\Factory;

class CategoryFactory extends Factory
{
    protected $model = Category::class;

    public function definition()
    {
        $trousers = ['Quần short', 'Quần dài', 'Quần Jeans'];
        $shirt = ['Áo thun', 'Áo sơ mi', 'Áo Polo'];
        $shoes = ['Giày thể thao', 'Giày sandal', 'Giày da'];
        $accessories = ['Đồng hồ', 'Nhẫn', 'Dây chuyền', 'Vòng tay'];
        $productNames = array_merge($trousers, $shirt, $shoes, $accessories);
        static $index = 0;
        if ($index >= count($productNames)) {
            $index = 0;
        }

        return [
            'name' => $productNames[$index++],
            'description' => $this->faker->sentence(),
            'img' => $this->faker->imageUrl(640, 480, 'categories'),
            'status' => $this->faker->randomElement([1, 0]),
        ];
    }
}
