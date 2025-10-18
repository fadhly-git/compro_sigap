<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\GalleryCategory;
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
            // Determine upload directory and filename based on context
            $context = $request->input('context', 'general'); // gallery, editor, general
            $categoryId = $request->input('category_id');
            $title = $request->input('title', '');

            $path = $this->handleUploadByContext($file, $context, $categoryId, $title);
            $url = Storage::url($path);

            return response()->json([
                'success' => true,
                'url' => $url,
                'path' => $path
            ]);
        } catch (\Exception $e) {
            return response()->json(['success' => false, 'error' => 'Upload failed: ' . $e->getMessage()]);
        }
    }

    private function handleUploadByContext($file, $context, $categoryId = null, $title = '')
    {
        $extension = $file->getClientOriginalExtension();

        switch ($context) {
            case 'gallery':
                return $this->handleGalleryUpload($file, $categoryId, $title, $extension);

            case 'editor':
                // For rich text editor images
                $filename = 'editor_' . time() . '_' . uniqid() . '.' . $extension;
                return $file->storeAs('editor-images', $filename, 'public');

            default:
                // General upload
                $filename = 'upload_' . time() . '_' . uniqid() . '.' . $extension;
                return $file->storeAs('uploads', $filename, 'public');
        }
    }

    private function handleGalleryUpload($file, $categoryId, $title, $extension)
    {
        // Get category info
        $category = null;
        if ($categoryId) {
            $category = GalleryCategory::find($categoryId);
        }

        // Create safe directory name from category
        $categoryDir = 'gallery';
        if ($category) {
            $safeCategoryName = $this->createSafeFilename($category->name);
            $categoryDir = 'gallery/' . $safeCategoryName;
        }

        // Create safe filename from title
        $safeTitle = $title ? $this->createSafeFilename($title) : 'item';
        $filename = $safeTitle . '_' . time() . '.' . $extension;

        return $file->storeAs($categoryDir, $filename, 'public');
    }

    /**
     * Create safe filename from string
     */
    private function createSafeFilename($string)
    {
        // Convert to lowercase
        $filename = strtolower($string);

        // Replace spaces and special characters with underscores
        $filename = preg_replace('/[^a-z0-9]+/', '_', $filename);

        // Remove multiple underscores
        $filename = preg_replace('/_+/', '_', $filename);

        // Remove leading/trailing underscores
        $filename = trim($filename, '_');

        // Limit length
        $filename = substr($filename, 0, 50);

        return $filename ?: 'unnamed';
    }

    public function delete(Request $request)
    {
        $url = $request->input('url');
        $path = $request->input('path'); // Accept path directly

        if (!$url && !$path) {
            return response()->json(['success' => false, 'error' => 'No URL or path provided']);
        }

        // If only URL provided, extract path from URL
        if (!$path && $url) {
            $path = str_replace('/storage/', '', parse_url($url, PHP_URL_PATH));
        }

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
