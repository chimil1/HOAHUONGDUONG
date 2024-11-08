<?php

namespace App\Http\Controllers;

use App\Models\Coupon;
// use App\Http\Requests\CouponRequest;
use Illuminate\Http\Request;

class CouponController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $coupons = Coupon::all();
        return response()->json($coupons);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        try {
            $coupon = Coupon::create([
                'name_coupon' => $request->name_coupon,
                'code_name' => $request->code_name,
                'discount_type' => $request->discount_type,
                'discount_value' => $request->discount_value,
                'minium_order_value' => $request->minium_order_value,
                'start_date' => $request->start_date,
                'end_date' => $request->end_date,
            ]);
            return response()->json([
                'success' => true,
                'message' => 'Thêm dữ liệu thành công.',
                'data' => $coupon,
            ], 201);
        } catch (\Exception $exception) {
            return response()->json([
                'error' => $exception,
                'success' => false,
                'message' => 'Thêm dữ liệu không thành công.',
            ], 500);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(Coupon $coupon)
    {
        return response()->json($coupon);
    }


    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Coupon $coupon)
    {
        try{
        $coupon->update([
            'name_coupon' => $request->name_coupon,
            'code_name' => $request->code_name,
            'discount_type' => $request->discount_type,
            'discount_value' => $request->discount_value,
            'minium_order_value' => $request->minium_order_value,
            'start_date' => $request->start_date,
            'end_date' => $request->end_date,
        ]);

        // $coupon->update($validatedData);
        return response()->json([
            'success' => true,
            'message' => 'Cập nhật dữ liệu thành công.',
            'data' => $coupon,
        ], 200);
    }catch (\Exception $exception){
        return response()->json([
            'error' => $exception,
            'success' => false,
            'message' => 'Cập nhật dữ liệu không thành công.',
        ], 500);
    }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Coupon $coupon)
    {
        $coupon->delete();
        return response()->json(null, 204);
    }
}
