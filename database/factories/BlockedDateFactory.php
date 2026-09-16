<?php

namespace Database\Factories;

use App\Models\BlockedDate;
use Carbon\Carbon;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<BlockedDate>
 */
class BlockedDateFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'date' => Carbon::today()->addDays(fake()->unique()->numberBetween(1, 60))->toDateString(),
            'reason' => fake()->randomElement(['Maintenance Area', 'Private Event', 'Area Penuh']),
        ];
    }
}
