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
        Schema::create('products', function (Blueprint $table) {
            $table->id();
            $table->string('name')->comment('Product name');
            $table->text('description')->nullable()->comment('Product description');
            $table->decimal('price', 10, 2)->comment('Product price');
            $table->integer('stock')->default(0)->comment('Current stock quantity');
            $table->boolean('active')->default(true)->comment('Whether product is active');
            $table->string('sku')->unique()->nullable()->comment('Stock keeping unit');
            $table->timestamps();
            
            // Indexes for performance
            $table->index('name');
            $table->index('active');
            $table->index('sku');
            $table->index(['active', 'created_at']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('products');
    }
};