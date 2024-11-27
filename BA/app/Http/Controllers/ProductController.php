<?php

namespace App\Http\Controllers;

use App\Models\Product;
use App\Models\Category;
use App\Models\Product_image;
use App\Models\SkuValue;

use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
class ProductController extends Controller

{
    public function getRandomProducts(): JsonResponse
    {
        // Lấy 5 sản phẩm ngẫu nhiên với điều kiện status = 1
        $products = Product::where('status', 1)
            ->inRandomOrder()
            ->take(5)
            ->get();

        return response()->json($products);
    }
   
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $products = Product::with('category')
            ->with('images:product_id,product_img')
            ->get();
        $products->map(function ($product) {
            $product->name_category = $product->category->name;
            $product->img = $product->images->isNotEmpty() ? $product->images->first()->product_img : null;
            unset($product->images);
            unset($product->category);
            return $product;
        });
        return response()->json($products);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        try {

            // Xác thực dữ liệu
            $request->validate([
                'product_name' => 'required',
                'price' => 'required',
                'status' => 'required|numeric',
                'category_id' => 'required',
                'images' => 'required',
            ]);

            $product = Product::create($request->all());
            // Lưu hình ảnh
            if ($request->hasFile('images')) {
                foreach ($request->images as $image) {
                    $path = $image->store('images', 'public');  // Lưu vào thư mục public/products
                    $product->images()->create([
                        'path' => $path,
                        'product_img' => asset('storage/' . $path), // Lưu đường dẫn hình ảnh
                    ]);
                }
            }
            // if ($request->hasFile('images')) {
            //     foreach ($request->file('images') as $image) {
            //         $path = $image->store('images', 'public');
            //         $product->images()->create([
            //             'path' => $path,
            //         ]);
            //     }
            // }

            if ($product) {
                // if (is_array($request->sku) && !empty($request->sku)) {
                // SAVE IMG
                foreach ($request->images as $imageUrl) {
                    Product_image::create([
                        'product_img' => $imageUrl,
                        'product_id' => $product->id,
                    ]);
                }
                // Save options
                if ($request->options) {

                    foreach ($request->options as $optionIndex => $option) {
                        // $price = $request->price[$i] ?? null;
                        // $sku = $request->sku[$index] ?? null;
                        $optionIndex++;
                        $newOption = $product->options()->create(
                            [
                                'product_id' => $product->id,
                                'number_option' => $optionIndex,
                                'option_name' => $option['name'],
                            ]
                        );
                        // Save option values
                        if ($newOption) {
                            foreach ($option['values'] as $index => $value) {
                                $index += 1;
                                $newOptionValue = $newOption->optionValues()->create(
                                    [
                                        'number_value' => $index,
                                        'product_id' => $product->id,
                                        'option_id' => $newOption->id,
                                        'value_name' => $value
                                    ]
                                );
                                $newSku = $product->productSkus()->create(
                                    [

                                        'product_id' => $product->id,
                                        // 'price' => $price,
                                        // 'sku' => $sku,
                                    ]
                                );
                                $newSku->skuValues()->create(
                                    [
                                        'product_sku_id' => $newSku->id,
                                        'product_id' => $product->id,
                                        'option_id' => $newOption->id,
                                        'option_value_id' => $newOptionValue->id
                                    ]
                                );
                            }
                        }
                    }
                }
            }
            return response()->json($product);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Lỗi khi tạo sản phẩm: ' . $e->getMessage()], 500);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(Product $product)
    {
        try {
            $product->load(relations: [
                'images:product_id,product_img',
                'options.optionValues',
                'productSkus.skuValues.option',
                'productSkus.skuValues.optionValue'
            ]);
            return response()->json($product);
        } catch (\Exception $e) {
            return response()->json(['error' => 'L��i khi lấy chi tiết sản phẩm: ' . $e->getMessage()], 500);
        }
    }

    public function getRelatedProducts($category_id)
    {
        try {
            $relatedProducts = Product::where('category_id', $category_id)
            ->get();

            // Check if any products were found
            if ($relatedProducts->isEmpty()) {
                return response()->json([
                    'success' => false,
                    'message' => 'No related products found for this category.'
                ], 404);
            }
                return response()->json($relatedProducts);

        } catch (\Exception $e) {
            return response()->json([
                'error' => $e->getMessage(),
                'success' => false,
                'message' => 'An error occurred while fetching related products. Please try again later.'
            ], 500);
        }
    }


    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        try {
            $request->validate([
                'product_name' => 'required|string|max:255',
                'price' => 'required',
                // 'description' => 'required|string|max:1000',
                'status' => 'required',
                'category_id' => 'required|exists:categories,id',
            ]);
            $product = Product::findOrFail($id);

            // Update the product
            $product->update([
                'product_name' => $request->product_name,
                'description' => $request->description,
                'price' => $request->price,
                'category_id' => $request->category_id,
                'status' => $request->status,
            ]);

            return response()->json([
                'success' => true,
                'message' => 'Sửa dữ liệu thành công.',
                'data' => $product,
            ], 200);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Lỗi khi cập nhật sản phẩm.', $e->getMessage()], 500);
        }
    }
    /**
     * Remove the specified resource from storage.
     */
    public function getProductsWithDiscount($productId)
    {
        // Tìm sản phẩm với coupon liên quan
        $product = Product::with('coupon')
            ->where('id', $productId)
            ->first(); // Lấy sản phẩm đầu tiên

        // Kiểm tra nếu không tìm thấy sản phẩm
        if (!$product) {
            return response()->json(['error' => 'Product not found'], 404);
        }

        // Lấy coupon liên quan
        $coupon = $product->coupon;

        // Tính toán giá sau khi giảm giá
        $finalPrice = $product->price;

        if ($coupon) {
            // Kiểm tra và tính toán theo loại giảm giá
            if ($coupon->discount_type == 'percentage') {
                // Giảm theo phần trăm
                $finalPrice = $product->price * (1 - $coupon->discount_value / 100);
            } elseif ($coupon->discount_type == 'fixed') {
                // Giảm cố định (trừ trực tiếp giá trị giảm)
                $finalPrice = $product->price - $coupon->discount_value;
            }

            // Trừ thêm giá trị minium_order_value của coupon (chỉ nếu có)
            $finalPrice -= $coupon->minium_order_value;
        }

        // Trả về kết quả dưới dạng JSON
        return response()->json([
            'product_id' => $product->id,
            'product_name' => $product->product_name,
            'original_price' => $product->price,
            'name_coupon' => $coupon ? $coupon->name_coupon : null,
            'code_name' => $coupon ? $coupon->code_name : null,
            'discount_type' => $coupon ? $coupon->discount_type : null,
            'discount_value' => $coupon ? $coupon->discount_value : null,
            'minium_order_value' => $coupon ? $coupon->minium_order_value : null,
            'final_price' => $finalPrice // Giá cuối cùng sau khi áp dụng giảm giá
        ]);
    }
    public function destroy(Product $product)
    {
        $product->delete();
        return response()->json(['message' => 'Xóa sản phẩm thành công.']);
    }

}
