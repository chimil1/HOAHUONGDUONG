<?php

namespace App\Http\Controllers;

use App\Models\Product;
use App\Models\Product_image;
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
            $request->validate([
                'product_name' => 'required|min:10|max:255',
                'price' => 'required|numeric',
                'status' => 'required|numeric',
                'category_id' => 'required|exists:categories,id',
                'images' => 'required',
            ]);

            $product = Product::create($request->all());

            if ($product) {
                if (is_array($request->images) && count($request->images) > 1) {
                    foreach ($request->images as $imageUrl) {
                        Product_image::create([
                            'product_img' => $imageUrl,
                            'product_id' => $product->id,
                        ]);
                    }
                } else {
                    Product_image::create([
                        'product_img' => $request->images,
                        'product_id' => $product->id,
                    ]);
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
        $product->load('images');
        return response()->json($product);
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
