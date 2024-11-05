<?php

use App\Http\Controllers\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\GoogleController;
use App\Http\Controllers\CategoriController;
use App\Http\Controllers\PasswordResetController;


Route::post('/forgot-password', [PasswordResetController::class, 'sendResetLinkEmail']);
Route::post('/reset-password', [PasswordResetController::class, 'resetPassword'])->name('password.reset');

Route::post('register', [UserController::class, 'register']);
Route::post('login', [UserController::class, 'login']);

Route::get('/auth/redirect', [GoogleController::class, 'redirectToProvider']);
Route::post('/auth/callback', [GoogleController::class, 'handleProviderCallback']);

Route::apiResource('categories', CategoriController::class);
Route::apiResource('user', UserController::class);





