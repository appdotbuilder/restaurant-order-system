<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreMenuItemRequest;
use App\Http\Requests\UpdateMenuItemRequest;
use App\Models\Category;
use App\Models\MenuItem;
use Illuminate\Http\Request;
use Inertia\Inertia;

class MenuItemController extends Controller
{
    /**
     * Display a listing of menu items.
     */
    public function index(Request $request)
    {
        $user = $request->user();
        
        $query = MenuItem::with(['category', 'tenant'])
            ->latest();

        if ($user->isAdmin()) {
            $query->where('tenant_id', $user->tenant_id);
        }

        $menuItems = $query->paginate(20);
        
        $categories = Category::when($user->isAdmin(), function ($q) use ($user) {
            $q->where('tenant_id', $user->tenant_id);
        })->active()->get();

        return Inertia::render('admin/menu-items/index', [
            'menuItems' => $menuItems,
            'categories' => $categories
        ]);
    }

    /**
     * Show the form for creating a new menu item.
     */
    public function create(Request $request)
    {
        $user = $request->user();
        
        $categories = Category::when($user->isAdmin(), function ($q) use ($user) {
            $q->where('tenant_id', $user->tenant_id);
        })->active()->get();

        return Inertia::render('admin/menu-items/create', [
            'categories' => $categories
        ]);
    }

    /**
     * Store a newly created menu item.
     */
    public function store(StoreMenuItemRequest $request)
    {
        $validated = $request->validated();
        
        $category = Category::findOrFail($validated['category_id']);
        $validated['tenant_id'] = $category->tenant_id;
        
        $menuItem = MenuItem::create($validated);

        return redirect()->route('admin.menu-items.show', $menuItem)
            ->with('success', 'Menu item created successfully.');
    }

    /**
     * Display the specified menu item.
     */
    public function show(MenuItem $menuItem)
    {
        $menuItem->load(['category', 'tenant']);

        return Inertia::render('admin/menu-items/show', [
            'menuItem' => $menuItem
        ]);
    }

    /**
     * Show the form for editing the menu item.
     */
    public function edit(MenuItem $menuItem, Request $request)
    {
        $user = $request->user();
        
        $categories = Category::when($user->isAdmin(), function ($q) use ($user) {
            $q->where('tenant_id', $user->tenant_id);
        })->active()->get();

        return Inertia::render('admin/menu-items/edit', [
            'menuItem' => $menuItem,
            'categories' => $categories
        ]);
    }

    /**
     * Update the specified menu item.
     */
    public function update(UpdateMenuItemRequest $request, MenuItem $menuItem)
    {
        $menuItem->update($request->validated());

        return redirect()->route('admin.menu-items.show', $menuItem)
            ->with('success', 'Menu item updated successfully.');
    }

    /**
     * Remove the specified menu item.
     */
    public function destroy(MenuItem $menuItem)
    {
        $menuItem->delete();

        return redirect()->route('admin.menu-items.index')
            ->with('success', 'Menu item deleted successfully.');
    }
}