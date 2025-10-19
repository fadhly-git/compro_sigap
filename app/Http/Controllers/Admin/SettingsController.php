<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\CompanySetting;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class SettingsController extends Controller
{
    public function index()
    {
        $settings = CompanySetting::getSettings();

        return Inertia::render('admin/settings', [
            'settings' => $settings
        ]);
    }

    public function update(Request $request)
    {
        $settings = CompanySetting::firstOrNew();

        $data = $request->all();

        // Handle social media as JSON
        if (isset($data['social_media'])) {
            $data['social_media'] = json_encode($data['social_media']);
        }

        $settings->fill($data);
        $settings->save();

        return redirect()->back()->with('success', 'Pengaturan berhasil disimpan');
    }

    public function deleteMedia(Request $request)
    {
        $path = $request->input('path');
        $field = $request->input('field');

        if ($path && Storage::disk('public')->exists($path)) {
            Storage::disk('public')->delete($path);
        }

        $settings = CompanySetting::firstOrNew();
        $settings->update([$field => null]);

        return response()->json(['success' => true]);
    }
}
