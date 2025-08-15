<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreTenantRequest;
use App\Http\Requests\UpdateTenantRequest;
use App\Models\Tenant;
use Inertia\Inertia;

class TenantController extends Controller
{
    /**
     * Display a listing of tenants.
     */
    public function index()
    {
        $tenants = Tenant::with('users')
            ->withCount(['orders', 'menuItems'])
            ->latest()
            ->paginate(10);

        return Inertia::render('admin/tenants/index', [
            'tenants' => $tenants
        ]);
    }

    /**
     * Show the form for creating a new tenant.
     */
    public function create()
    {
        return Inertia::render('admin/tenants/create');
    }

    /**
     * Store a newly created tenant.
     */
    public function store(StoreTenantRequest $request)
    {
        $tenant = Tenant::create($request->validated());

        return redirect()->route('admin.tenants.show', $tenant)
            ->with('success', 'Tenant created successfully.');
    }

    /**
     * Display the specified tenant.
     */
    public function show(Tenant $tenant)
    {
        $tenant->load(['users', 'categories', 'tables'])
            ->loadCount(['orders', 'menuItems']);

        return Inertia::render('admin/tenants/show', [
            'tenant' => $tenant
        ]);
    }

    /**
     * Show the form for editing the tenant.
     */
    public function edit(Tenant $tenant)
    {
        return Inertia::render('admin/tenants/edit', [
            'tenant' => $tenant
        ]);
    }

    /**
     * Update the specified tenant.
     */
    public function update(UpdateTenantRequest $request, Tenant $tenant)
    {
        $tenant->update($request->validated());

        return redirect()->route('admin.tenants.show', $tenant)
            ->with('success', 'Tenant updated successfully.');
    }

    /**
     * Remove the specified tenant.
     */
    public function destroy(Tenant $tenant)
    {
        $tenant->delete();

        return redirect()->route('admin.tenants.index')
            ->with('success', 'Tenant deleted successfully.');
    }
}