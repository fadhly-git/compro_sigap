<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class Client extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'slug',
        'sector',
        'description',
        'logo_path',
        'images',
        'website_url',
        'is_active',
        'sort_order',
        'meta_title',
        'meta_description',
        'meta_keywords',
    ];

    protected $casts = [
        'images' => 'array',
        'is_active' => 'boolean',
    ];

    protected static function boot()
    {
        parent::boot();

        static::creating(function ($client) {
            if (empty($client->slug)) {
                $client->slug = Str::slug($client->name);
            }

            if (empty($client->sort_order)) {
                $client->sort_order = static::max('sort_order') + 1;
            }
        });

        static::updating(function ($client) {
            if ($client->isDirty('name') && empty($client->getOriginal('slug'))) {
                $client->slug = Str::slug($client->name);
            }
        });
    }

    public function scopeActive($query)
    {
        return $query->where('is_active', true);
    }

    public function scopeOrdered($query)
    {
        return $query->orderBy('sort_order')->orderBy('name');
    }

    public function getLogoUrlAttribute()
    {
        return $this->logo_path ? asset('storage/' . $this->logo_path) : null;
    }

    public function getImageUrlsAttribute()
    {
        if (!$this->images) return [];

        return collect($this->images)->map(function ($path) {
            return asset('storage/' . $path);
        })->toArray();
    }
}
