<?php

namespace Tests\Feature;

use App\Models\BlockedDate;
use App\Models\Booking;
use App\Models\Gallery;
use App\Models\Package;
use App\Models\SiteSetting;
use App\Models\Testimonial;
use Carbon\Carbon;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class BeachCampModelTest extends TestCase
{
    use RefreshDatabase;

    public function test_package_can_be_created_and_has_features_cast(): void
    {
        $package = Package::factory()->create([
            'name' => 'Sunset Glamping',
            'features' => ['Tenda Mewah', 'Matras Empuk'],
            'is_popular' => true,
        ]);

        $this->assertDatabaseHas('packages', ['name' => 'Sunset Glamping']);
        $this->assertIsArray($package->features);
        $this->assertCount(2, $package->features);
        $this->assertTrue($package->is_popular);

        $popularPackages = Package::popular()->get();
        $this->assertTrue($popularPackages->contains($package));
    }

    public function test_booking_belongs_to_package_and_generates_code(): void
    {
        $package = Package::factory()->create();

        $booking = Booking::factory()->create([
            'package_id' => $package->id,
            'status' => 'pending',
        ]);

        $this->assertStringStartsWith('BC-', $booking->booking_code);
        $this->assertEquals($package->id, $booking->package->id);
        $this->assertInstanceOf(Carbon::class, $booking->check_in_date);

        $pendingBookings = Booking::pending()->get();
        $this->assertTrue($pendingBookings->contains($booking));
    }

    public function test_gallery_can_be_filtered_by_category(): void
    {
        Gallery::factory()->create([
            'title' => 'Foto Senja Pantai',
            'category' => 'lokasi',
            'is_active' => true,
        ]);

        Gallery::factory()->create([
            'title' => 'Kamar Mandi Bersih',
            'category' => 'fasilitas',
            'is_active' => true,
        ]);

        $lokasiItems = Gallery::category('lokasi')->get();
        $this->assertCount(1, $lokasiItems);
        $this->assertEquals('Foto Senja Pantai', $lokasiItems->first()->title);
    }

    public function test_testimonial_scopes_work(): void
    {
        $approved = Testimonial::factory()->create([
            'is_approved' => true,
            'is_featured' => true,
        ]);

        $unapproved = Testimonial::factory()->create([
            'is_approved' => false,
            'is_featured' => false,
        ]);

        $approvedList = Testimonial::approved()->get();
        $this->assertTrue($approvedList->contains($approved));
        $this->assertFalse($approvedList->contains($unapproved));

        $featuredList = Testimonial::featured()->get();
        $this->assertTrue($featuredList->contains($approved));
    }

    public function test_blocked_date_helper_works(): void
    {
        $date = Carbon::today()->addDays(3);

        BlockedDate::factory()->create([
            'date' => $date->toDateString(),
            'reason' => 'Maintenance Pantai',
        ]);

        $this->assertTrue(BlockedDate::isDateBlocked($date));
        $this->assertFalse(BlockedDate::isDateBlocked(Carbon::today()->addDays(10)));
    }

    public function test_site_setting_get_and_set_work(): void
    {
        SiteSetting::set('whatsapp_number', '6281234567890', 'contact');

        $this->assertEquals('6281234567890', SiteSetting::get('whatsapp_number'));
        $this->assertEquals('default_val', SiteSetting::get('unknown_key', 'default_val'));
    }
}
