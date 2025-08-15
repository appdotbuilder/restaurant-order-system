<?php

namespace Database\Seeders;

use App\Models\Category;
use App\Models\MenuItem;
use App\Models\Table;
use App\Models\Tenant;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class RestaurantSeeder extends Seeder
{
    /**
     * Run the database seeder.
     */
    public function run(): void
    {
        // Create Superadmin
        User::create([
            'name' => 'Super Admin',
            'email' => 'superadmin@example.com',
            'password' => Hash::make('password'),
            'role' => 'superadmin',
        ]);

        // Create sample tenants
        $restaurants = [
            [
                'name' => 'Warung Nasi Gudeg Jogja',
                'slug' => 'warung-gudeg-jogja',
                'description' => 'Authentic Javanese cuisine with traditional gudeg and other specialties',
                'contact_info' => [
                    'phone' => '+62-274-123456',
                    'address' => 'Jl. Malioboro No. 123, Yogyakarta',
                    'email' => 'info@warunggudeg.com'
                ],
                'business_hours' => [
                    'monday' => '08:00-22:00',
                    'tuesday' => '08:00-22:00',
                    'wednesday' => '08:00-22:00',
                    'thursday' => '08:00-22:00',
                    'friday' => '08:00-22:00',
                    'saturday' => '08:00-22:00',
                    'sunday' => '08:00-21:00'
                ]
            ],
            [
                'name' => 'Kedai Kopi Arabica',
                'slug' => 'kedai-kopi-arabica',
                'description' => 'Premium coffee shop with Indonesian specialty coffee beans',
                'contact_info' => [
                    'phone' => '+62-21-987654',
                    'address' => 'Jl. Kemang Raya No. 45, Jakarta Selatan',
                    'email' => 'hello@kedaikopiarabica.com'
                ],
                'business_hours' => [
                    'monday' => '06:00-23:00',
                    'tuesday' => '06:00-23:00',
                    'wednesday' => '06:00-23:00',
                    'thursday' => '06:00-23:00',
                    'friday' => '06:00-24:00',
                    'saturday' => '06:00-24:00',
                    'sunday' => '07:00-22:00'
                ]
            ]
        ];

        foreach ($restaurants as $restaurantData) {
            $tenant = Tenant::create($restaurantData);

            // Create admin for each tenant
            User::create([
                'name' => 'Admin ' . $tenant->name,
                'email' => 'admin@' . $tenant->slug . '.com',
                'password' => Hash::make('password'),
                'role' => 'admin',
                'tenant_id' => $tenant->id,
            ]);

            // Create categories and menu items based on restaurant type
            if ($tenant->slug === 'warung-gudeg-jogja') {
                $this->createJavaneseMenu($tenant);
            } else {
                $this->createCoffeeShopMenu($tenant);
            }

            // Create tables for each tenant
            for ($i = 1; $i <= 10; $i++) {
                Table::create([
                    'tenant_id' => $tenant->id,
                    'number' => (string) $i,
                    'capacity' => random_int(2, 6),
                ]);
            }
        }
    }

    protected function createJavaneseMenu(Tenant $tenant): void
    {
        // Create food categories
        $mainDishes = Category::create([
            'tenant_id' => $tenant->id,
            'name' => 'Makanan Utama',
            'slug' => 'makanan-utama',
            'type' => 'food',
            'sort_order' => 1,
        ]);

        $snacks = Category::create([
            'tenant_id' => $tenant->id,
            'name' => 'Camilan',
            'slug' => 'camilan',
            'type' => 'food',
            'sort_order' => 2,
        ]);

        $drinks = Category::create([
            'tenant_id' => $tenant->id,
            'name' => 'Minuman',
            'slug' => 'minuman',
            'type' => 'drink',
            'sort_order' => 3,
        ]);

        // Main dishes
        $menuItems = [
            [
                'category_id' => $mainDishes->id,
                'name' => 'Gudeg Komplit',
                'description' => 'Gudeg dengan ayam, telur, dan krecek',
                'price' => 25000,
                'preparation_time' => 15,
                'is_featured' => true,
            ],
            [
                'category_id' => $mainDishes->id,
                'name' => 'Nasi Rames Jogja',
                'description' => 'Nasi dengan lauk pauk khas Jogja',
                'price' => 22000,
                'preparation_time' => 10,
            ],
            [
                'category_id' => $mainDishes->id,
                'name' => 'Soto Ayam Jogja',
                'description' => 'Soto ayam khas Jogja dengan santan',
                'price' => 18000,
                'preparation_time' => 12,
            ],
            // Snacks
            [
                'category_id' => $snacks->id,
                'name' => 'Bakpia Pathok',
                'description' => 'Bakpia isi kacang hijau asli Jogja',
                'price' => 15000,
                'preparation_time' => 5,
            ],
            [
                'category_id' => $snacks->id,
                'name' => 'Keripik Tempe',
                'description' => 'Keripik tempe renyah dengan bumbu',
                'price' => 8000,
                'preparation_time' => 3,
            ],
            // Drinks
            [
                'category_id' => $drinks->id,
                'name' => 'Es Teh Manis',
                'description' => 'Teh manis segar dengan es',
                'price' => 5000,
                'preparation_time' => 2,
            ],
            [
                'category_id' => $drinks->id,
                'name' => 'Wedang Uwuh',
                'description' => 'Minuman herbal khas Jogja',
                'price' => 12000,
                'preparation_time' => 5,
                'is_featured' => true,
            ],
            [
                'category_id' => $drinks->id,
                'name' => 'Es Jeruk',
                'description' => 'Jeruk peras segar dengan es',
                'price' => 8000,
                'preparation_time' => 3,
            ],
        ];

        foreach ($menuItems as $itemData) {
            $itemData['tenant_id'] = $tenant->id;
            MenuItem::create($itemData);
        }
    }

    protected function createCoffeeShopMenu(Tenant $tenant): void
    {
        // Create categories
        $coffee = Category::create([
            'tenant_id' => $tenant->id,
            'name' => 'Kopi',
            'slug' => 'kopi',
            'type' => 'drink',
            'sort_order' => 1,
        ]);

        $nonCoffee = Category::create([
            'tenant_id' => $tenant->id,
            'name' => 'Non-Kopi',
            'slug' => 'non-kopi',
            'type' => 'drink',
            'sort_order' => 2,
        ]);

        $food = Category::create([
            'tenant_id' => $tenant->id,
            'name' => 'Makanan',
            'slug' => 'makanan',
            'type' => 'food',
            'sort_order' => 3,
        ]);

        // Menu items
        $menuItems = [
            // Coffee
            [
                'category_id' => $coffee->id,
                'name' => 'Kopi Arabica Gayo',
                'description' => 'Single origin dari Aceh Gayo',
                'price' => 35000,
                'preparation_time' => 8,
                'is_featured' => true,
            ],
            [
                'category_id' => $coffee->id,
                'name' => 'Kopi Susu Gula Aren',
                'description' => 'Kopi dengan susu dan gula aren',
                'price' => 28000,
                'preparation_time' => 5,
            ],
            [
                'category_id' => $coffee->id,
                'name' => 'Cappuccino',
                'description' => 'Espresso dengan steamed milk',
                'price' => 32000,
                'preparation_time' => 6,
            ],
            [
                'category_id' => $coffee->id,
                'name' => 'V60 Pour Over',
                'description' => 'Manual brewing dengan V60',
                'price' => 42000,
                'preparation_time' => 12,
                'is_featured' => true,
            ],
            // Non-coffee
            [
                'category_id' => $nonCoffee->id,
                'name' => 'Teh Tarik',
                'description' => 'Teh susu Malaysia',
                'price' => 18000,
                'preparation_time' => 4,
            ],
            [
                'category_id' => $nonCoffee->id,
                'name' => 'Chocolate Hot',
                'description' => 'Cokelat panas dengan whipped cream',
                'price' => 22000,
                'preparation_time' => 5,
            ],
            [
                'category_id' => $nonCoffee->id,
                'name' => 'Lemon Squash',
                'description' => 'Minuman lemon segar',
                'price' => 15000,
                'preparation_time' => 3,
            ],
            // Food
            [
                'category_id' => $food->id,
                'name' => 'Roti Bakar Coklat Keju',
                'description' => 'Roti bakar dengan coklat dan keju',
                'price' => 25000,
                'preparation_time' => 8,
            ],
            [
                'category_id' => $food->id,
                'name' => 'Croissant',
                'description' => 'Croissant butter fresh dari oven',
                'price' => 20000,
                'preparation_time' => 5,
            ],
            [
                'category_id' => $food->id,
                'name' => 'Sandwich Club',
                'description' => 'Sandwich dengan ayam, sayuran, dan keju',
                'price' => 35000,
                'preparation_time' => 10,
            ],
        ];

        foreach ($menuItems as $itemData) {
            $itemData['tenant_id'] = $tenant->id;
            MenuItem::create($itemData);
        }
    }
}