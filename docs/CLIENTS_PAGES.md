# Clients Pages Documentation

## Overview
Halaman Clients terdiri dari 2 halaman utama:
1. **Clients Index** (`/clients`) - Menampilkan semua klien dengan filter sektor
2. **Client Detail** (`/clients/{slug}`) - Menampilkan detail klien individual

## Struktur Komponen (Atomic Design)

### Atoms
- `Button` - Tombol dari Shadcn UI
- `Badge` - Badge untuk menampilkan sektor
- `Card`, `CardContent`, `CardDescription`, `CardHeader`, `CardTitle` - Card components

### Molecules
- `ClientPublicCard` - Card untuk menampilkan preview klien
  - Location: `resources/js/components/molecules/client-public-card.tsx`
  - Props: `client: Client`
  - Features:
    - Logo klien atau placeholder icon
    - Badge sektor industri
    - Nama dan deskripsi singkat
    - Link ke halaman detail

### Organisms
- `ClientsHeroSection` - Hero section untuk halaman clients
  - Location: `resources/js/components/sections/clients-hero-section.tsx`
  - Props: `title?: string`, `description?: string`
  - Features: Title, description, decorative elements

- `ClientsListSection` - Grid dengan filter sektor
  - Location: `resources/js/components/sections/clients-list-section.tsx`
  - Props: `clients: Client[]`
  - Features:
    - Filter tombol per sektor dengan counter
    - Responsive grid (1-4 columns)
    - Empty state untuk hasil filter kosong
    - Client-side filtering

- `ClientDetailSection` - Detail klien lengkap
  - Location: `resources/js/components/sections/client-detail-section.tsx`
  - Props: `client: Client`
  - Features:
    - Back button ke clients list
    - Logo klien featured
    - Badge sektor
    - Link website (external)
    - Deskripsi lengkap
    - Galeri foto klien
    - Empty state

### Pages
- `clients/index.tsx` - List semua klien dengan filter
- `clients/show.tsx` - Detail klien individual

### Templates
- `MainLayout` - Layout utama yang digunakan oleh semua halaman public

## Backend Structure

### Controller
- `ClientController` - Controller untuk handle routes
  - Location: `app/Http/Controllers/ClientController.php`
  - Methods:
    - `index()` - Menampilkan list semua klien aktif
    - `show($slug)` - Menampilkan detail klien by slug

### Routes
Defined in `routes/public.php`:
```php
Route::get('/clients', [ClientController::class, 'index'])->name('clients.index');
Route::get('/clients/{slug}', [ClientController::class, 'show'])->name('clients.show');
```

### Model
- `Client` - Model untuk clients/klien
  - Location: `app/Models/Client.php`
  - Fields: id, name, slug, sector, description, logo_path, images, website_url, is_active, sort_order, meta_title, meta_description, meta_keywords
  - Accessors:
    - `logo_url` - Full URL untuk logo
    - `image_urls` - Array full URLs untuk images

## Data Flow

### Clients Index Page
```
ClientController@index
  ├─ companySettings (CompanySetting)
  ├─ clients (All active clients, ordered by sort_order and name)
  └─ featuredServices (First 4 active services for navigation)
```

### Client Detail Page
```
ClientController@show
  ├─ companySettings (CompanySetting)
  ├─ client (Single client by slug)
  └─ featuredServices (First 4 active services for navigation)
```

## SEO Implementation

### Clients Index
- Title: `Klien Kami - {company_name}`
- Description: `Klien dan mitra {company_name} dari berbagai sektor industri`

### Client Detail
- Title: `{meta_title}` atau `{name} - Klien - {company_name}`
- Description: `{meta_description}` atau `{description}` atau `Klien {name}`
- Keywords: `{meta_keywords}` (jika ada)

## Responsive Design
- Mobile (< 640px): 1 column
- Tablet (640px - 1024px): 2 columns
- Desktop (1024px - 1280px): 3 columns
- Large Desktop (> 1280px): 4 columns

## Filter Features
1. ✅ Client-side filtering (no page reload)
2. ✅ Filter by sector dengan tombol
3. ✅ Counter jumlah klien per sektor
4. ✅ Tombol "Semua" untuk reset filter
5. ✅ Active state indicator
6. ✅ Empty state untuk hasil filter kosong

## Detail Page Features
1. ✅ Logo klien dalam card featured
2. ✅ Badge sektor industri
3. ✅ External link ke website klien
4. ✅ Deskripsi lengkap klien
5. ✅ Galeri foto (multiple images)
6. ✅ Empty state ketika tidak ada data
7. ✅ Back button ke list

## Performance Optimizations
1. ✅ Client-side filtering (tidak perlu reload)
2. ✅ useMemo untuk computed values
3. ✅ Optimized re-renders
4. ✅ Lazy loading images

## Styling
- Menggunakan Shadcn UI components
- Dark mode ready (via custom variant)
- Smooth transitions dan hover effects
- Logo dengan object-contain untuk preserve aspect ratio
- Consistent spacing dan colors dari theme

## Features
1. ✅ Responsive design
2. ✅ SEO optimized
3. ✅ Smooth animations
4. ✅ Interactive sector filter
5. ✅ External website links
6. ✅ Image gallery
7. ✅ Konsisten dengan existing pages
8. ✅ Reusable components
9. ✅ Atomic design structure
10. ✅ Dark mode support
11. ✅ Empty states
12. ✅ Accessibility (external link indicators)
