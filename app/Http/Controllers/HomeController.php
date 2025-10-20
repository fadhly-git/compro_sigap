<?php

namespace App\Http\Controllers;

use App\Models\AboutUs;
use App\Models\Certificate;
use App\Models\Client;
use App\Models\CompanySetting;
use App\Models\GalleryItem;
use App\Models\Service;
use Inertia\Inertia;
use Inertia\Response;

class HomeController extends Controller
{
    public function index(): Response
    {
        // Company Settings
        $companySettings = CompanySetting::first() ?? new CompanySetting([
            'company_name' => 'Company Name',
            'company_description' => 'Company Description'
        ]);

        // Featured Services (4 first active services)
        $featuredServices = Service::active()
            ->ordered()
            ->take(4)
            ->get(['id', 'title', 'slug', 'description', 'image']);

        // Client Logos
        $clientLogos = Client::active()
            ->ordered()
            ->take(12)
            ->get(['id', 'name', 'logo_path', 'sector']);

        // Mini Gallery (latest 6 items from "Kegiatan" category or any active category)
        $miniGallery = GalleryItem::active()
            ->ordered()
            ->with('category:id,name')
            ->take(6)
            ->get(['id', 'title', 'image_path', 'alt_text', 'gallery_category_id']);

        // About Snippet
        $aboutSnippet = AboutUs::first(['description', 'vision', 'mission']);

        // Certificates
        $certificates = Certificate::active()
            ->ordered()
            ->get(['id', 'title', 'image_path', 'issuer']);

        return Inertia::render('home', [
            'companySettings' => $companySettings,
            'featuredServices' => $featuredServices,
            'clientLogos' => $clientLogos,
            'miniGallery' => $miniGallery,
            'aboutSnippet' => $aboutSnippet,
            'certificates' => $certificates,
        ]);
    }
}
