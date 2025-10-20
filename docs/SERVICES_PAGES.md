# Services Pages Documentation

## Overview
Halaman Services terdiri dari 2 halaman utama:
1. **Services Index** (`/services`) - Menampilkan semua layanan aktif
2. **Service Detail** (`/services/{slug}`) - Menampilkan detail layanan individual

## Struktur Komponen (Atomic Design)

### Atoms
- `Button` - Tombol dari Shadcn UI
- `Card`, `CardContent`, `CardDescription`, `CardHeader`, `CardTitle` - Card components dari Shadcn UI

### Molecules
- `ServicePublicCard` - Card untuk menampilkan preview layanan
  - Location: `resources/js/components/molecules/service-public-card.tsx`
  - Props: `service: Service`
  - Features:
    - Gambar layanan dengan hover effect
    - Title dan description
    - Link ke halaman detail

### Organisms
- `ServicesHeroSection` - Hero section untuk halaman services
  - Location: `resources/js/components/sections/services-hero-section.tsx`
  - Props: `title?: string`, `description?: string`
  - Features: Title, description, decorative elements

- `ServicesListSection` - Grid layout untuk menampilkan semua services
  - Location: `resources/js/components/sections/services-list-section.tsx`
  - Props: `services: Service[]`
  - Features: Responsive grid (1 col mobile, 2 cols tablet, 3 cols desktop)

- `ServiceDetailSection` - Section untuk menampilkan detail layanan
  - Location: `resources/js/components/sections/service-detail-section.tsx`
  - Props: `service: Service`
  - Features:
    - Back button ke services list
    - Service image
    - Title, description, dan content
    - HTML content dengan prose styling

### Pages
- `services/index.tsx` - Halaman list services
- `services/show.tsx` - Halaman detail service

### Templates
- `MainLayout` - Layout utama yang digunakan oleh semua halaman public

## Backend Structure

### Controller
- `ServiceController` - Controller untuk handle routes
  - Location: `app/Http/Controllers/ServiceController.php`
  - Methods:
    - `index()` - Menampilkan list services
    - `show($slug)` - Menampilkan detail service

### Routes
Defined in `routes/public.php`:
```php
Route::get('/services', [ServiceController::class, 'index'])->name('services.index');
Route::get('/services/{slug}', [ServiceController::class, 'show'])->name('services.show');
```

### Model
- `Service` - Model untuk services
  - Location: `app/Models/Service.php`
  - Fields: id, title, slug, description, content, image, isActive, sortOrder, metaTitle, metaDescription, metaKeywords

## Data Flow

### Services Index Page
```
ServiceController@index
  ├─ companySettings (CompanySetting)
  ├─ services (All active services, ordered)
  └─ featuredServices (First 4 active services for navigation)
```

### Service Detail Page
```
ServiceController@show
  ├─ companySettings (CompanySetting)
  ├─ service (Single service by slug)
  └─ featuredServices (First 4 active services for navigation)
```

## SEO Implementation

### Services Index
- Title: `Layanan - {company_name}`
- Description: `Berbagai layanan profesional dari {company_name}`

### Service Detail
- Title: `{metaTitle}` atau `{title} - {company_name}`
- Description: `{metaDescription}` atau `{description}`
- Keywords: `{metaKeywords}` (jika ada)

## Responsive Design
- Mobile (< 640px): 1 column grid
- Tablet (640px - 1024px): 2 columns grid
- Desktop (> 1024px): 3 columns grid

## Styling
- Menggunakan Shadcn UI components
- Dark mode ready (via custom variant)
- Smooth transitions dan hover effects
- Typography plugin untuk prose content
- Consistent spacing dan colors dari theme

## Features
1. ✅ Responsive design
2. ✅ SEO optimized
3. ✅ Smooth animations
4. ✅ Image lazy loading
5. ✅ Consistent with existing pages (home, about)
6. ✅ Reusable components
7. ✅ Atomic design structure
8. ✅ Dark mode support
