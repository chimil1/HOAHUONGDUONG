<?php

namespace Database\Factories;

use App\Models\Category;
use App\Models\Product;
use Illuminate\Database\Eloquent\Factories\Factory;

class ProductFactory extends Factory
{
    protected $model = Product::class;

    public function definition()
    {
        $shirts = ['Áo Sơ Mi Trơn Tay Dài Form Regular SM088 Màu Đỏ Đô', 'Áo Overshirt Vải Caro Flannel Thêu Heritage Form Loose SM166 Caro Xanh Lá', 'Áo Sơ Mi Vải Oxford Sọc Phối Cổ Trắng Form Regular SM165 Màu Sọc Be', 'Áo Sơ Mi Oxford Thêu Logo 4M SM085 Màu Xanh Đen'];
        $tshirts = ['ÁÁo Thun In Cao Leisure Form Slimfit AT158 Màu Trắng', 'Áo Thun Cổ Tròn Form Regular AT152 Màu Trắng', 'Áo Thun In Thấm Graphic Vợt Tennis Form Regular AT150', 'Áo Thun Sọc Ngang Nautical Thêu Hình Ở Ngực Form Regular AT149 Màu Sọc Xanh Đen'];
        $shoes = ['Giày Thể Thao Trơn G010 Màu Đen', 'Giày Slip On Jeans G016 Màu Đen', 'Giày Tây 4MEN G014 Màu Đen', 'Giày Chelsea Boots All Black G018 Màu Đen','Dép sandal quai chéo da Microfiber đế TPR','Dép da Microfiber đế trấu DE003'];
        $accessories = ['Tissot Le Locle Powermatic 80', 'Doxa Noble D173TCM', 'Lắc tay Cuban bạc phiên bản 13mm đặc LTA0081', 'Vòng tay bạc nam trơn đơn giản LTA0053','Nhẫn cặp đôi bạc đính kim cương Moissanite Layla LILI_054884','Nhẫn bạc nam đính kim cương Moissanite Kane LILI_833779'];
        $productNames = array_merge($shirts, $tshirts, $shoes, $accessories);

        return [
            'product_name' => $this->faker->randomElement($productNames),
            'price' => $this->faker->numberBetween(10000, 100000),
            'description' => $this->faker->sentence(),
            'status' => $this->faker->randomElement([1, 0]),
            'category_id' => Category::factory(),
        ];
    }
}
