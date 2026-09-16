<?php

namespace Database\Factories;

use App\Models\Testimonial;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Testimonial>
 */
class TestimonialFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'customer_name' => fake()->name(),
            'customer_origin' => fake()->city(),
            'rating' => fake()->numberBetween(4, 5),
            'content' => fake()->paragraph(2),
            'avatar_url' => 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
            'stay_date' => 'Agustus 2026',
            'is_approved' => true,
            'is_featured' => fake()->boolean(40),
            'sort_order' => 0,
        ];
    }
}
