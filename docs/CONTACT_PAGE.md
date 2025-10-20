# Contact Page Documentation

## Overview
Halaman Contact adalah halaman kompleks yang menangani:
1. Form kontak dengan validasi
2. Email notification ke user (Thank You email)
3. Email notification ke admin (New Message notification)
4. Informasi kontak perusahaan
5. Google Maps integration
6. WhatsApp floating button

## Struktur Komponen (Atomic Design)

### Atoms
- `Button` - Tombol dari Shadcn UI
- `Input` - Input field dengan styling
- `Label` - Label untuk form fields
- `Textarea` - Multi-line text input
- `Alert`, `AlertDescription`, `AlertTitle` - Success/Error alerts
- `Card`, `CardContent`, `CardDescription`, `CardHeader`, `CardTitle` - Card components

### Molecules
- `WhatsAppButton` - Floating button untuk chat WhatsApp
  - Location: `resources/js/components/molecules/whatsapp-button.tsx`
  - Props: `settings: CompanySetting`
  - Features:
    - Floating button (responsive: icon only on mobile, with text on desktop)
    - Opens WhatsApp chat dengan pre-filled message
    - Only shows if whatsapp_enabled = true
    - Auto-format phone number
    - Scale animation on hover

### Organisms
- `ContactHeroSection` - Hero section untuk halaman contact
  - Location: `resources/js/components/sections/contact-hero-section.tsx`
  - Props: `title?: string`, `description?: string`
  - Features: Title, description, decorative elements

- `ContactInfoSection` - Informasi kontak perusahaan
  - Location: `resources/js/components/sections/contact-info-section.tsx`
  - Props: `settings: CompanySetting`
  - Features:
    - 3 cards: Address, Phone, Email
    - Clickable phone (tel:) dan email (mailto:)
    - Google Maps embed dengan aspect ratio
    - Responsive grid

- `ContactForm` - Form kontak dengan validasi
  - Location: `resources/js/components/organisms/contact-form.tsx`
  - Features:
    - 5 fields: name, email, phone, subject, message
    - Client-side validation (required fields)
    - Server-side error handling
    - Success alert (flash message)
    - Loading state dengan spinner
    - Form reset setelah sukses
    - Disabled state saat processing

### Pages
- `contact/index.tsx` - Halaman contact dengan form dan info

### Templates
- `MainLayout` - Layout utama yang digunakan oleh semua halaman public

## Backend Structure

### Controller
- `ContactController` - Controller untuk handle routes
  - Location: `app/Http/Controllers/ContactController.php`
  - Methods:
    - `index()` - Menampilkan halaman contact
    - `store()` - Handle form submission, save to database, send emails

### Routes
Defined in `routes/public.php`:
```php
Route::get('/contact', [ContactController::class, 'index'])->name('contact.index');
Route::post('/contact', [ContactController::class, 'store'])->name('contact.store');
```

### Models
- `Message` - Model untuk menyimpan pesan dari contact form
  - Location: `app/Models/Message.php`
  - Fields: id, name, email, phone, subject, message, isRead, readAt, adminReply, repliedAt, repliedByUserId

### Mailers
- `ThankYouMail` - Email ke user setelah submit form
  - Location: `app/Mail/Contact/ThankYouMail.php`
  - View: `resources/views/emails/user/thank-you.blade.php`
  - Subject: "Terima kasih atas pesan Anda - SIGAP: {subject}"

- `NewMessageNotification` - Email ke admin
  - Location: `app/Mail/NewMessageNotification.php`
  - View: `resources/views/emails/admin/new-message.blade.php`
  - Subject: "Pesan Baru dari Website - {subject}"

## Data Flow

### Contact Page Load
```
ContactController@index
  ├─ companySettings (CompanySetting dengan semua data kontak)
  └─ featuredServices (First 4 active services for navigation)
```

### Form Submission Flow
```
1. User mengisi form → Submit
2. Client-side validation
3. POST ke /contact
4. Server-side validation
5. Save to messages table
6. Send Thank You email ke user
7. Send notification email ke admin
8. Return dengan flash success message
9. Form reset
10. Success alert muncul
```

## Email Notifications

### Thank You Email (to User)
- **To:** User's email
- **Subject:** Terima kasih atas pesan Anda - SIGAP: {subject}
- **Reply-To:** Company email
- **Contains:** 
  - Confirmation message
  - Copy of their message
  - Company contact info

### New Message Notification (to Admin)
- **To:** Admin email (from config)
- **Subject:** Pesan Baru dari Website - {subject}
- **Contains:**
  - User details (name, email, phone)
  - Subject and message
  - Link to admin panel to view/reply
  - Timestamp

## Form Validation

### Required Fields
- Name (max: 255)
- Email (valid email, max: 255)
- Subject (max: 255)
- Message (text)

### Optional Fields
- Phone (max: 20)

### Error Handling
- Client-side: Red border on invalid fields
- Server-side: Error messages di bawah field
- Toast/Alert untuk general errors

## WhatsApp Integration

### Features
1. ✅ Floating button (bottom-right)
2. ✅ Show only if enabled di settings
3. ✅ Pre-filled message dari settings
4. ✅ Auto-format phone number (remove non-digits)
5. ✅ Opens in new tab
6. ✅ Responsive design (icon only on mobile)
7. ✅ Hover scale animation

### URL Format
```
https://wa.me/{phone_number}?text={encoded_message}
```

## Google Maps Integration

### Features
1. ✅ Embed dari company settings
2. ✅ Aspect ratio video (16:9)
3. ✅ Rounded corners
4. ✅ Full width responsive
5. ✅ dangerouslySetInnerHTML untuk iframe

## SEO Implementation

### Contact Page
- Title: `Hubungi Kami - {company_name}`
- Description: `Hubungi {company_name}. {company_address}`

## Responsive Design

### Form & Info Layout
- Mobile (< 1024px): Stack vertically (form di atas, info di bawah)
- Desktop (>= 1024px): 2 columns side by side

### WhatsApp Button
- Mobile: Icon only (48x48px circle)
- Desktop: Icon + text (rectangular)
- Fixed position: bottom-right
- z-index: 50 (above most elements)

### Contact Info Cards
- Mobile: Stack vertically
- Tablet+: 3 columns grid

## Features

### Form Features
1. ✅ Real-time validation
2. ✅ Loading state dengan spinner
3. ✅ Success flash message dengan icon
4. ✅ Auto-reset setelah sukses
5. ✅ Disabled state saat processing
6. ✅ Error messages per field
7. ✅ Required field indicators (*)

### Communication Features
1. ✅ Email notification ke user (Thank You)
2. ✅ Email notification ke admin
3. ✅ WhatsApp quick contact
4. ✅ Click-to-call phone numbers
5. ✅ Click-to-email addresses
6. ✅ Google Maps navigation

### UX Features
1. ✅ Smooth animations
2. ✅ Clear error messages
3. ✅ Success feedback
4. ✅ Accessible form labels
5. ✅ Loading indicators
6. ✅ Responsive design
7. ✅ Icon indicators

## Performance Optimizations
1. ✅ Form reset dengan useEffect optimization
2. ✅ Conditional WhatsApp button rendering
3. ✅ preserveScroll pada form submission
4. ✅ Optimized re-renders

## Styling
- Menggunakan Shadcn UI components
- Dark mode ready (via custom variant)
- Smooth transitions
- Alert dengan custom green styling untuk success
- Consistent spacing dan colors dari theme
- Icon indicators untuk better UX

## Security
1. ✅ CSRF protection (Laravel default)
2. ✅ Server-side validation
3. ✅ Email sanitization
4. ✅ XSS protection
5. ✅ Rate limiting (dapat ditambahkan di middleware)

## Testing Checklist
- [ ] Form submission dengan data valid
- [ ] Form validation (empty fields)
- [ ] Email format validation
- [ ] Success message muncul
- [ ] Form reset setelah sukses
- [ ] Email ke user terkirim
- [ ] Email ke admin terkirim
- [ ] WhatsApp button berfungsi
- [ ] Phone number clickable
- [ ] Email address clickable
- [ ] Google Maps tampil
- [ ] Responsive di mobile
- [ ] Responsive di tablet
- [ ] Responsive di desktop

## Configuration

### Required Settings in CompanySetting
- `company_address` - For contact info
- `company_phone` - For contact info and tel: link
- `company_email` - For contact info and mailto: link
- `google_maps_embed` - For maps (optional)
- `whatsapp_enabled` - Enable/disable WhatsApp button
- `whatsapp_number` - WhatsApp number (format: country code + number)
- `whatsapp_default_message` - Default message pre-filled

### Required Email Configuration
- `config/mail.php` - Mail server settings
- `config/app.php` - Admin email for notifications
- Email templates in `resources/views/emails/`
