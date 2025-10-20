# About Page Documentation

## Overview
Halaman "Tentang Kami" yang responsif dan modern menggunakan Laravel Inertia React TypeScript dengan shadcn UI.

## File Structure

### Atomic Components (Atoms)
- `resources/js/components/atoms/video-player.tsx`
  - Komponen video player dengan preview thumbnail
  - Support YouTube embed dan URL eksternal
  - Auto-detect YouTube video ID

### Molecular Components (Molecules)
- `resources/js/components/molecules/mission-vision-card.tsx`
  - Card untuk menampilkan Visi dan Misi
  - Icon dynamic berdasarkan type (Eye untuk Vision, Target untuk Mission)
  - Gradient styling berbeda untuk setiap type

- `resources/js/components/molecules/profile-image-gallery.tsx`
  - Grid gallery untuk profile images
  - Modal preview untuk gambar full size
  - Support local storage dan external URLs

- `resources/js/components/molecules/stats-card.tsx`
  - Card untuk menampilkan statistik dengan animated counter
  - Icon dynamic dari Lucide React
  - Customizable suffix (default: "+")

### Organism Components (Sections)
- `resources/js/components/sections/about-hero-section.tsx`
  - Hero section dengan deskripsi perusahaan
  - Background decorative elements
  - Support HTML content dengan dangerouslySetInnerHTML

- `resources/js/components/sections/mission-vision-section.tsx`
  - Section untuk Visi & Misi
  - Grid layout responsive (1 kolom mobile, 2 kolom desktop)
  - Conditional rendering (hanya tampil jika ada data)

- `resources/js/components/sections/profile-section.tsx`
  - Section untuk video dan gallery images
  - Video player dengan thumbnail preview
  - Grid gallery responsive

- `resources/js/components/sections/stats-section.tsx`
  - Section untuk statistik perusahaan
  - Grid layout (2 kolom mobile, 4 kolom desktop)
  - Animated counters

### Page
- `resources/js/pages/about.tsx`
  - Main About page
  - SEO meta tags (title, description, keywords)
  - Certificates carousel sebelum footer
  - Full responsive layout

## Backend

### Controller
- `app/Http/Controllers/AboutController.php`
  - Fetch data dari AboutUs model
  - Fetch certificates (active & ordered)
  - Fetch company settings
  - Return Inertia response

### Route
- URL: `/about`
- Route name: `about`
- Method: GET
- Defined in: `routes/public.php`

### Database Schema
```php
Schema::create('about_us', function (Blueprint $table) {
    $table->id();
    $table->text('description')->nullable();
    $table->text('vision')->nullable();
    $table->text('mission')->nullable();
    $table->json('profile_images')->nullable();
    $table->string('profile_video_url')->nullable();
    $table->string('meta_title')->nullable();
    $table->text('meta_description')->nullable();
    $table->text('meta_keywords')->nullable();
    $table->string('slug')->default('about-us');
    $table->timestamps();
});
```

## TypeScript Types

### AboutUs Interface
```typescript
export interface AboutUs {
    id: number;
    description: string;
    vision: string;
    mission: string;
    profile_images: string[] | null;
    profile_video_url: string | null;
    meta_title: string | null;
    meta_description: string | null;
    meta_keywords: string | null;
    slug: string;
}
```

### AboutPageProps Interface
```typescript
interface AboutPageProps {
    companySettings: CompanySetting;
    about: AboutUs;
    certificates: Certificate[];
}
```

## Features

### ✅ Responsive Design
- Mobile-first approach
- Breakpoints: sm (640px), lg (1024px)
- Responsive grid layouts
- Responsive typography

### ✅ Atomic Design Pattern
- Atoms: video-player
- Molecules: mission-vision-card, profile-image-gallery, stats-card
- Organisms: about-hero-section, mission-vision-section, profile-section, stats-section
- Pages: about.tsx

### ✅ SEO Optimized
- Dynamic meta title, description, keywords
- Fallback to company settings
- Semantic HTML structure

### ✅ Interactive Features
- Video player with thumbnail preview
- Image gallery with modal preview
- Animated counters for statistics
- Hover effects dan transitions

### ✅ Reusable Components
- Semua components dapat digunakan di halaman lain
- Props-based configuration
- Type-safe dengan TypeScript

## Color Palette
- Primary: `#21b6fc`, `#1e94d2`, `#00a3cc`
- Dark: `#00334e`, `#126088`
- Light: `#F3FCFF`, `#E6F7FB`, `#C1E8F7`
- Gray: `gray-50`

## Usage Example

### 1. Mengisi Data di Database
```php
AboutUs::create([
    'description' => '<p>Deskripsi perusahaan...</p>',
    'vision' => '<p>Visi perusahaan...</p>',
    'mission' => '<ul><li>Misi 1</li><li>Misi 2</li></ul>',
    'profile_images' => ['path/to/image1.jpg', 'path/to/image2.jpg'],
    'profile_video_url' => 'https://www.youtube.com/watch?v=VIDEO_ID',
    'meta_title' => 'Tentang Kami - Company Name',
    'meta_description' => 'Deskripsi untuk SEO',
    'meta_keywords' => 'keyword1, keyword2, keyword3',
]);
```

### 2. Menggunakan Component di Halaman Lain
```typescript
import { MissionVisionCard } from "@/components/molecules/mission-vision-card";

<MissionVisionCard
    title="Visi"
    content="<p>Visi kami...</p>"
    type="vision"
/>
```

## Navigation
- Header: Logo + Menu (Home, Tentang, Layanan, Galeri, Klien, Kontak)
- Footer: Quick links, contact info, social media

## Dependencies
- React 18+
- Inertia.js
- TypeScript
- shadcn/ui (Card, Dialog)
- Lucide React (icons)
- TailwindCSS

## Styling Convention
- Utility classes dari TailwindCSS
- Responsive prefixes: `sm:`, `lg:`
- Spacing: 4, 6, 8, 12, 16, 20, 24
- Rounded corners: `rounded-lg`
- Shadows: `shadow-xl`, `hover:shadow-2xl`
- Transitions: `transition-all`, `duration-300`

## Best Practices
1. ✅ Gunakan semantic HTML
2. ✅ Conditional rendering untuk optional sections
3. ✅ Image optimization dengan lazy loading
4. ✅ Accessible components (alt text, aria-labels)
5. ✅ Type-safe props dengan TypeScript
6. ✅ Reusable & composable components
7. ✅ Consistent naming convention (kebab-case untuk files, PascalCase untuk components)
