<?php

namespace App\Http\Controllers;

use App\Models\Review;
use App\Models\Product;
use Illuminate\Http\Request;

class ReviewController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $products = Product::has('reviews')->withCount('reviews')
            ->with('images:product_id,product_img')
            ->get();
        $products = $products->map(function ($product) {
            return [
                'id' => $product->id,
                'name' => $product->product_name,
                'img' => $product->images->first()->product_img,
                'review_count' => $product->reviews_count,
            ];
        });
        return response()->json($products);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
{
    // Xác thực dữ liệu từ request
    $validatedData = $request->validate([
        'product_id' => 'required|exists:products,id', // Kiểm tra sản phẩm có tồn tại không
        'review' => 'required|string|max:500', // Nội dung đánh giá (tối đa 500 ký tự)
        'rating' => 'required|integer|min:1|max:5', // Đánh giá sao từ 1 đến 5
        'name' => 'required|string|max:255', // Tên của người đánh giá
        'email' => 'nullable|email|max:255', // Email tuỳ chọn, phải là email hợp lệ
    ]);

    // Tạo review mới trong cơ sở dữ liệu
    $review = new Review();
    $review->product_id = $validatedData['product_id'];
    $review->review = $validatedData['review'];
    $review->rating = $validatedData['rating'];
    $review->name = $validatedData['name'];
    $review->email = $validatedData['email'] ?? null; // Email có thể không có

    // Lưu review
    $review->save();

    // Trả về phản hồi JSON
    return response()->json([
        'message' => 'Đánh giá đã được lưu thành công',
        'review' => $review
    ], 201); // HTTP 201: Created
}


    /**
     * Display the specified resource.
     */
    public function show($id)
    {
            $product = Product::with('reviews')->find($id);
            return response()->json([
                'id' => $product->id,
                'product_name' => $product->name,
                'review_count' => $product->reviews->count(),
            ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Review $review)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Review $review)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Review $review)
    {
        //
    }
    public function getReviewsByProduct($id)
{
    $reviews = Review::where('product_id', $id)->get();
    return response()->json($reviews);
}

}
