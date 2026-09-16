<?php

namespace App\Models;

use Carbon\CarbonInterface;
use Database\Factories\BlockedDateFactory;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class BlockedDate extends Model
{
    /** @use HasFactory<BlockedDateFactory> */
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'date',
        'reason',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'date' => 'date',
        ];
    }

    /**
     * Check if a specific date is blocked.
     */
    public static function isDateBlocked(CarbonInterface|string $date): bool
    {
        $dateString = $date instanceof CarbonInterface ? $date->toDateString() : $date;

        return static::whereDate('date', $dateString)->exists();
    }
}
