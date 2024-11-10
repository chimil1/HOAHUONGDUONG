<?php

namespace App\Http\Controllers;

use App\Models\Product;
use App\Models\Product_image;
use App\Models\SkuValue;

use Illuminate\Http\Request;

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
                'status' => 'required|numeric',
                'category_id' => 'required|exists:categories,id',
                'images' => 'required',
                'options' => 'required',

            ]);

            $product = Product::create($request->all());
            $i = 0;
            $j = 1;
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
                // }
                return response()->json($request->sku);
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
                'options.optionValues',
                'productSkus.skuValues.option',
                'productSkus.skuValues.optionValue'
            ]);
            return response()->json($product);
        } catch (\Exception $e) {
            return response()->json(['error' => 'L��i khi lấy chi tiết sản phẩm: ' . $e->getMessage()], 500);
        }
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Product $product)
    {
        try {
            $request->validate([
                'product_name' => 'required|min:10|max:255',
                'price' => 'required|numeric',
                'status' => 'required|numeric',
                'category_id' => 'required|exists:categories,id',
                // 'images' => 'required',
            ]);

            $product->update($request->all());
            return response()->json($product);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Lỗi khi tạo sản phẩm: ' . $e->getMessage()], 500);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Product $product)
    {
        $product->delete();
        return response()->json(['message' => 'Xóa sản phẩm thành công.']);
    }
}
