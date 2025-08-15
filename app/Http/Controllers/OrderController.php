<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreOrderRequest;
use App\Models\MenuItem;
use App\Models\Order;
use App\Models\Table;
use App\Models\Tenant;
use Illuminate\Http\Request;
use Inertia\Inertia;

class OrderController extends Controller
{
    /**
     * Display a listing of orders for admin.
     */
    public function index(Request $request)
    {
        $user = $request->user();
        
        $query = Order::with(['table', 'items.menuItem', 'customer'])
            ->latest();

        if ($user->isAdmin()) {
            $query->where('tenant_id', $user->tenant_id);
        }

        $orders = $query->paginate(20);

        return Inertia::render('orders/index', [
            'orders' => $orders
        ]);
    }

    /**
     * Store a newly created order.
     */
    public function store(StoreOrderRequest $request)
    {
        $validated = $request->validated();
        
        $table = Table::findOrFail($validated['table_id']);
        $tenant = $table->tenant;
        
        // Calculate totals
        $subtotal = 0;
        $orderItems = [];
        
        foreach ($validated['items'] as $item) {
            $menuItem = MenuItem::findOrFail($item['menu_item_id']);
            $itemTotal = $menuItem->price * $item['quantity'];
            $subtotal += $itemTotal;
            
            $orderItems[] = [
                'menu_item_id' => $menuItem->id,
                'item_name' => $menuItem->name,
                'item_price' => $menuItem->price,
                'quantity' => $item['quantity'],
                'total_price' => $itemTotal,
                'special_instructions' => $item['special_instructions'] ?? null,
            ];
        }
        
        $taxAmount = $subtotal * 0.1; // 10% tax
        $totalAmount = $subtotal + $taxAmount;
        
        $order = Order::create([
            'tenant_id' => $tenant->id,
            'table_id' => $table->id,
            'customer_name' => $validated['customer_name'],
            'customer_phone' => $validated['customer_phone'] ?? null,
            'subtotal' => $subtotal,
            'tax_amount' => $taxAmount,
            'total_amount' => $totalAmount,
            'notes' => $validated['notes'] ?? null,
        ]);
        
        foreach ($orderItems as $orderItem) {
            $order->items()->create($orderItem);
        }

        return Inertia::render('orders/confirmation', [
            'order' => $order->load(['items', 'table', 'tenant'])
        ]);
    }

    /**
     * Display the specified order.
     */
    public function show(Order $order)
    {
        $order->load(['items.menuItem', 'table', 'tenant', 'customer']);

        return Inertia::render('orders/show', [
            'order' => $order
        ]);
    }

    /**
     * Update the order status.
     */
    public function update(Request $request, Order $order)
    {
        $request->validate([
            'status' => 'required|in:pending,confirmed,preparing,ready,served,completed,cancelled',
            'payment_status' => 'sometimes|in:pending,paid,failed,refunded'
        ]);

        $order->update($request->only(['status', 'payment_status']));

        if ($request->status === 'confirmed' && !$order->confirmed_at) {
            $order->update(['confirmed_at' => now()]);
        }

        if ($request->status === 'completed' && !$order->completed_at) {
            $order->update(['completed_at' => now()]);
        }

        return back()->with('success', 'Order status updated successfully.');
    }
}