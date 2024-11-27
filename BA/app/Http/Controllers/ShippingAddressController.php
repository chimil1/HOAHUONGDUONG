<?php

namespace App\Http\Controllers;


use App\Models\ShippingAddress;

use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;

class ShippingAddressController extends Controller
{
    public function index()
    {
        $shippingAddress = ShippingAddress::all();
        return response()->json($shippingAddress);
    }

    public function store(Request $request , $user_id)
    {
        try {
            $validated = $request->validate([
                'shipping_name' => 'required|max:255',
                'shipping_phone' => 'required|max:11',
                'shipping_address' => 'required|max:255',
            ]);
            $validated['user_id'] = $user_id;
            $address = ShippingAddress::create($validated);
            return response()->json([
                'message' => 'Địa chỉ giao hàng đã được thêm thành công',
                'address' => $address
            ], 201);
        } catch (\Exception $exception) {
            return response()->json([
                'error' => 'Không thể thêm địa chỉ giao hàng',
                    'message' => $exception->getMessage()
            ], 500);
        }
    }

    public function show($id)
    {
        $shippingAddress = ShippingAddress::where('user_id', $id)->get();
        return response()->json($shippingAddress);
    }

    public function update(Request $request, $id)
    {
        $address = ShippingAddress::find($id);
        if (!$address) {
            return response()->json(['error' => 'Not Found'], 404);
        }

        $validated = $request->validate([
            'user_id' => 'required|exists:users,id',
            'shipping_phone' => 'required|max:11',
            'shipping_address' => 'required|max:255',
        ]);

        $address->update($validated);

        return response()->json($address);
    }

    public function destroy(ShippingAddress $shipping)
    {
        try {
            $shipping->delete();
            return response()->json(['message' => 'Đã xóa danh mục thành công'], 200);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Danh mục tồn tại sản phẩm không thể xóa',
                'error' => $e->getMessage()
            ], 500);
        }
    }
}

