<?php

use App\Http\Controllers\AboutController;
use App\Http\Controllers\Admin\AdminBlockedDateController;
use App\Http\Controllers\Admin\AdminBookingController;
use App\Http\Controllers\Admin\AdminDashboardController;
use App\Http\Controllers\Admin\AdminGalleryController;
use App\Http\Controllers\Admin\AdminPackageController;
use App\Http\Controllers\Admin\AdminSettingController;
use App\Http\Controllers\Admin\AdminTestimonialController;
use App\Http\Controllers\BookingController;
use App\Http\Controllers\GalleryController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\PackageController;
use App\Http\Controllers\ProfileController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Public Routes
|--------------------------------------------------------------------------
*/
Route::get('/', [HomeController::class, 'index'])->name('home');
Route::get('/packages', [PackageController::class, 'index'])->name('packages.index');
Route::get('/packages/{slug}', [PackageController::class, 'show'])->name('packages.show');
Route::get('/gallery', [GalleryController::class, 'index'])->name('gallery.index');
Route::get('/about', [AboutController::class, 'about'])->name('about');
Route::get('/contact', [AboutController::class, 'contact'])->name('contact');

Route::get('/booking', [BookingController::class, 'create'])->name('booking.create');
Route::post('/booking', [BookingController::class, 'store'])->name('booking.store');
Route::get('/booking/success/{code}', [BookingController::class, 'success'])->name('booking.success');
Route::get('/booking/check', [BookingController::class, 'check'])->name('booking.check');

/*
|--------------------------------------------------------------------------
| Admin & Authenticated Routes
|--------------------------------------------------------------------------
*/
Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/dashboard', function () {
        return redirect()->route('admin.dashboard');
    })->name('dashboard');

    Route::prefix('admin')->name('admin.')->group(function () {
        Route::get('/', [AdminDashboardController::class, 'index'])->name('dashboard');

        // Bookings
        Route::get('/bookings', [AdminBookingController::class, 'index'])->name('bookings.index');
        Route::put('/bookings/{booking}', [AdminBookingController::class, 'update'])->name('bookings.update');
        Route::delete('/bookings/{booking}', [AdminBookingController::class, 'destroy'])->name('bookings.destroy');

        // Packages
        Route::get('/packages', [AdminPackageController::class, 'index'])->name('packages.index');
        Route::post('/packages', [AdminPackageController::class, 'store'])->name('packages.store');
        Route::put('/packages/{package}', [AdminPackageController::class, 'update'])->name('packages.update');
        Route::delete('/packages/{package}', [AdminPackageController::class, 'destroy'])->name('packages.destroy');

        // Galleries
        Route::get('/galleries', [AdminGalleryController::class, 'index'])->name('galleries.index');
        Route::post('/galleries', [AdminGalleryController::class, 'store'])->name('galleries.store');
        Route::put('/galleries/{gallery}', [AdminGalleryController::class, 'update'])->name('galleries.update');
        Route::delete('/galleries/{gallery}', [AdminGalleryController::class, 'destroy'])->name('galleries.destroy');

        // Testimonials
        Route::get('/testimonials', [AdminTestimonialController::class, 'index'])->name('testimonials.index');
        Route::put('/testimonials/{testimonial}', [AdminTestimonialController::class, 'update'])->name('testimonials.update');
        Route::delete('/testimonials/{testimonial}', [AdminTestimonialController::class, 'destroy'])->name('testimonials.destroy');

        // Blocked Dates
        Route::get('/blocked-dates', [AdminBlockedDateController::class, 'index'])->name('blocked-dates.index');
        Route::post('/blocked-dates', [AdminBlockedDateController::class, 'store'])->name('blocked-dates.store');
        Route::delete('/blocked-dates/{blockedDate}', [AdminBlockedDateController::class, 'destroy'])->name('blocked-dates.destroy');

        // Settings
        Route::get('/settings', [AdminSettingController::class, 'index'])->name('settings.index');
        Route::post('/settings', [AdminSettingController::class, 'update'])->name('settings.update');
    });

    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';
