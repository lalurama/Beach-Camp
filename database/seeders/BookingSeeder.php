<?php

namespace Database\Seeders;

use App\Models\Booking;
use App\Models\Package;
use Carbon\Carbon;
use Illuminate\Database\Seeder;

class BookingSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $packageDuo = Package::where('slug', 'paket-sunset-duo')->first();
        $packageFamily = Package::where('slug', 'paket-family-beach-camp')->first();

        if ($packageDuo) {
            Booking::create([
                'booking_code' => Booking::generateBookingCode(),
                'package_id' => $packageDuo->id,
                'customer_name' => 'Budi Santoso',
                'customer_email' => 'budi.santoso@example.com',
                'customer_phone' => '081298765432',
                'check_in_date' => Carbon::today()->addDays(2)->toDateString(),
                'check_out_date' => Carbon::today()->addDays(3)->toDateString(),
                'guests_count' => 2,
                'tents_count' => 1,
                'total_price' => $packageDuo->price_regular,
                'status' => 'confirmed',
                'customer_notes' => 'Tolong disiapkan tenda yang menghadap langsung ke arah sunset ya.',
                'admin_notes' => 'Sudah DP 50% via transfer.',
            ]);
        }

        if ($packageFamily) {
            Booking::create([
                'booking_code' => Booking::generateBookingCode(),
                'package_id' => $packageFamily->id,
                'customer_name' => 'Siti Nurhaliza',
                'customer_email' => 'siti.nurhaliza@example.com',
                'customer_phone' => '082145678901',
                'check_in_date' => Carbon::today()->addDays(7)->toDateString(),
                'check_out_date' => Carbon::today()->addDays(8)->toDateString(),
                'guests_count' => 4,
                'tents_count' => 1,
                'total_price' => $packageFamily->price_regular,
                'status' => 'pending',
                'customer_notes' => 'Bawa 2 anak usia 7 dan 9 tahun.',
                'admin_notes' => null,
            ]);
        }
    }
}
