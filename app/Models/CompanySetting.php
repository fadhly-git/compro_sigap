<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class CompanySetting extends Model
{
    protected $fillable = [
        'company_name',
        'company_address',
        'company_phone',
        'company_email',
        'company_website',
        'company_description',
        'logo_path',
        'favicon_path',
        'social_media',
        'google_maps_embed',
        'whatsapp_number',
        'whatsapp_default_message',
        'whatsapp_enabled',
        'meta_title',
        'meta_description',
        'meta_keywords',
    ];

    protected $casts = [
        'social_media' => 'array',
        'whatsapp_enabled' => 'boolean',
    ];

    public static function getSettings()
    {
        $settings = self::all()->pluck('value', 'key');

        return [
            'company_name' => $settings['company_name'] ?? '',
            'company_address' => $settings['company_address'] ?? '',
            'company_phone' => $settings['company_phone'] ?? '',
            'company_email' => $settings['company_email'] ?? '',
            'company_website' => $settings['company_website'] ?? '',
            'company_description' => $settings['company_description'] ?? '',
            'logo_path' => $settings['logo_path'] ?? null,
            'favicon_path' => $settings['favicon_path'] ?? null,
            'social_media' => $settings['social_media'] ?? [
                'facebook' => '',
                'instagram' => '',
                'twitter' => '',
                'linkedin' => '',
                'youtube' => ''
            ],
            'google_maps_embed' => $settings['google_maps_embed'] ?? '',
            'whatsapp_number' => $settings['whatsapp_number'] ?? '',
            'whatsapp_default_message' => $settings['whatsapp_default_message'] ?? '',
            'whatsapp_enabled' => (bool)($settings['whatsapp_enabled'] ?? false),
            'meta_title' => $settings['meta_title'] ?? '',
            'meta_description' => $settings['meta_description'] ?? '',
            'meta_keywords' => $settings['meta_keywords'] ?? '',
        ];
    }

    public static function updateSettings(array $data)
    {
        foreach ($data as $key => $value) {
            self::updateOrCreate(
                ['key' => $key],
                [
                    'value' => $value,
                    'type' => self::getTypeForKey($key),
                    'group' => self::getGroupForKey($key)
                ]
            );
        }
    }

    public static function updateSetting(string $key, $value)
    {
        self::updateOrCreate(
            ['key' => $key],
            [
                'value' => $value,
                'type' => self::getTypeForKey($key),
                'group' => self::getGroupForKey($key)
            ]
        );
    }

    private static function getTypeForKey(string $key): string
    {
        $types = [
            'whatsapp_enabled' => 'boolean',
            'social_media' => 'json',
            'logo_path' => 'file',
            'favicon_path' => 'file',
        ];

        return $types[$key] ?? 'string';
    }

    private static function getGroupForKey(string $key): string
    {
        $groups = [
            'company_name' => 'company',
            'company_address' => 'company',
            'company_phone' => 'company',
            'company_email' => 'company',
            'company_website' => 'company',
            'company_description' => 'company',
            'logo_path' => 'media',
            'favicon_path' => 'media',
            'social_media' => 'social',
            'google_maps_embed' => 'maps',
            'whatsapp_number' => 'whatsapp',
            'whatsapp_default_message' => 'whatsapp',
            'whatsapp_enabled' => 'whatsapp',
            'meta_title' => 'seo',
            'meta_description' => 'seo',
            'meta_keywords' => 'seo',
        ];

        return $groups[$key] ?? 'general';
    }
}
