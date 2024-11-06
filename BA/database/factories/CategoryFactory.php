<?php

namespace Database\Factories;

use App\Models\Category;
use Illuminate\Database\Eloquent\Factories\Factory;

class CategoryFactory extends Factory
{
    protected $model = Category::class;

    public function definition()
    {
        return [
            'name' => $this->faker->randomElement(['Giày', 'Quần', 'Áo', 'Phụ Kiện']),
            'description' => $this->faker->sentence(),
            'img' => $this->faker->imageUrl(640, 480, 'categories'),
            'status' => $this->faker->randomElement([1, 0]),
        ];
    }
}
