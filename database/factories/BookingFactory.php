<?php

namespace Database\Factories;

use App\Models\Booking;
use App\Models\Package;
use Carbon\Carbon;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Booking>
 */
class BookingFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $checkIn = Carbon::today()->addDays(fake()->numberBetween(1, 30));
        $checkOut = (clone $checkIn)->addDays(fake()->numberBetween(1, 2));

        return [
            'booking_code' => Booking::generateBookingCode(),
            'package_id' => Package::factory(),
            'customer_name' => fake()->name(),
            'customer_email' => fake()->safeEmail(),
            'customer_phone' => '08'.fake()->numerify('##########'),
            'check_in_date' => $checkIn->toDateString(),
            'check_out_date' => $checkOut->toDateString(),
            'guests_count' => fake()->numberBetween(2, 6),
            'tents_count' => fake()->numberBetween(1, 2),
            'total_price' => fake()->numberBetween(250, 900) * 1000,
            'status' => fake()->randomElement(['pending', 'confirmed', 'completed', 'cancelled']),
            'customer_notes' => fake()->optional(0.5)->sentence(),
            'admin_notes' => null,
        ];
    }
}
