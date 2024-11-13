<?php

namespace App\Http\Controllers;

use App\Models\Product;
use App\Models\Category;
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
            // Find the product by ID
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
    public function destroy(Product $product)
    {
        $product->delete();
        return response()->json(['message' => 'Xóa sản phẩm thành công.']);
    }
}
