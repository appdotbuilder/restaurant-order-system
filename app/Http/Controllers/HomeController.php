<?php

namespace App\Http\Controllers;

use App\Models\Tenant;
use Inertia\Inertia;

class HomeController extends Controller
{
    /**
     * Display the home page with tenant listings.
     */
    public function index()
    {
        $tenants = Tenant::active()
            ->with(['menuItems' => function ($query) {
                $query->available()
                    ->featured()
                    ->limit(3)
                    ->with('category');
            }])
            ->get();

        return Inertia::render('welcome', [
            'tenants' => $tenants
        ]);
    }
}