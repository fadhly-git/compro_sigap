<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class AboutUs extends Model
{
    use HasFactory;
    protected $table = 'about_us';

    protected $fillable = [
        'description',
        'vision',
        'mission',
        'profile_images',
        'profile_video_url',
        'meta_title',
        'meta_description',
        'meta_keywords',
        'slug'
    ];

    protected $casts = [
        'profile_images' => 'array',
    ];

    public function getMetaTitleAttribute($value)
    {
        return $value ?: 'Tentang Kami - ' . config('app.name');
    }

    public function getMetaDescriptionAttribute($value)
    {
        return $value ?: 'Pelajari lebih lanjut tentang perusahaan kami, visi, misi, dan komitmen dalam memberikan layanan terbaik.';
    }

}
