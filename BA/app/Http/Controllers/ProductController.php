<?php

namespace App\Http\Controllers;

use App\Models\Product;
use App\Models\Category;
use App\Models\Product_image;
use App\Models\SkuValue;

use Illuminate\Http\Request;
use Illuminate\Support\Arr;

class ProductController extends Controller
{
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
                'status' => 'required',
                'category_id' => 'required',
                // 'images' => 'required',
            ]);
            
            $product = Product::create($request->all());
            if ($product) {
                if ($request->hasFile('images')) {
                    foreach ($request->file("images") as $image) {
                        $filename = time() . '-' . $image->getClientOriginalName();
                        $image->storeAs('images', $filename, 'public');
                        $img = new Product_image();
                        $img->product_id = $product->id;
                        $img->product_img = $filename;
                        $img->save();
                    }
                }
                // Save options
                if ($request->input('options')) {
                    $options = json_decode($request->input('options'), true);
                    $variants = json_decode($request->input('variants'), true);
                    foreach ($options as $optionIndex => $option) {
                        $optionIndex++;
                        $newOption = $product->options()->create(
                            [
                                'product_id' => $product->id,
                                'option_name' => $option['name'],
                            ]
                        );
                        // Save option values   
                        if ($newOption) {
                            foreach ($option['values'] as $value) {
                                $newOption->optionValues()->create(
                                    [
                                        'product_id' => $product->id,
                                        'option_id' => $newOption->id,
                                        'value_name' => $value
                                    ]
                                );
                            }
                        }
                    }
                    // 2. Tạo tổ hợp từ options
                    $optionValues = Arr::pluck($options, 'values');
                    $combinations = $this->generateCombinations($optionValues, $variants);
                    foreach ($combinations as $index => $skuValue) {
                        SkuValue::create([
                            'product_id' => $product->id,
                            'sku_value' => $skuValue['sku_value'],
                            'quantity_sku' => $skuValue['quantity'],
                            'price_sku' => $skuValue['price'],
                        ]);
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
                ->with('images:product_id,product_img')
                ->get();

            foreach ($relatedProducts as $relatedProduct) {
                // Gán hình ảnh đầu tiên vào thuộc tính riêng
                $relatedProduct->product_img = $relatedProduct->images->first()?->product_img ?? null;

                // Xóa mối quan hệ images để tinh gọn dữ liệu
                unset($relatedProduct->images);
            }
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
            ->first();
        if (!$product) {
            return response()->json(['error' => 'Product not found'], 404);
        }

        $coupon = $product->coupon;

        $finalPrice = $product->price;

        if ($coupon) {
            if ($coupon->discount_type == 'percentage') {
                $finalPrice = $product->price * (1 - $coupon->discount_value / 100);
            } elseif ($coupon->discount_type == 'fixed') {

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
            'final_price' => $finalPrice
        ]);
    }

    public function destroy(Product $product)
    {
        $product->delete();
        return response()->json(['message' => 'Xóa sản phẩm thành công.']);
    }

    private function generateCombinations($options, $variants)
    {
        // Tạo tất cả các tổ hợp từ danh sách options
        $result = [[]];
        foreach ($options as $propertyValues) {
            $tmp = [];
            foreach ($result as $resultItem) {
                foreach ($propertyValues as $propertyValue) {
                    $tmp[] = array_merge($resultItem, [$propertyValue]);
                }
            }
            $result = $tmp;
        }

        // Biến tổ hợp thành chuỗi dạng "Red-S", "Blue-M", ...
        $flattenedOptions = array_map(fn($combination) => implode('-', $combination), $result);

        // Kết hợp tổ hợp với variants
        $flattenedVariants = [];
        foreach ($flattenedOptions as $index => $skuValue) {
            $variantIndex = floor($index / count($variants[0]['quantityOption'])); // Xác định variant
            $innerIndex = $index % count($variants[0]['quantityOption']); // Xác định index bên trong variant

            $quantity = $variants[$variantIndex]['quantityOption'][$innerIndex] ?? 0;
            $price = $variants[$variantIndex]['priceOption'][$innerIndex] ?? 0;

            $flattenedVariants[] = [
                'sku_value' => $skuValue,
                'quantity' => $quantity,
                'price' => $price,
            ];
        }

        return $flattenedVariants;
    }

}
