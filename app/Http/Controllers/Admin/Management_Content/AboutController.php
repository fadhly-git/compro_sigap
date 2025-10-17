<?php

namespace App\Http\Controllers\Admin\Management_Content;

use App\Http\Controllers\Controller;
use App\Models\AboutUs;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class AboutController extends Controller
{
    public function index()
    {
        $aboutUs = AboutUs::first();

        if (!$aboutUs) {
            $aboutUs = AboutUs::create([]);
        }

        return Inertia::render('admin/management-content/about/index', [
            'aboutUs' => $aboutUs
        ]);
    }

    public function update(Request $request)
    {
        $aboutUs = AboutUs::first();

        if (!$aboutUs) {
            $aboutUs = AboutUs::create([]);
        }

        $validated = $request->validate([
            'description' => 'nullable|string',
            'vision' => 'nullable|string',
            'mission' => 'nullable|string',
            'profile_images' => 'nullable|array',
            'profile_video_url' => 'nullable|url',
            'meta_title' => 'nullable|string|max:255',
            'meta_description' => 'nullable|string|max:500',
            'meta_keywords' => 'nullable|string|max:255',
        ]);

        $aboutUs->update($validated);

        return back()->with('success', 'Data tentang kami berhasil diperbarui');
    }
}
