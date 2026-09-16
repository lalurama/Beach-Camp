<?php

namespace Database\Factories;

use App\Models\Package;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

/**
 * @extends Factory<Package>
 */
class PackageFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $name = fake()->words(3, true);

        return [
            'name' => ucwords($name),
            'slug' => Str::slug($name).'-'.fake()->unique()->numberBetween(10, 999),
            'short_description' => fake()->sentence(8),
            'description' => fake()->paragraph(3),
            'capacity_min' => 2,
            'capacity_max' => 4,
            'price_regular' => fake()->numberBetween(150, 600) * 1000,
            'price_weekend' => fake()->numberBetween(200, 750) * 1000,
            'features' => [
                'Tenda Dome Waterproof',
                'Matras & Sleeping Bag',
                'Lampu Tenda & Terminal Listrik',
                'Akses Kamar Mandi Bersih',
                'Api Unggun Bersama',
            ],
            'image_url' => 'https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?auto=format&fit=crop&w=1200&q=80',
            'badge' => null,
            'is_popular' => fake()->boolean(30),
            'is_active' => true,
            'sort_order' => 0,
        ];
    }
}
