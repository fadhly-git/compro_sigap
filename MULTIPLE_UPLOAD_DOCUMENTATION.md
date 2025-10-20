# Multiple Upload Feature - Documentation

## 🎉 Fitur Baru: Multiple Image Upload & Video URL Support

### Overview
Sekarang `FileUpload` component dan backend controller sudah mendukung:
- ✅ **Multiple image upload/select** dari media library
- ✅ **Video URL support** (YouTube, Vimeo, atau upload file)
- ✅ **Grid preview** untuk multiple items
- ✅ **Drag indicator** nomor urut untuk multiple selection

---

## 📦 Frontend Components

### 1. FileUpload Component (`file-upload.tsx`)

**Props Updated:**
```typescript
interface FileUploadProps {
    label: string
    accept: string
    value: string | string[] | null  // ✨ Now supports array
    onChange: (files: File | string | File[] | string[] | null) => void  // ✨ Multiple support
    type: 'image' | 'video'
    error?: string
    className?: string
    multiple?: boolean  // ✨ NEW: Enable multiple selection
}
```

**Usage Single:**
```typescript
<FileUpload
    label="Logo Perusahaan"
    accept="image/*"
    value={data.logo}
    onChange={(file) => setData('logo', file)}
    type="image"
/>
```

**Usage Multiple:**
```typescript
<FileUpload
    label="Foto Profil Perusahaan (Multiple)"
    accept="image/*"
    value={data.profile_images}  // array of strings
    onChange={(files) => setData('profile_images', files)}
    type="image"
    multiple={true}  // ✨ Enable multiple
/>
```

**Features:**
- ✅ Grid layout 2-4 columns untuk preview multiple images
- ✅ Individual delete button untuk setiap item
- ✅ Preview modal dengan counter (1/3, 2/3, etc.)
- ✅ "Tambah Lagi" button untuk menambah lebih banyak dari library
- ✅ Thumbnail preview untuk images, icon untuk videos

---

### 2. MediaPickerModal Component (`media-picker-modal.tsx`)

**Props Updated:**
```typescript
interface MediaPickerModalProps {
    isOpen: boolean
    onClose: () => void
    onSelect: (paths: string | string[]) => void  // ✨ Now supports array
    fileType?: 'image' | 'video' | 'all'
    title?: string
    multiple?: boolean  // ✨ NEW: Enable multiple selection
}
```

**Usage:**
```typescript
<MediaPickerModal
    isOpen={showPicker}
    onClose={() => setShowPicker(false)}
    onSelect={(paths) => handleMediaSelect(paths)}
    fileType="image"
    title="Pilih Gambar (Multiple)"
    multiple={true}  // ✨ Enable multiple
/>
```

**Features Multiple Mode:**
- ✅ Click untuk toggle selection (bukan langsung pilih)
- ✅ Checkmark icon di selected items
- ✅ Nomor urut di pojok kiri atas (1, 2, 3, ...)
- ✅ Button "Pilih X Files" dengan counter
- ✅ Selected state persists sampai confirm atau cancel

---

## 🔧 Backend Controller

### AboutController Update

**Index Method:**
```php
public function index()
{
    $aboutUs = AboutUs::first();
    
    // Parse JSON to array
    $profileImages = null;
    if ($aboutUs->profile_images) {
        $profileImages = is_string($aboutUs->profile_images) 
            ? json_decode($aboutUs->profile_images, true) 
            : $aboutUs->profile_images;
    }

    return Inertia::render('admin/about', [
        'aboutUs' => [
            'profile_images' => $profileImages,  // Array of paths
            'profile_video_url' => $aboutUs->profile_video_url,
            // ... other fields
        ],
    ]);
}
```

**Update Method - Multiple Images:**
```php
// Handle multiple profile images
$uploadedImages = [];
$profileImagesInput = $request->input('profile_images');

// 1. Handle file uploads
if ($request->hasFile('profile_images')) {
    $files = $request->file('profile_images');
    if (!is_array($files)) {
        $files = [$files];
    }
    foreach ($files as $file) {
        $uploadedImages[] = $file->store('about-us', 'public');
    }
}

// 2. Handle paths from media library
if (is_array($profileImagesInput)) {
    foreach ($profileImagesInput as $item) {
        if (is_string($item) && !empty($item)) {
            $uploadedImages[] = $item;
        }
    }
}

// 3. Store as JSON
if (!empty($uploadedImages)) {
    $data['profile_images'] = json_encode($uploadedImages);
}
```

**Update Method - Video URL:**
```php
$profileVideoInput = $request->input('profile_video_url');

if ($request->hasFile('profile_video_url')) {
    // Upload video file
    $data['profile_video_url'] = $videoFile->store('about-us/videos', 'public');
} elseif (is_string($profileVideoInput) && !empty($profileVideoInput)) {
    // Path from library OR external URL (YouTube, etc)
    $data['profile_video_url'] = $profileVideoInput;
} elseif ($profileVideoInput === null) {
    $data['profile_video_url'] = null;
}
```

**Delete Media Method:**
```php
public function deleteMedia(Request $request)
{
    $type = $request->input('type');  // 'images' or 'video'
    $path = $request->input('path');  // Specific image path

    if ($type === 'images' && $path) {
        // Remove specific image from array
        $currentImages = json_decode($aboutUs->profile_images, true);
        $currentImages = array_filter($currentImages, fn($img) => $img !== $path);
        
        // Delete physical file
        Storage::disk('public')->delete($path);
        
        // Update database
        $aboutUs->profile_images = !empty($currentImages) 
            ? json_encode(array_values($currentImages)) 
            : null;
    }
}
```

---

## 📊 Database Schema

**about_us table:**
```php
Schema::create('about_us', function (Blueprint $table) {
    $table->id();
    $table->text('description')->nullable();
    $table->text('vision')->nullable();
    $table->text('mission')->nullable();
    $table->json('profile_images')->nullable();  // Array: ["path1.jpg", "path2.jpg"]
    $table->string('profile_video_url')->nullable();  // String: path or URL
    $table->string('meta_title')->nullable();
    $table->text('meta_description')->nullable();
    $table->text('meta_keywords')->nullable();
    $table->string('slug')->default('about-us');
    $table->timestamps();
});
```

**Data Example:**
```json
{
    "profile_images": [
        "about-us/team-photo-1.jpg",
        "about-us/team-photo-2.jpg",
        "about-us/office-building.jpg"
    ],
    "profile_video_url": "https://www.youtube.com/watch?v=dQw4w9WgXcQ"
}
```

---

## 🎨 UI/UX Features

### Single Upload Mode
```
┌─────────────────────────────────┐
│  [📁] Gambar berhasil dipilih   │
│                                  │
│  Klik preview untuk melihat     │
│                                  │
│  [👁️ Preview] [🔄 Ganti] [❌ Hapus] │
└─────────────────────────────────┘
```

### Multiple Upload Mode
```
┌─────────────────────────────────────────────────────┐
│  3 Gambar dipilih       [📂 Tambah Lagi]           │
├─────────────┬─────────────┬─────────────┬──────────┤
│ [✓] 1       │ [✓] 2       │ [✓] 3       │          │
│ [image]     │ [image]     │ [image]     │          │
│ [👁️] [❌]    │ [👁️] [❌]    │ [👁️] [❌]    │          │
└─────────────┴─────────────┴─────────────┴──────────┘
```

### Media Picker Modal (Multiple Mode)
```
┌───────────────────────────────────────────────────┐
│  Pilih Gambar (Multiple)                    [❌]   │
├───────────────────────────────────────────────────┤
│  [📚 Library] [⬆️ Upload] [🔗 URL]                │
├───────────────────────────────────────────────────┤
│                                                    │
│  ┌──────┐  ┌──────┐  ┌──────┐  ┌──────┐         │
│  │ [✓]1 │  │ [✓]2 │  │ [✓]3 │  │      │         │
│  │ img  │  │ img  │  │ img  │  │ img  │         │
│  └──────┘  └──────┘  └──────┘  └──────┘         │
│                                                    │
├───────────────────────────────────────────────────┤
│                      [Batal] [Pilih 3 Files]      │
└───────────────────────────────────────────────────┘
```

---

## 🔄 Data Flow

### Upload Flow (Multiple Images)
```
1. User clicks "Pilih dari Media Library"
   ↓
2. MediaPickerModal opens with multiple=true
   ↓
3. User clicks multiple images (toggle selection)
   ↓
4. User clicks "Pilih X Files"
   ↓
5. onSelect callback receives: ["path1.jpg", "path2.jpg", "path3.jpg"]
   ↓
6. FileUpload updates value and preview
   ↓
7. Form submit sends array to backend
   ↓
8. Backend stores as JSON: json_encode(["path1", "path2", "path3"])
```

### Load Flow (Multiple Images)
```
1. Backend fetches from DB: profile_images = '["path1","path2","path3"]'
   ↓
2. Backend parses JSON: json_decode($profileImages, true)
   ↓
3. Inertia sends array: ['path1', 'path2', 'path3']
   ↓
4. Frontend receives array
   ↓
5. FileUpload displays grid with 3 items
```

---

## 🐛 Troubleshooting

### Issue: "images.map is not a function"
**Cause:** `profile_images` is JSON string, not array

**Solution:** Backend must parse JSON:
```php
$profileImages = is_string($aboutUs->profile_images) 
    ? json_decode($aboutUs->profile_images, true) 
    : $aboutUs->profile_images;
```

### Issue: Only 1 image shows instead of multiple
**Cause:** Backend not returning array properly

**Solution:** Check controller index method returns parsed array

### Issue: Video URL not saving
**Cause:** Backend not handling string input for video

**Solution:** Check controller handles both file upload AND string URL:
```php
elseif (is_string($profileVideoInput) && !empty($profileVideoInput)) {
    $data['profile_video_url'] = $profileVideoInput;
}
```

---

## ✅ Testing Checklist

### Multiple Images
- [ ] Upload multiple files via file input
- [ ] Select multiple from media library
- [ ] Preview individual images
- [ ] Delete individual images
- [ ] "Tambah Lagi" button adds more images
- [ ] Submit form saves all images
- [ ] Refresh page loads all images
- [ ] Delete all images clears field

### Video URL
- [ ] Upload video file
- [ ] Select video from library
- [ ] Enter YouTube URL
- [ ] Preview video
- [ ] Delete video
- [ ] Submit saves video URL
- [ ] External URLs don't trigger deletion

---

## 🎉 Summary

**Before:**
- ❌ Single image only
- ❌ No video support
- ❌ Had to delete + re-upload to change

**After:**
- ✅ Multiple images support
- ✅ Video file upload OR external URL
- ✅ Add more images without losing existing
- ✅ Individual delete per item
- ✅ Grid preview with thumbnails
- ✅ Selection counter in modal
- ✅ Works with media library AND direct upload

**Use Cases:**
1. **About Page:** Multiple team photos + company video
2. **Portfolio:** Multiple project images
3. **Gallery:** Multiple category images
4. **Testimonials:** Multiple client photos + video testimonial

---

Sekarang semua komponen sudah support multiple upload dan video URL! 🚀
