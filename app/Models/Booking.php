<?php

namespace App\Models;

use Database\Factories\BookingFactory;
use Illuminate\Database\Eloquent\Attributes\Scope;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Support\Str;

class Booking extends Model
{
    /** @use HasFactory<BookingFactory> */
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'booking_code',
        'package_id',
        'customer_name',
        'customer_email',
        'customer_phone',
        'check_in_date',
        'check_out_date',
        'guests_count',
        'tents_count',
        'total_price',
        'status',
        'customer_notes',
        'admin_notes',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'check_in_date' => 'date',
            'check_out_date' => 'date',
            'guests_count' => 'integer',
            'tents_count' => 'integer',
            'total_price' => 'integer',
        ];
    }

    /**
     * Generate a unique readable booking code.
     */
    public static function generateBookingCode(): string
    {
        do {
            $code = 'BC-'.date('Ymd').'-'.strtoupper(Str::random(4));
        } while (static::where('booking_code', $code)->exists());

        return $code;
    }

    /**
     * Get the package associated with the booking.
     */
    public function package(): BelongsTo
    {
        return $this->belongsTo(Package::class);
    }

    /**
     * Scope a query to only include pending bookings.
     */
    #[Scope]
    public function scopePending(Builder $query): Builder
    {
        return $query->where('status', 'pending');
    }

    /**
     * Scope a query to only include confirmed bookings.
     */
    #[Scope]
    public function scopeConfirmed(Builder $query): Builder
    {
        return $query->where('status', 'confirmed');
    }
}
