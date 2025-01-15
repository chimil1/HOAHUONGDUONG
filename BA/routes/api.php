<?php

use App\Http\Controllers\CartItemController;
use App\Http\Controllers\ProductImageController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\ReviewController;
use App\Http\Controllers\CouponController;
use App\Http\Controllers\ProductController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\GoogleController;
use App\Http\Controllers\CategoriController;
use App\Http\Controllers\PasswordResetController;
use App\Http\Controllers\ShippingAddressController;
use App\Http\Controllers\StatisticalController;
use App\Http\Controllers\ChatbotController;


Route::post('/forgot-password', [PasswordResetController::class, 'sendResetLinkEmail']);
Route::post('/reset-password', [PasswordResetController::class, 'resetPassword'])->name('password.reset');

Route::post('register', [UserController::class, 'register']);
Route::post('login', [UserController::class, 'login']);
Route::post('loginadmin', [UserController::class, 'loginAdmin']);
Route::get('user-stats', [UserController::class, 'getMonthlyUserStats']);
Route::get('revenue-by-month', [OrderController::class, 'revenueByMonth']);
Route::get('revenue-by', [OrderController::class, 'totalAmountStatusTwo']);
Route::post('shipping-addresses/{user_id}', [ShippingAddressController::class, 'store']);



Route::get('/products/search', [ProductController::class, 'search']);
Route::post('/chatbot', [ChatbotController::class, 'handleRequest']);

Route::apiResource('user', UserController::class);
Route::get('/typeCate',[CategoryController::class,'Type']);

Route::put('/lock/{id}',[UserController::class,'lock']);
Route::get('/shipping-address/{userId}', [ShippingAddressController::class, 'show']);

Route::apiResource('user', UserController::class);
Route::apiResource('category', CategoryController::class);
Route::apiResource('order', OrderController::class);
Route::middleware('auth:sanctum')->post('addOrder', [OrderController::class,'store']);
Route::middleware('auth:sanctum')->get('vnPay/return', [OrderController::class,'vnpayReturn']);

Route::put('/order/status/{id}', [OrderController::class, 'updateOrderStatus']);
Route::get('/users/orders/{userId}', [OrderController::class, 'getOrdersByUser']);
Route::apiResource('review', ReviewController::class);
Route::apiResource('coupon', CouponController::class);
Route::apiResource('product', ProductController::class);
//Route::apiResource('review', ReviewController::class);
Route::middleware('auth:sanctum')->post('/addReview', [ReviewController::class, 'store']);
Route::put('comment/{id}', [ReviewController::class, 'lockComment']);
Route::get('/statistical', [StatisticalController::class, 'getStatistics']);
Route::get('/products-with-discount', [ProductController::class, 'getProductsWithDiscount']);
Route::get('product/related/{category_id}', [ProductController::class, 'getRelatedProducts']);
Route::middleware('auth:sanctum')->apiResource('cartItem', CartItemController::class);
Route::get('checkCode/{code_name}', [CouponController::class, 'checkCode']);
Route::get('/products/random', [ProductController::class, 'getRandomProducts']);
Route::middleware('auth:sanctum')->apiResource('shipping', ShippingAddressController::class);
