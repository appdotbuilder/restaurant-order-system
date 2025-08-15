<?php

namespace App\Http\Controllers;

use App\Models\Table;
use App\Models\Tenant;
use Inertia\Inertia;

class MenuController extends Controller
{
    /**
     * Display the menu for a specific tenant.
     */
    public function index(Tenant $tenant)
    {
        $tenant->load([
            'categories.menuItems' => function ($query) {
                $query->available()->orderBy('sort_order');
            }
        ]);

        return Inertia::render('menu/index', [
            'tenant' => $tenant,
            'categories' => $tenant->categories->where('is_active', true)
        ]);
    }

    /**
     * Display the menu for a specific table via QR code.
     */
    public function show(Tenant $tenant, $qrCode)
    {
        $table = Table::where('qr_code', $qrCode)
            ->where('tenant_id', $tenant->id)
            ->firstOrFail();

        $tenant->load([
            'categories.menuItems' => function ($query) {
                $query->available()->orderBy('sort_order');
            }
        ]);

        return Inertia::render('menu/table', [
            'tenant' => $tenant,
            'table' => $table,
            'categories' => $tenant->categories->where('is_active', true)
        ]);
    }
}