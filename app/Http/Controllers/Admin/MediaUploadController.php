<?php
// app/Http/Controllers/Admin/MediaUploadController.php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class MediaUploadController extends Controller
{
    public function upload(Request $request)
    {
        if (!$request->hasFile('file')) {
            return response()->json(['success' => false, 'error' => 'No file uploaded']);
        }

        $file = $request->file('file');

        // Validate file
        if (!$file->isValid()) {
            return response()->json(['success' => false, 'error' => 'Invalid file']);
        }

        // Check file type
        $allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
        if (!in_array($file->getMimeType(), $allowedTypes)) {
            return response()->json(['success' => false, 'error' => 'File type not allowed']);
        }

        // Check file size (max 5MB)
        if ($file->getSize() > 5242880) {
            return response()->json(['success' => false, 'error' => 'File size too large']);
        }

        try {
            $path = $file->store('editor-images', 'public');
            $url = Storage::url($path);

            return response()->json([
                'success' => true,
                'url' => $url,
                'path' => $path
            ]);
        } catch (\Exception $e) {
            return response()->json(['success' => false, 'error' => 'Upload failed']);
        }
    }

    public function delete(Request $request)
    {
        $url = $request->input('url');

        if (!$url) {
            return response()->json(['success' => false, 'error' => 'No URL provided']);
        }

        // Extract path from URL
        $path = str_replace('/storage/', '', parse_url($url, PHP_URL_PATH));

        try {
            if (Storage::disk('public')->exists($path)) {
                Storage::disk('public')->delete($path);
            }

            return response()->json(['success' => true]);
        } catch (\Exception $e) {
            return response()->json(['success' => false, 'error' => 'Delete failed']);
        }
    }
}
