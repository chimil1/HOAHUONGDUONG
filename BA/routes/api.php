<?php

use App\Http\Controllers\ProductImageController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\ReviewController;
use App\Http\Controllers\CouponController;
use App\Http\Controllers\ProductController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\GoogleController;
use App\Http\Controllers\CategoriController;
use App\Http\Controllers\PasswordResetController;
use App\Http\Controllers\ShippingAddressController;
use App\Http\Controllers\StatisticalController;


Route::post('/forgot-password', [PasswordResetController::class, 'sendResetLinkEmail']);
Route::post('/reset-password', [PasswordResetController::class, 'resetPassword'])->name('password.reset');

Route::post('register', [UserController::class, 'register']);
Route::post('login', [UserController::class, 'login']);
Route::post('loginadmin', [UserController::class, 'loginAdmin']);

Route::post('shipping-addresses/{user_id}', [ShippingAddressController::class, 'store']);


Route::get('/auth/redirect', [GoogleController::class, 'redirectToProvider']);
Route::post('/auth/callback', [GoogleController::class, 'handleProviderCallback']);
Route::get('/products/search', [ProductController::class, 'search']);

Route::apiResource('user', UserController::class);
Route::get('/typeCate',[CategoryController::class,'Type']);

Route::put('/lock/{id}',[UserController::class,'lock']);
Route::get('/shipping-address/{userId}', [ShippingAddressController::class, 'show']);

Route::apiResource('user', UserController::class);
Route::apiResource('category', CategoryController::class);
Route::apiResource('order', OrderController::class);
Route::put('/order/approve/{id}', [OrderController::class, 'approveOrder']);
Route::apiResource('review', ReviewController::class);
Route::apiResource('coupon', CouponController::class);
Route::apiResource('product', ProductController::class);
Route::apiResource('review', ReviewController::class);
Route::get('/statistical', [StatisticalController::class, 'getStatistics']);
Route::get('/products-with-discount', [ProductController::class, 'getProductsWithDiscount']);

Route::get('product/related/{category_id}', [ProductController::class, 'getRelatedProducts']);

Route::get('checkCode/{code_name}', [CouponController::class, 'checkCode']);
Route::apiResource('shipping', ShippingAddressController::class);
