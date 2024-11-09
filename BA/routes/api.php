<?php

use App\Http\Controllers\UserController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\ReviewController;
use App\Http\Controllers\CouponController;
use App\Http\Controllers\ProductController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');
Route::apiResource('user', UserController::class);
Route::apiResource('category', CategoryController::class);
Route::apiResource('order', OrderController::class);
Route::apiResource('review', ReviewController::class);
Route::apiResource('coupon', CouponController::class);
Route::apiResource('product', ProductController::class);
Route::apiResource('review', ReviewController::class);
Route::get('/product/{id}', [ProductController::class, 'show']);