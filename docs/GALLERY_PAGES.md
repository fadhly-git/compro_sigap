# Gallery Pages Documentation

## Overview
Halaman Gallery terdiri dari 2 halaman utama:
1. **Gallery Index** (`/gallery`) - Menampilkan semua kategori galeri
2. **Gallery Category** (`/gallery/{slug}`) - Menampilkan semua foto dalam satu kategori dengan lightbox

## Struktur Komponen (Atomic Design)

### Atoms
- `Button` - Tombol dari Shadcn UI
- `Card`, `CardContent`, `CardDescription`, `CardHeader`, `CardTitle` - Card components
- `Dialog`, `DialogContent` - Dialog untuk lightbox

### Molecules
- `GalleryCategoryPublicCard` - Card untuk menampilkan preview kategori
  - Location: `resources/js/components/molecules/gallery-category-public-card.tsx`
  - Props: `category: GalleryCategory`
  - Features:
    - Thumbnail dari item pertama
    - Badge jumlah foto
    - Nama dan deskripsi kategori
    - Link ke halaman detail kategori

- `GalleryItemPublicCard` - Card untuk menampilkan foto individual
  - Location: `resources/js/components/molecules/gallery-item-public-card.tsx`
  - Props: `item: GalleryItem`, `onClick?: () => void`
  - Features:
    - Lazy loading image
    - Hover overlay dengan title dan description
    - Click handler untuk lightbox
    - Aspect ratio square

### Organisms
- `GalleryHeroSection` - Hero section untuk halaman gallery
  - Location: `resources/js/components/sections/gallery-hero-section.tsx`
  - Props: `title?: string`, `description?: string`
  - Features: Title, description, decorative elements

- `GalleryCategoriesSection` - Grid untuk menampilkan semua kategori
  - Location: `resources/js/components/sections/gallery-categories-section.tsx`
  - Props: `categories: GalleryCategory[]`
  - Features: Responsive grid (1 col mobile, 2 cols tablet, 3 cols desktop)

- `GalleryCategoryDetailSection` - Detail kategori dengan lightbox
  - Location: `resources/js/components/sections/gallery-category-detail-section.tsx`
  - Props: `category: GalleryCategory`
  - Features:
    - Back button ke gallery index
    - Category title dan description
    - Responsive grid foto (2-4 columns)
    - Lightbox dengan keyboard navigation
    - Previous/Next navigation
    - Image counter
    - Image title dan description

### Pages
- `gallery/index.tsx` - Halaman list kategori galeri
- `gallery/category.tsx` - Halaman detail kategori dengan foto

### Templates
- `MainLayout` - Layout utama yang digunakan oleh semua halaman public

## Backend Structure

### Controller
- `GalleryController` - Controller untuk handle routes
  - Location: `app/Http/Controllers/GalleryController.php`
  - Methods:
    - `index()` - Menampilkan list kategori dengan preview (4 foto pertama)
    - `category($slug)` - Menampilkan detail kategori dengan semua foto aktif

### Routes
Defined in `routes/public.php`:
```php
Route::get('/gallery', [GalleryController::class, 'index'])->name('gallery.index');
Route::get('/gallery/{slug}', [GalleryController::class, 'category'])->name('gallery.category');
```

### Models
- `GalleryCategory` - Model untuk kategori galeri
  - Location: `app/Models/GalleryCategory.php`
  - Fields: id, name, description, slug, meta_title, meta_description, meta_keywords, is_active, sort_order
  - Relations: `activeItems()` - Gallery items yang aktif

- `GalleryItem` - Model untuk item galeri
  - Location: `app/Models/GalleryItem.php`
  - Fields: id, gallery_category_id, title, description, image_path, alt_text, is_active, sort_order

## Data Flow

### Gallery Index Page
```
GalleryController@index
  ├─ companySettings (CompanySetting)
  ├─ categories (Active categories dengan 4 preview items, ordered by sort_order)
  │   └─ activeItems (First 4 active items per category)
  └─ featuredServices (First 4 active services for navigation)
```

### Gallery Category Page
```
GalleryController@category
  ├─ companySettings (CompanySetting)
  ├─ category (Single category by slug dengan semua active items)
  │   └─ activeItems (All active items, ordered by sort_order)
  └─ featuredServices (First 4 active services for navigation)
```

## SEO Implementation

### Gallery Index
- Title: `Galeri - {company_name}`
- Description: `Galeri foto dan dokumentasi kegiatan {company_name}`

### Gallery Category
- Title: `{meta_title}` atau `{name} - Galeri - {company_name}`
- Description: `{meta_description}` atau `{description}` atau `Galeri {name}`
- Keywords: `{meta_keywords}` (jika ada)

## Responsive Design
- Mobile (< 640px): 1 column untuk kategori, 2 columns untuk items
- Tablet (640px - 1024px): 2 columns untuk kategori, 3 columns untuk items
- Desktop (> 1024px): 3 columns untuk kategori, 4 columns untuk items

## Lightbox Features
1. ✅ Click pada foto untuk membuka lightbox
2. ✅ Keyboard navigation (Arrow Left/Right, Escape)
3. ✅ Previous/Next buttons
4. ✅ Close button
5. ✅ Image counter (1/10)
6. ✅ Display title dan description
7. ✅ Responsive image sizing
8. ✅ Smooth transitions

## Performance Optimizations
1. ✅ Lazy loading images
2. ✅ Loading placeholder untuk images
3. ✅ Optimized query (only load active items)
4. ✅ Preview items limited to 4 per category di index
5. ✅ Aspect ratio preservation

## Styling
- Menggunakan Shadcn UI components
- Dark mode ready (via custom variant)
- Smooth transitions dan hover effects
- Consistent spacing dan colors dari theme
- Gradient overlays untuk better text visibility

## Features
1. ✅ Responsive design
2. ✅ SEO optimized
3. ✅ Smooth animations
4. ✅ Image lazy loading
5. ✅ Lightbox dengan keyboard support
6. ✅ Konsisten dengan existing pages
7. ✅ Reusable components
8. ✅ Atomic design structure
9. ✅ Dark mode support
10. ✅ Accessibility (alt text, keyboard navigation)
