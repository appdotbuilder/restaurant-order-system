<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

/**
 * App\Models\OrderItem
 *
 * @property int $id
 * @property int $order_id
 * @property int $menu_item_id
 * @property string $item_name
 * @property string $item_price
 * @property int $quantity
 * @property string $total_price
 * @property string|null $special_instructions
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \App\Models\Order $order
 * @property-read \App\Models\MenuItem $menuItem
 * 
 * @method static \Illuminate\Database\Eloquent\Builder|OrderItem newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|OrderItem newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|OrderItem query()

 * 
 * @mixin \Eloquent
 */
class OrderItem extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'order_id',
        'menu_item_id',
        'item_name',
        'item_price',
        'quantity',
        'total_price',
        'special_instructions',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'item_price' => 'decimal:0',
        'total_price' => 'decimal:0',
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];

    /**
     * Get the order that owns the order item.
     */
    public function order(): BelongsTo
    {
        return $this->belongsTo(Order::class);
    }

    /**
     * Get the menu item that the order item belongs to.
     */
    public function menuItem(): BelongsTo
    {
        return $this->belongsTo(MenuItem::class);
    }

    /**
     * Get the formatted item price.
     *
     * @return string
     */
    public function getFormattedItemPriceAttribute(): string
    {
        return 'Rp ' . number_format((float) $this->item_price, 0, ',', '.');
    }

    /**
     * Get the formatted total price.
     *
     * @return string
     */
    public function getFormattedTotalPriceAttribute(): string
    {
        return 'Rp ' . number_format((float) $this->total_price, 0, ',', '.');
    }
}