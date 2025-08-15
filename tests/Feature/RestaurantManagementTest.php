<?php

namespace Tests\Feature;

use App\Models\Tenant;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Support\Facades\Hash;
use Tests\TestCase;

class RestaurantManagementTest extends TestCase
{
    use RefreshDatabase, WithFaker;

    public function test_home_page_displays_tenants(): void
    {
        // Create a tenant with menu items
        $tenant = Tenant::factory()->create([
            'name' => 'Test Restaurant',
            'status' => 'active'
        ]);

        $response = $this->get('/');

        $response->assertStatus(200);
        $response->assertInertia(fn ($assert) => 
            $assert->component('welcome')
                ->has('tenants')
        );
    }

    public function test_superadmin_can_access_tenant_management(): void
    {
        $superadmin = User::factory()->create([
            'role' => 'superadmin',
            'password' => Hash::make('password')
        ]);

        $response = $this->actingAs($superadmin)
            ->get('/admin/tenants');

        $response->assertStatus(200);
    }

    public function test_admin_can_access_menu_items(): void
    {
        $tenant = Tenant::factory()->create();
        
        $admin = User::factory()->create([
            'role' => 'admin',
            'tenant_id' => $tenant->id,
            'password' => Hash::make('password')
        ]);

        $response = $this->actingAs($admin)
            ->get('/admin/menu-items');

        $response->assertStatus(200);
    }

    public function test_customer_can_view_menu(): void
    {
        $tenant = Tenant::factory()->create([
            'slug' => 'test-restaurant',
            'status' => 'active'
        ]);

        $response = $this->get("/menu/{$tenant->slug}");

        $response->assertStatus(200);
        $response->assertInertia(fn ($assert) => 
            $assert->component('menu/index')
                ->has('tenant')
                ->has('categories')
        );
    }

    public function test_dashboard_redirects_based_on_role(): void
    {
        // Test superadmin redirect
        $superadmin = User::factory()->create([
            'role' => 'superadmin'
        ]);

        $response = $this->actingAs($superadmin)
            ->get('/dashboard');

        $response->assertStatus(200);

        // Test customer redirect
        $customer = User::factory()->create([
            'role' => 'customer'
        ]);

        $response = $this->actingAs($customer)
            ->get('/dashboard');

        $response->assertStatus(200);
    }
}