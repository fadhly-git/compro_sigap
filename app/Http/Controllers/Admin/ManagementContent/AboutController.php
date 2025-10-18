<?php

namespace App\Http\Controllers\Admin\ManagementContent;

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
            $aboutUs = AboutUs::create([
                'description' => '',
                'vision' => '',
                'mission' => '',
                'meta_title' => 'Tentang Kami',
                'meta_description' => '',
                'meta_keywords' => '',
                'slug' => 'tentang-kami',
            ]);
        }

        return Inertia::render('admin/about', [
            'aboutUs' => [
                ...$aboutUs->toArray(),
                'profile_image' => $aboutUs->profile_images ?? $aboutUs->profile_image ?? null,
            ],
        ]);
    }

    public function update(Request $request)
    {
        $aboutUs = AboutUs::first();

        if (!$aboutUs) {
            $aboutUs = new AboutUs();
        }

        $data = $request->only([
            'description',
            'vision',
            'mission',
            'meta_title',
            'meta_description',
            'meta_keywords',
            'slug',
        ]);

        if (empty($data['slug']) && !empty($data['meta_title'])) {
            $data['slug'] = \Str::slug($data['meta_title']);
        } elseif (!empty($data['slug'])) {
            $data['slug'] = \Str::slug($data['slug']);
        }

        // Handle profile image upload
        if ($request->hasFile('profile_image')) {
            // Delete old image if exists
            if ($aboutUs->profile_image) {
                Storage::disk('public')->delete($aboutUs->profile_image);
            }

            $data['profile_images'] = json_encode([$request->file('profile_image')->store('about-us', 'public')]);
        }

        // Handle profile video upload
        if ($request->hasFile('profile_video')) {
            // Delete old video if exists
            if ($aboutUs->profile_video) {
                Storage::disk('public')->delete($aboutUs->profile_video);
            }

            $data['profile_video'] = json_encode($request->file('profile_video')->store('about-us', 'public'));
        }

        $aboutUs->fill($data);
        $aboutUs->save();

        return redirect()->back()->with('success', 'Data berhasil diperbarui');
    }

    public function deleteMedia(Request $request)
    {
        $aboutUs = AboutUs::first();
        $type = $request->input('type'); // 'image' or 'video'

        if ($aboutUs) {
            if ($type === 'image' && $aboutUs->profile_image) {
                Storage::disk('public')->delete($aboutUs->profile_image);
                $aboutUs->profile_image = null;
                $aboutUs->save();
            } elseif ($type === 'video' && $aboutUs->profile_video) {
                Storage::disk('public')->delete($aboutUs->profile_video);
                $aboutUs->profile_video = null;
                $aboutUs->save();
            }
        }

        return response()->json(['success' => true]);
    }
}
