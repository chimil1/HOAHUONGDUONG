<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('reviews', function (Blueprint $table) {
            $table->id(); 
            $table->tinyInteger('rating')->nullable();
            $table->string('user_id');  
            $table->unsignedBigInteger('product_id'); 
            $table->unsignedBigInteger('order_id');
            $table->timestamps();  
            $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');  
            $table->foreign('product_id')->references('id')->on('products')->onDelete('cascade');  
            $table->foreign('order_id')->references('id')->on('orders')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('reviews');
    }
};
