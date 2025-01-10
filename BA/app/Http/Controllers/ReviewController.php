<?php

namespace App\Http\Controllers;

use App\Models\Review;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

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
        $validatedData = $request->validate([
            'product_id' => 'required|exists:products,id', // ID sản phẩm phải tồn tại trong bảng products
            'user_id' => 'required|exists:users,id', // ID người dùng phải tồn tại trong bảng users
            'rating' => 'required|integer|min:1|max:5', // Rating phải là số nguyên từ 1 đến 5
            'comment' => 'required|string', // Bình luận phải là chuỗi không được để trống
        ]);
    
        $review = Review::create($validatedData);
    
        return response()->json($review, 201); // Trả về JSON với mã trạng thái 201 (created)
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
{
    try {
        //code...
        $userId = Auth::user()->id;
        $review = Review::create([
            'rating' => $request->rating,
            'comment' => $request->comment,
            'user_id' => $userId,
            'product_id' => $request->productId,
            // 'order_id' => $request->orderId,
        ]);
        return response()->json($review);
    } catch (\Exception $e) {
        return response()->json([
            'error' => "Lỗi khi gửi comment: ". $e->getMessage()],500
        );
    }

}



    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        $relatedProducts = Review::where('product_id', $id)->get();
        return response()->json(  $relatedProducts);
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
    public function lockComment($id)
{
    try{
        $comment = Review::find($id);

        if (!$comment) {
            return response()->json(['message' => 'Bình luận không tồn tại'], 404);
        }
    
        // Cập nhật trạng thái khóa bình luận
        $comment->status = 1;
        $comment->update();
        return response()->json($comment);
    }catch (\Exception $e) {
        return response()->json([
            'error' => "Lỗi: ". $e->getMessage()],500
        );
    }
   
}

}
