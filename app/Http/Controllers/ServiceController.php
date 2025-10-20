<?php

namespace App\Http\Controllers;

use App\Models\Service;
use Inertia\Inertia;
use Inertia\Response;

class ServiceController extends Controller
{
    public function index(): Response
    {
        $services = Service::active()->ordered()->get();

        return Inertia::render('services/index', [
            'services' => $services,
        ]);
    }

    public function show(string $slug): Response
    {
        $service = Service::where('slug', $slug)
            ->where('isActive', true)
            ->firstOrFail();

        return Inertia::render('services/show', [
            'service' => $service,
        ]);
    }
}
