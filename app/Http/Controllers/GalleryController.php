<?php

namespace App\Http\Controllers;

use App\Models\GalleryCategory;
use Inertia\Inertia;
use Inertia\Response;

class GalleryController extends Controller
{
    public function index(): Response
    {
        $categories = GalleryCategory::with(['activeItems' => function ($query) {
            $query->take(4);
        }])
            ->active()
            ->ordered()
            ->withCount('activeItems')
            ->get();

        return Inertia::render('gallery/index', [
            'categories' => $categories,
        ]);
    }

    public function category(string $slug): Response
    {
        $category = GalleryCategory::with('activeItems')
            ->where('slug', $slug)
            ->where('is_active', true)
            ->firstOrFail();

        return Inertia::render('gallery/category', [
            'category' => $category,
        ]);
    }
}
