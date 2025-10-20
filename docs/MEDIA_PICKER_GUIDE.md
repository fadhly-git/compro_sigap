# Media Picker System - Documentation

## Overview

Sistem Media Picker yang fleksibel dan reusable untuk upload dan pilih gambar/video dengan tiga opsi:
1. **Upload file baru** - Upload langsung dari komputer
2. **Pilih dari Media Library** - Pilih dari file yang sudah diupload sebelumnya (reusable)
3. **Gunakan URL** - Input URL gambar dari sumber eksternal

**✅ Full-Stack Integration**: Backend sudah terintegrasi untuk menerima input baik dari file upload maupun path dari media library!

## Architecture

### Frontend (React/TypeScript)
- `MediaPickerModal`: Modal utama untuk browse dan pilih media
- `ImageUploadField`: Component upload gambar dengan integrasi media picker
- `FileUpload`: Component upload file/video dengan integrasi media picker

### Backend (Laravel/PHP)
Semua controller sudah diupdate untuk menerima input **file upload** atau **string path**:
- ✅ `ServicesController` - Field: `image`
- ✅ `GalleryController` - Field: `image_path`
- ✅ `PortfolioController` - Field: `logo_path`, `images[]`
- ✅ `AboutController` - Field: `profile_image`, `profile_video`

### API Endpoints
- `POST /admin/media/upload` - Upload file baru
- `GET /admin/media` - Browse media library
- `DELETE /admin/media/delete` - Delete file (support path atau IDs)

## Components

### 1. MediaPickerModal
Modal utama untuk browse dan pilih media.

#### Props
```typescript
interface MediaPickerModalProps {
    isOpen: boolean                    // Status modal open/close
    onClose: () => void               // Callback saat modal ditutup
    onSelect: (path: string, url: string) => void  // Callback saat file dipilih
    fileType?: 'image' | 'video' | 'all'  // Filter tipe file (default: 'image')
    title?: string                    // Title modal (default: 'Pilih Media')
}
```

#### Features
- **Tab Library**: Browse dan search media yang sudah diupload
  - Search by filename
  - Sort by: newest, oldest, name (A-Z, Z-A), size
  - Grid layout dengan preview
  - File info (filename, extension, size)
  
- **Tab Upload**: Upload file baru
  - Drag & drop support
  - Preview sebelum upload
  - Validasi tipe dan ukuran file
  
- **Tab URL**: Input URL eksternal
  - URL validation
  - Preview gambar
  - Support storage path atau URL eksternal

#### Example Usage
```tsx
import { MediaPickerModal } from '@/components/molecules/media-picker-modal'

function MyComponent() {
    const [showPicker, setShowPicker] = useState(false)
    
    const handleSelect = (path: string, url: string) => {
        console.log('Selected path:', path)
        console.log('Preview URL:', url)
        // path: untuk simpan ke database
        // url: untuk preview/display
    }
    
    return (
        <>
            <Button onClick={() => setShowPicker(true)}>
                Pilih Gambar
            </Button>
            
            <MediaPickerModal
                isOpen={showPicker}
                onClose={() => setShowPicker(false)}
                onSelect={handleSelect}
                fileType="image"
                title="Pilih Gambar Produk"
            />
        </>
    )
}
```

---

### 2. ImageUploadField
Component untuk upload gambar dengan integrasi media picker.

#### Props
```typescript
interface ImageUploadFieldProps {
    label: string                     // Label field
    value: string | null             // Path gambar (bukan File object)
    onChange: (path: string) => void // Callback dengan path
    onDelete: () => void            // Callback untuk hapus
    required?: boolean              // Field required?
    categoryId?: number            // ID kategori (optional)
    title?: string                 // Title untuk context (optional)
    context?: string               // Context upload (default: 'gallery')
    className?: string             // CSS classes tambahan
}
```

#### Features
- Upload langsung via API `/admin/media/upload`
- Pilih dari media library
- Preview gambar
- Delete dengan konfirmasi
- Responsive design

#### Example Usage
```tsx
import { ImageUploadField } from '@/components/molecules/image-upload-field'

function ProductForm() {
    const [imagePath, setImagePath] = useState<string | null>(null)
    
    return (
        <ImageUploadField
            label="Gambar Produk"
            value={imagePath}
            onChange={(path) => setImagePath(path)}
            onDelete={() => setImagePath(null)}
            required
            context="products"
        />
    )
}
```

---

### 3. FileUpload
Component untuk upload file (image/video) dengan media picker.

#### Props
```typescript
interface FileUploadProps {
    label: string                    // Label field
    accept: string                   // Accept types (e.g., "image/*")
    value: string | null            // URL atau path file
    onChange: (file: File | null) => void  // Callback dengan File object
    onDelete: () => void           // Callback untuk hapus
    type: 'image' | 'video'        // Tipe media
    error?: string                 // Error message
    className?: string             // CSS classes tambahan
}
```

#### Features
- Upload image atau video
- Preview dengan modal
- Pilih dari media library
- Support File object untuk compatibility dengan form

#### Example Usage
```tsx
import { FileUpload } from '@/components/atoms/file-upload'

function AboutForm() {
    const { data, setData } = useForm({
        profile_image: null as File | null
    })
    
    return (
        <FileUpload
            label="Foto Profil"
            accept="image/*"
            value={data.profile_image}
            onChange={(file) => setData('profile_image', file)}
            onDelete={() => setData('profile_image', null)}
            type="image"
        />
    )
}
```

---

## API Endpoints

### GET /admin/media
List semua media files dengan filter dan sort.

**Query Parameters:**
- `search`: string - Search by filename
- `sort_by`: 'newest' | 'oldest' | 'name' | 'name_desc' | 'size' | 'size_desc'
- `file_type`: 'image' | 'video' | 'document' | 'all'
- `page`: number - Pagination
- `per_page`: number - Items per page (default: 24)

**Response:**
```json
{
    "files": {
        "data": [
            {
                "id": 12345,
                "filename": "image.jpg",
                "path": "media/image.jpg",
                "size": 1024000,
                "type": "image",
                "extension": "jpg",
                "created_at": "2025-10-19 12:00:00"
            }
        ],
        "current_page": 1,
        "last_page": 5,
        "total": 120,
        "per_page": 24
    }
}
```

### POST /admin/media/upload
Upload file baru.

**Body (FormData):**
- `file`: File - File to upload

**Response:**
```json
{
    "success": true,
    "url": "/storage/media/filename.jpg",
    "path": "media/filename.jpg",
    "filename": "original_name.jpg"
}
```

### DELETE /admin/media/delete
Hapus file.

**Body (JSON):**

Option 1 - Single file:
```json
{
    "path": "media/filename.jpg"
}
```

Option 2 - Multiple files:
```json
{
    "ids": [12345, 67890]
}
```

**Response:**
```json
{
    "success": true,
    "message": "File berhasil dihapus"
}
```

---

## Migration Guide

### Dari Upload File ke Media Picker

**Sebelum:**
```tsx
const [imageFile, setImageFile] = useState<File | null>(null)

<input 
    type="file" 
    onChange={(e) => setImageFile(e.target.files[0])}
/>
```

**Sesudah (Option 1 - ImageUploadField):**
```tsx
const [imagePath, setImagePath] = useState<string | null>(null)

<ImageUploadField
    label="Gambar"
    value={imagePath}
    onChange={setImagePath}
    onDelete={() => setImagePath(null)}
/>
```

**Sesudah (Option 2 - FileUpload - for compatibility):**
```tsx
const [imageFile, setImageFile] = useState<File | null>(null)

<FileUpload
    label="Gambar"
    accept="image/*"
    value={imageFile}
    onChange={setImageFile}
    onDelete={() => setImageFile(null)}
    type="image"
/>
```

---

## Benefits

### 1. Reusability
- Gambar yang sama bisa dipakai di berbagai tempat
- Tidak perlu upload ulang file yang sama
- Hemat storage space

### 2. Media Management
- Centralized media library
- Easy to browse dan search
- Bulk operations support

### 3. Flexibility
- 3 cara input: upload, library, URL
- Support both image dan video
- Customizable untuk berbagai use case

### 4. Better UX
- Preview sebelum pilih
- Search dan filter
- Responsive design
- Loading states

---

## Best Practices

### 1. Gunakan ImageUploadField untuk single image
```tsx
// ✅ Good
<ImageUploadField
    label="Featured Image"
    value={data.image_path}
    onChange={(path) => setData('image_path', path)}
    onDelete={() => setData('image_path', null)}
/>
```

### 2. Simpan path, bukan URL
```tsx
// ✅ Good - simpan path
data.image_path = "media/image.jpg"

// ❌ Bad - jangan simpan full URL
data.image_path = "http://domain.com/storage/media/image.jpg"
```

### 3. Preview dengan /storage/ prefix
```tsx
// ✅ Good - untuk display
const imageUrl = `/storage/${data.image_path}`
<img src={imageUrl} />

// ❌ Bad - jangan simpan prefix di database
```

### 4. Validate file size dan type
```tsx
// Upload controller sudah handle validation:
// - Image: max 5MB
// - Video: max 10MB
// - Allowed types configured
```

### 5. Error Handling
```tsx
<ImageUploadField
    label="Gambar"
    value={imagePath}
    onChange={handleImageChange}
    onDelete={handleImageDelete}
/>

// Handle errors
const handleImageChange = (path: string) => {
    if (!path) {
        toast.error('Upload gagal')
        return
    }
    setImagePath(path)
}
```

---

## Troubleshooting

### Issue: "Cannot find module '@/components/ui/scroll-area'"
**Solution:** Run `npx shadcn@latest add scroll-area`

### Issue: Preview tidak muncul
**Solution:** Pastikan storage link sudah dibuat:
```bash
php artisan storage:link
```

### Issue: CSRF token mismatch
**Solution:** Pastikan meta tag csrf ada di layout:
```html
<meta name="csrf-token" content="{{ csrf_token() }}">
```

### Issue: Upload gagal
**Solution:** 
1. Check file permissions di `storage/app/public/media`
2. Check max upload size di `php.ini`
3. Check Laravel file validation rules

---

## Backend Integration Details

### How It Works

Semua controller sudah diupdate untuk menerima input **file upload** ATAU **string path**:

#### ServicesController
```php
// store() dan update()
if ($request->hasFile('image')) {
    // Upload file baru
    $validated['image'] = $request->file('image')->store('services', 'public');
} elseif (is_string($request->input('image')) && !empty($request->input('image'))) {
    // Path dari media library
    $validated['image'] = $request->input('image');
}
```

#### GalleryController
```php
// storeItem() dan updateItem()
// Sudah menerima image_path sebagai string langsung
$validated = $request->validate([
    'image_path' => 'required|string',
    // ...
]);
```

#### PortfolioController
```php
// store() dan update()
// Handle logo_path
if ($request->hasFile('logo_path')) {
    $validated['logo_path'] = $request->file('logo_path')->store('portfolio/logos', 'public');
} elseif (is_string($request->input('logo_path'))) {
    $validated['logo_path'] = $request->input('logo_path');
}

// Handle images array
foreach ($validated['images'] as $image) {
    if (is_string($image) && !empty($image)) {
        $processedImages[] = $image;
    }
}
```

#### AboutController
```php
// update()
// Handle profile_image dan profile_video
if ($request->hasFile('profile_image')) {
    $data['profile_images'] = json_encode([$request->file('profile_image')->store('about-us', 'public')]);
} elseif (is_string($request->input('profile_image'))) {
    $data['profile_images'] = json_encode([$request->input('profile_image')]);
}
```

### API Routes
```php
// routes/admin.php
Route::prefix('media')->group(function () {
    Route::get('/data', [MediaUploadController::class, 'data']); // Untuk MediaPickerModal
    Route::post('/upload', [MediaUploadController::class, 'upload']); // Upload file baru
    Route::delete('/delete', [MediaUploadController::class, 'delete']); // Delete file
});
```

---

## Testing

Test semua scenarios:

```bash
# 1. Upload new image
✓ Select file → Upload → Verify preview
✓ Check file saved in storage/app/public/media
✓ Check path saved correctly in database

# 2. Pick from library
✓ Open media picker
✓ Search files
✓ Sort files
✓ Select file → Verify preview
✓ Submit form → Check path saved correctly
✓ Verify file reused (no duplicate)

# 3. Use URL
✓ Enter URL
✓ Verify preview
✓ Submit form
✓ Check URL/path saved correctly

# 4. Delete
✓ Delete file
✓ Verify preview cleared
✓ Verify database updated
✓ Verify file deleted from storage

# 5. Backend Integration
✓ Submit form dengan file upload → Check stored correctly
✓ Submit form dengan path dari library → Check path saved
✓ Update existing data → Old file deleted, new file/path saved
```

---

## Future Enhancements

- [ ] Bulk upload support
- [ ] Image editing (crop, resize) before save
- [ ] Folder organization
- [ ] Tags and categories
- [ ] Usage tracking (which files used where)
- [ ] Duplicate detection
- [ ] Image optimization on upload
- [ ] CDN integration

---

## Support

For issues or questions:
1. Check this documentation
2. Check component prop types
3. Check browser console for errors
4. Check Laravel logs for server errors
