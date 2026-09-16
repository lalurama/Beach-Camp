<?php

namespace Tests\Feature;

use App\Models\Booking;
use App\Models\Package;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class BeachCampWebTest extends TestCase
{
    use RefreshDatabase;

    public function test_home_page_can_be_rendered(): void
    {
        Package::factory()->create(['is_popular' => true, 'is_active' => true]);

        $response = $this->get('/');
        $response->assertStatus(200);
    }

    public function test_packages_page_can_be_rendered_with_filter(): void
    {
        Package::factory()->create([
            'name' => 'Paket Solo',
            'capacity_min' => 1,
            'capacity_max' => 2,
            'is_active' => true,
        ]);

        $response = $this->get(route('packages.index', ['guests' => 2]));
        $response->assertStatus(200);
    }

    public function test_package_show_page_can_be_rendered(): void
    {
        $package = Package::factory()->create(['slug' => 'paket-sunset-duo', 'is_active' => true]);

        $response = $this->get(route('packages.show', 'paket-sunset-duo'));
        $response->assertStatus(200);
    }

    public function test_gallery_page_can_be_rendered(): void
    {
        $response = $this->get(route('gallery.index'));
        $response->assertStatus(200);
    }

    public function test_about_and_contact_pages_can_be_rendered(): void
    {
        $this->get(route('about'))->assertStatus(200);
        $this->get(route('contact'))->assertStatus(200);
    }

    public function test_booking_create_page_can_be_rendered(): void
    {
        $package = Package::factory()->create(['is_active' => true]);

        $response = $this->get(route('booking.create', ['package' => $package->slug]));
        $response->assertStatus(200);
    }

    public function test_booking_can_be_submitted_successfully(): void
    {
        $package = Package::factory()->create([
            'price_regular' => 200000,
            'price_weekend' => 250000,
            'capacity_max' => 4,
            'is_active' => true,
        ]);

        $checkIn = Carbon::today()->addDays(2)->toDateString();
        $checkOut = Carbon::today()->addDays(3)->toDateString();

        $response = $this->post(route('booking.store'), [
            'package_id' => $package->id,
            'customer_name' => 'Rian Hidayat',
            'customer_email' => 'rian@example.com',
            'customer_phone' => '081234567890',
            'check_in_date' => $checkIn,
            'check_out_date' => $checkOut,
            'guests_count' => 2,
            'customer_notes' => 'Tenda dekat pantai.',
        ]);

        $response->assertSessionHasNoErrors();
        $this->assertDatabaseHas('bookings', [
            'customer_name' => 'Rian Hidayat',
            'package_id' => $package->id,
            'status' => 'pending',
        ]);

        $booking = Booking::where('customer_name', 'Rian Hidayat')->first();
        $response->assertRedirect(route('booking.success', $booking->booking_code));
    }

    public function test_booking_check_status_page(): void
    {
        $booking = Booking::factory()->create();

        $response = $this->get(route('booking.check', ['code' => $booking->booking_code]));
        $response->assertStatus(200);
    }

    public function test_guest_cannot_access_admin_dashboard(): void
    {
        $response = $this->get(route('admin.dashboard'));
        $response->assertRedirect(route('login'));
    }

    public function test_admin_can_access_dashboard_and_manage_bookings(): void
    {
        $admin = User::factory()->create();
        $booking = Booking::factory()->create(['status' => 'pending']);

        $response = $this->actingAs($admin)->get(route('admin.dashboard'));
        $response->assertStatus(200);

        // Update booking status
        $updateResponse = $this->actingAs($admin)->put(route('admin.bookings.update', $booking->id), [
            'status' => 'confirmed',
            'admin_notes' => 'DP diterima',
        ]);
        $updateResponse->assertSessionHas('success');

        $this->assertDatabaseHas('bookings', [
            'id' => $booking->id,
            'status' => 'confirmed',
            'admin_notes' => 'DP diterima',
        ]);
    }
}
