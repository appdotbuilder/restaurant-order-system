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
        Schema::create('order_items', function (Blueprint $table) {
            $table->id();
            $table->foreignId('order_id')->constrained()->onDelete('cascade');
            $table->foreignId('menu_item_id')->constrained()->onDelete('cascade');
            $table->string('item_name')->comment('Snapshot of menu item name');
            $table->decimal('item_price', 10, 0)->comment('Snapshot of item price in IDR');
            $table->integer('quantity');
            $table->decimal('total_price', 12, 0)->comment('quantity * item_price');
            $table->text('special_instructions')->nullable();
            $table->timestamps();
            
            $table->index('order_id');
            $table->index('menu_item_id');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('order_items');
    }
};