<?php

namespace App\Http\Controllers;

use App\Models\CartItem;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\CartItemOption;
use App\Models\SkuValue;

class CartItemController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        try{
            $userId = Auth::id(); // Hoặc lấy từ token nếu sử dụng API authentication

            // Lấy các sản phẩm trong giỏ hàng của người dùng
            $cartItems = CartItem::where('user_id', $userId) 
            ->with('product') // Nếu bạn muốn thông tin sản phẩm đi kèm
                ->get();
    
            return response()->json($cartItems);
        }catch(\Exception $e){
            return response()->json($e->getMessage());
        }
      
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }


    public function store(Request $request)
    {
        try {
            // Lấy thông tin người dùng, sản phẩm, số lượng và các tùy chọn
            $userId = Auth::user()->id;
            $productId = $request->product_id;
            $quantity = $request->quantity;
            // $options = $request->options; // Mảng tùy chọn (option_id và option_value_id)

            // Lấy danh sách option_value_id từ mảng options
            // $optionValueIds = array_column($options, 'option_value_id');

            // Tìm kiếm CartItem với product_id và các option_value_id
            $cartItem = CartItem::where('user_id', $userId)
                ->where('product_id', $productId)
                ->first();


            // Nếu CartItem chưa tồn tại, tạo mới CartItem
            if (!$cartItem) {
                $cartItem = CartItem::create([
                    'user_id' => $userId,
                    'product_id' => $productId,
                    'quantity' => $quantity,
                ]);
            } else {
                $cartItem->quantity += $quantity;
                $cartItem->save();
                return response()->json([
                    'message' => 'Thêm giỏ hàng thành công',
                    'cart_item' => $cartItem->load('options.skuValue') // Load các tùy chọn liên quan
                ]);
            }

            // Kiểm tra hoặc tạo các tùy chọn vào CartItemOption
            // foreach ($options as $option) {
            //     // Lấy sku_value_id từ option_value_id
            //     $skuValue = SkuValue::where('option_id', $option['option_id'])
            //         ->where('product_id', $productId)
            //         ->where('option_value_id', $option['option_value_id'])
            //         ->first();

            //     if ($skuValue) {
            //         $cartItemOption = CartItemOption::where('cart_item_id', $cartItem->id)
            //             ->where('sku_value_id', $skuValue->id)
            //             ->first();

            //         if ($cartItemOption) {
            //             // Nếu CartItemOption đã tồn tại, không cần tạo lại, chỉ cập nhật quantity cho CartItem
            //             $cartItem->quantity += $quantity;
            //             $cartItem->save();
            //             return response()->json([
            //                 'message' => 'Thêm giỏ hàng thành công',
            //                 'cart_item' => $cartItem->load('options.skuValue') // Load các tùy chọn liên quan
            //             ]);
            //         }
            //         // else {
            //         //     CartItemOption::create([
            //         //         'cart_item_id' => $cartItem->id,
            //         //         'sku_value_id' => $skuValue->id,
            //         //     ]);
            //         // }

            //     } else {
            //         // Nếu không tìm thấy sku_value cho option, trả về lỗi
            //         return response()->json(['error' => 'Invalid option values.'], 400);
            //     }
            // }
            // if (!$cartItemOption) {
            //     $cartItem = CartItem::create([
            //         'user_id' => $userId,
            //         'product_id' => $productId,
            //         'quantity' => $quantity,
            //     ]);
            //     foreach ($options as $option) {
            //         $skuValue = SkuValue::where('option_id', $option['option_id'])
            //             ->where('product_id', $productId)
            //             ->where('option_value_id', $option['option_value_id'])
            //             ->first();
            //         CartItemOption::create([
            //             'cart_item_id' => $cartItem->id,
            //             'sku_value_id' => $skuValue->id,
            //         ]);
            //     }
            // }

            // Trả về phản hồi với CartItem đã cập nhật hoặc tạo mới
            return response()->json([
                'message' => 'Product added to cart successfully',
                'cart_item' => $cartItem->load('options.skuValue') // Load các tùy chọn liên quan
            ]);
        } catch (\Exception $e) {
            return response()->json($e->getMessage());
        }
    }
    public function show(Request $request) {}


    /**
     * Show the form for editing the specified resource.
     */
    public function edit(CartItem $cartItem)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(CartItem $cartItem)
    {
        try {
            if ($cartItem->user_id !== Auth::id()) {
                return response()->json(['error' => 'Bạn không có quyền xóa sản phẩm này'], 403);
            }
                $cartItem->delete(); // Xóa sản phẩm khỏi giỏ hàng
                return response()->json(['message' => 'Sản phẩm đã được xóa khỏi giỏ hàng'], 200);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }
    public function update(Request $request, $id)
    {
        $userId = Auth::id(); // Lấy ID của người dùng hiện tại
        $cartItem = CartItem::where('id', $id)->where('user_id', $userId)->first();
    
        if (!$cartItem) {
            return response()->json(['message' => 'Item not found'], 404);
        }
    
        // Cập nhật số lượng
        $cartItem->quantity = $request->input('quantity');
        $cartItem->save();
    
        return response()->json(['message' => 'Item updated successfully', 'data' => $cartItem]);
    }
    
}
