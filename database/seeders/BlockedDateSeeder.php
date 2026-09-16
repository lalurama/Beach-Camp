<?php

namespace Database\Seeders;

use App\Models\BlockedDate;
use Carbon\Carbon;
use Illuminate\Database\Seeder;

class BlockedDateSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Block 2 dates for maintenance / private event demonstration
        $blockedDates = [
            [
                'date' => Carbon::today()->addDays(5)->toDateString(),
                'reason' => 'Private Event Beach Gathering',
            ],
            [
                'date' => Carbon::today()->addDays(6)->toDateString(),
                'reason' => 'Maintenance Fasilitas Area',
            ],
        ];

        foreach ($blockedDates as $item) {
            $existing = BlockedDate::whereDate('date', $item['date'])->first();
            if ($existing) {
                $existing->update($item);
            } else {
                BlockedDate::create($item);
            }
        }
    }
}
