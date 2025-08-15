<?php

use App\Http\Controllers\Admin\MenuItemController;
use App\Http\Controllers\Admin\TenantController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\MenuController;
use App\Http\Controllers\OrderController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/health-check', function () {
    return response()->json([
        'status' => 'ok',
        'timestamp' => now()->toISOString(),
    ]);
})->name('health-check');

// Home page - show available tenants and their menus
Route::get('/', [HomeController::class, 'index'])->name('home');

// Public menu routes for customers
Route::get('/menu/{tenant}', [MenuController::class, 'index'])->name('menu.index');
Route::get('/menu/{tenant}/table/{qrCode}', [MenuController::class, 'show'])->name('menu.table');

// Order routes (public for customers)
Route::post('/orders', [OrderController::class, 'store'])->name('orders.store');

// Authenticated routes
Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');

    // Orders management for admin/superadmin
    Route::resource('orders', OrderController::class)->except(['store']);

    // Admin routes - accessible by both superadmin and admin
    Route::prefix('admin')->name('admin.')->group(function () {
        // Admin dashboard
        Route::get('/dashboard', function () {
            return Inertia::render('admin/dashboard');
        })->name('dashboard');
        
        // Superadmin only routes
        Route::resource('tenants', TenantController::class);
        
        // Both superadmin and admin routes
        Route::resource('menu-items', MenuItemController::class);
    });
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
