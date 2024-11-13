<?php

use App\Http\Controllers\CartItemController;
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
use App\Models\CartItem;

Route::post('/forgot-password', [PasswordResetController::class, 'sendResetLinkEmail']);
Route::post('/reset-password', [PasswordResetController::class, 'resetPassword'])->name('password.reset');

Route::post('register', [UserController::class, 'register']);
Route::post('login', [UserController::class, 'login']);

Route::get('/auth/redirect', [GoogleController::class, 'redirectToProvider']);
Route::post('/auth/callback', [GoogleController::class, 'handleProviderCallback']);

Route::get('/products/search', [ProductController::class, 'search']);

Route::apiResource('user', UserController::class);

Route::apiResource('category', CategoryController::class);
Route::apiResource('order', OrderController::class);
Route::put('/order/approve/{id}', [OrderController::class, 'approveOrder']);
Route::apiResource('review', ReviewController::class);
Route::apiResource('coupon', CouponController::class);
Route::apiResource('product', ProductController::class);
Route::get('product/related/{category_id}', [ProductController::class, 'getRelatedProducts']);

Route::middleware('auth:sanctum')->apiResource('cartItem', CartItemController::class);

Route::get('checkCode/{code_name}', [CouponController::class, 'checkCode']);

Route::get('/products/random', [ProductController::class, 'getRandomProducts']);


