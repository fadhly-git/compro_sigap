// resources/js/components/organisms/settings-form.tsx

import { useState } from 'react'
import { router } from '@inertiajs/react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { FormField } from '@/components/molecules/form-field'
import { ImageUploadField } from '@/components/molecules/image-upload-field'
import { SocialMediaFields } from '@/components/molecules/social-media-fields'
import { WhatsAppFields } from '@/components/molecules/whatsapp-fields'
import { SEOFields } from '@/components/molecules/seo-fields'
import { SectionTitle } from '@/components/atoms/section-title'
import { Loader2, Save } from 'lucide-react'
import { toast } from 'sonner'
import settingsRoute from '@/routes/admin/settings'

interface SocialMediaData {
    facebook: string
    instagram: string
    twitter: string
    linkedin: string
    youtube: string
}

interface CompanySettings {
    id?: number
    company_name: string
    company_address: string
    company_phone: string
    company_email: string
    company_website: string
    company_description: string
    logo_path: string | null
    favicon_path: string | null
    social_media: SocialMediaData
    google_maps_embed: string
    whatsapp_number: string
    whatsapp_default_message: string
    whatsapp_enabled: boolean
    meta_title: string
    meta_description: string
    meta_keywords: string
}

interface SettingsFormProps {
    settings: CompanySettings
}

export function SettingsForm({ settings }: SettingsFormProps) {
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [formData, setFormData] = useState<CompanySettings>({
        company_name: settings.company_name || '',
        company_address: settings.company_address || '',
        company_phone: settings.company_phone || '',
        company_email: settings.company_email || '',
        company_website: settings.company_website || '',
        company_description: settings.company_description || '',
        logo_path: settings.logo_path || null,
        favicon_path: settings.favicon_path || null,
        social_media: settings.social_media || {
            facebook: '',
            instagram: '',
            twitter: '',
            linkedin: '',
            youtube: ''
        },
        google_maps_embed: settings.google_maps_embed || '',
        whatsapp_number: settings.whatsapp_number || '',
        whatsapp_default_message: settings.whatsapp_default_message || '',
        whatsapp_enabled: settings.whatsapp_enabled || false,
        meta_title: settings.meta_title || '',
        meta_description: settings.meta_description || '',
        meta_keywords: settings.meta_keywords || ''
    })

    const handleInputChange = <K extends keyof CompanySettings>(
        field: K,
        value: CompanySettings[K]
    ) => {
        setFormData(prev => ({
            ...prev,
            [field]: value
        }))
    }

    const handleSocialMediaChange = (
        platform: keyof SocialMediaData,
        value: string
    ) => {
        setFormData(prev => ({
            ...prev,
            social_media: {
                ...prev.social_media,
                [platform]: value
            }
        }))
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsSubmitting(true)

        try {
            // Menggunakan object biasa yang bisa di-serialize oleh Inertia
            router.post(settingsRoute.update.url(), {
                company_name: formData.company_name,
                company_address: formData.company_address,
                company_phone: formData.company_phone,
                company_email: formData.company_email,
                company_website: formData.company_website,
                company_description: formData.company_description,
                logo_path: formData.logo_path,
                favicon_path: formData.favicon_path,
                social_media: JSON.stringify(formData.social_media), // Convert to JSON string
                google_maps_embed: formData.google_maps_embed,
                whatsapp_number: formData.whatsapp_number,
                whatsapp_default_message: formData.whatsapp_default_message,
                whatsapp_enabled: formData.whatsapp_enabled ? 1 : 0, // Convert boolean to number
                meta_title: formData.meta_title,
                meta_description: formData.meta_description,
                meta_keywords: formData.meta_keywords,
            }, {
                onSuccess: () => {
                    toast.success('Pengaturan berhasil disimpan')
                },
                onError: (errors) => {
                    console.error('Validation errors:', errors)
                    toast.error('Terjadi kesalahan saat menyimpan')
                },
                onFinish: () => {
                    setIsSubmitting(false)
                }
            })
        } catch (error) {
            console.error('Submit error:', error)
            toast.error('Terjadi kesalahan saat menyimpan')
            setIsSubmitting(false)
        }
    }

    const handleDeleteMedia = async (field: 'logo_path' | 'favicon_path') => {
        try {
            const response = await fetch(settingsRoute.deleteMedia.url(), {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || '',
                },
                body: JSON.stringify({
                    path: formData[field],
                    field: field,
                }),
            })

            const result = await response.json()

            if (result.success) {
                setFormData(prev => ({ ...prev, [field]: null }))
                toast.success('Media berhasil dihapus')
            }
        } catch (error) {
            console.error('Delete error:', error)
            toast.error('Gagal menghapus media')
        }
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            {/* Company Information */}
            <Card>
                <CardHeader>
                    <SectionTitle
                        title="Informasi Perusahaan"
                        description="Data dasar perusahaan yang akan ditampilkan di website"
                    />
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <FormField
                            label="Nama Perusahaan"
                            name="company_name"
                            value={formData.company_name}
                            onChange={(value) => handleInputChange('company_name', value)}
                            required
                        />
                        <FormField
                            label="Email Perusahaan"
                            name="company_email"
                            inputType='email'
                            value={formData.company_email}
                            onChange={(value) => handleInputChange('company_email', value)}
                            required
                        />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <FormField
                            label="Telepon"
                            name="company_phone"
                            value={formData.company_phone}
                            onChange={(value) => handleInputChange('company_phone', value)}
                        />
                        <FormField
                            label="Website"
                            name="company_website"
                            value={formData.company_website}
                            inputType='url'
                            onChange={(value) => handleInputChange('company_website', value)}
                            placeholder="https://example.com"
                        />
                    </div>

                    <FormField
                        label="Alamat"
                        name="company_address"
                        value={formData.company_address}
                        onChange={(value) => handleInputChange('company_address', value)}
                        type="textarea"
                    />

                    <FormField
                        label="Deskripsi Perusahaan"
                        name="company_description"
                        value={formData.company_description}
                        onChange={(value) => handleInputChange('company_description', value)}
                        type="textarea"
                    />
                </CardContent>
            </Card>

            {/* Logo & Favicon */}
            <Card>
                <CardHeader>
                    <SectionTitle
                        title="Logo & Favicon"
                        description="Upload logo dan favicon untuk website"
                    />
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <ImageUploadField
                            label="Logo Perusahaan"
                            value={formData.logo_path}
                            onChange={(path) => handleInputChange('logo_path', path)}
                            onDelete={() => handleDeleteMedia('logo_path')}
                            context="logo"
                        />
                        <ImageUploadField
                            label="Favicon"
                            value={formData.favicon_path}
                            onChange={(path) => handleInputChange('favicon_path', path)}
                            onDelete={() => handleDeleteMedia('favicon_path')}
                            context="favicon"
                        />
                    </div>
                </CardContent>
            </Card>

            {/* Social Media */}
            <SocialMediaFields
                socialMedia={formData.social_media}
                onChange={handleSocialMediaChange}
            />

            {/* Google Maps */}
            <Card>
                <CardHeader>
                    <SectionTitle
                        title="Google Maps"
                        description="Embed kode Google Maps untuk menampilkan lokasi"
                    />
                </CardHeader>
                <CardContent>
                    <FormField
                        label="Google Maps Embed Code"
                        name="google_maps_embed"
                        value={formData.google_maps_embed}
                        onChange={(value) => handleInputChange('google_maps_embed', value)}
                        type="textarea"
                        placeholder='<iframe src="https://www.google.com/maps/embed?pb=..."></iframe>'
                    />
                </CardContent>
            </Card>

            {/* WhatsApp */}
            <WhatsAppFields
                whatsappNumber={formData.whatsapp_number}
                whatsappDefaultMessage={formData.whatsapp_default_message}
                whatsappEnabled={formData.whatsapp_enabled}
                onNumberChange={(value) => handleInputChange('whatsapp_number', value)}
                onMessageChange={(value) => handleInputChange('whatsapp_default_message', value)}
                onEnabledChange={(value) => handleInputChange('whatsapp_enabled', value)}
            />

            {/* SEO */}
            <SEOFields
                metaTitle={formData.meta_title}
                metaDescription={formData.meta_description}
                metaKeywords={formData.meta_keywords}
                onMetaTitleChange={(value) => handleInputChange('meta_title', value)}
                onMetaDescriptionChange={(value) => handleInputChange('meta_description', value)}
                onMetaKeywordsChange={(value) => handleInputChange('meta_keywords', value)}
                onSlugChange={() => {}} // Not used for settings
            />

            {/* Submit Button */}
            <div className="flex justify-end">
                <Button
                    type="submit"
                    disabled={isSubmitting}
                    size="lg"
                >
                    {isSubmitting ? (
                        <>
                            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                            Menyimpan...
                        </>
                    ) : (
                        <>
                            <Save className="w-4 h-4 mr-2" />
                            Simpan Pengaturan
                        </>
                    )}
                </Button>
            </div>
        </form>
    )
}
