<?php

namespace App\Http\Controllers;

use App\Models\AboutUs;
use App\Models\Certificate;
use Inertia\Inertia;
use Inertia\Response;

class AboutController extends Controller
{
    public function index(): Response
    {
        $about = AboutUs::first();
        $certificates = Certificate::active()->ordered()->get();

        return Inertia::render('about', [
            'about' => $about,
            'certificates' => $certificates,
        ]);
    }
}
