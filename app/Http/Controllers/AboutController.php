<?php

namespace App\Http\Controllers;

use App\Models\AboutUs;
use App\Models\Certificate;
use App\Models\CompanySetting;
use Inertia\Inertia;
use Inertia\Response;

class AboutController extends Controller
{
    public function index(): Response
    {
        $about = AboutUs::first();
        $certificates = Certificate::active()->ordered()->get();
        $companySettings = CompanySetting::getSettings();

        return Inertia::render('about', [
            'companySettings' => $companySettings,
            'about' => $about,
            'certificates' => $certificates,
        ]);
    }
}
