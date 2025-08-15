<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Tenant>
 */
class TenantFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $name = fake()->company() . ' Restaurant';
        
        return [
            'name' => $name,
            'slug' => Str::slug($name),
            'description' => fake()->sentence(),
            'logo' => null,
            'contact_info' => [
                'phone' => fake()->phoneNumber(),
                'email' => fake()->safeEmail(),
                'address' => fake()->address(),
            ],
            'business_hours' => [
                'monday' => '08:00-22:00',
                'tuesday' => '08:00-22:00',
                'wednesday' => '08:00-22:00',
                'thursday' => '08:00-22:00',
                'friday' => '08:00-23:00',
                'saturday' => '08:00-23:00',
                'sunday' => '09:00-21:00',
            ],
            'status' => 'active',
        ];
    }
}