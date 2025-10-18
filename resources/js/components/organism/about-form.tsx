// resources/js/components/organism/about-form.tsx

import { useState, useCallback } from 'react'
import { useForm } from '@inertiajs/react'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { RichTextEditor } from '@/components/editor/rich-text-editor'
import { FileUpload } from '@/components/atoms/file-upload'
import { ContentTabs } from './content-tabs'
import { SEOFields } from '@/components/molecules/seo-fields'
import { toast } from 'sonner'
import { Save, Loader2 } from 'lucide-react'
import AboutUsController from '@/actions/App/Http/Controllers/Admin/ManagementContent/AboutController'
import MediaUploadController from '@/actions/App/Http/Controllers/Admin/MediaController'

interface AboutUsData {
    id?: number
    description: string
    vision: string
    mission: string
    profile_image?: string
    profile_video?: string
    meta_title: string
    meta_description: string
    meta_keywords: string
    slug: string
}

interface AboutFormProps {
    aboutUs: AboutUsData
}

export function AboutForm({ aboutUs }: AboutFormProps) {
    const { data, setData, post, processing, errors } = useForm({
        description: aboutUs.description || '',
        vision: aboutUs.vision || '',
        mission: aboutUs.mission || '',
        profile_image: null as File | null,
        profile_video: null as File | null,
        meta_title: aboutUs.meta_title || '',
        meta_description: aboutUs.meta_description || '',
        meta_keywords: aboutUs.meta_keywords || '',
        slug: aboutUs.slug || 'tentang-kami',
    })

    const [previews, setPreviews] = useState({
        image: aboutUs.profile_image || null,
        video: aboutUs.profile_video || null,
    })

    const [newFiles, setNewFiles] = useState({
        image: false,
        video: false,
    })

    const handleDeleteMedia = async (type: 'image' | 'video') => {
        try {
            const response = await fetch(MediaUploadController.deleteMethod.url(), {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || '',
                },
                body: JSON.stringify({ type }),
            })

            if (response.ok) {
                toast.success('Media berhasil dihapus')
                // Reset preview dan form data
                setPreviews(prev => ({ ...prev, [type]: null }))
                setNewFiles(prev => ({ ...prev, [type]: false }))
                setData(type === 'image' ? 'profile_image' : 'profile_video', null)
            } else {
                toast.error('Gagal menghapus media')
            }
        } catch {
            toast.error('Gagal menghapus media')
        }
    }

    // Handler untuk delete gambar dari rich text editor
    const handleEditorImageDelete = useCallback((url: string) => {
        // Handle editor image deletion
        fetch('/admin/media/delete', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || '',
            },
            body: JSON.stringify({ url }),
        }).catch(console.error)
    }, [])

    const handleProfileImageChange = (file: File | null) => {
        setData('profile_image', file)

        if (file) {
            // Preview file baru
            const reader = new FileReader()
            reader.onload = (e) => {
                setPreviews(prev => ({ ...prev, image: e.target?.result as string }))
            }
            reader.readAsDataURL(file)
            setNewFiles(prev => ({ ...prev, image: true }))
        } else {
            // Reset ke gambar asli atau null
            setPreviews(prev => ({ ...prev, image: aboutUs.profile_image || null }))
            setNewFiles(prev => ({ ...prev, image: false }))
        }
    }

    const handleProfileImageDelete = () => {
        if (newFiles.image) {
            // Jika file baru, cukup reset
            handleProfileImageChange(null)
        } else {
            // Jika file existing, panggil API delete
            handleDeleteMedia('image')
        }
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()

        post(AboutUsController.update.url(), {
            onSuccess: () => {
                toast.success('Data berhasil disimpan')
                // Reset newFiles state setelah berhasil upload
                setNewFiles({ image: false, video: false })
            },
            onError: () => {
                toast.error('Terjadi kesalahan saat menyimpan data')
            },
            forceFormData: true, // Pastikan menggunakan FormData untuk file upload
        })
    }

    const handleSEOSubmit = (e: React.FormEvent) => {
        e.preventDefault()

        // Buat form data baru tanpa file untuk SEO update
        const formData = new FormData()
        formData.append('description', data.description)
        formData.append('vision', data.vision)
        formData.append('mission', data.mission)
        formData.append('meta_title', data.meta_title)
        formData.append('meta_description', data.meta_description)
        formData.append('meta_keywords', data.meta_keywords)
        formData.append('slug', data.slug)

        post(AboutUsController.update.url(), {
            onSuccess: () => {
                toast.success('Pengaturan SEO berhasil disimpan')
            },
            onError: () => {
                toast.error('Terjadi kesalahan saat menyimpan SEO')
            },
        })
    }

    const contentForm = (
        <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
                <Label className="font-semibold">Deskripsi Perusahaan</Label>
                <RichTextEditor
                    content={data.description}
                    onChange={(content) => setData('description', content)}
                    onImageDelete={handleEditorImageDelete}
                />
                {errors.description && (
                    <p className="text-red-500 dark:text-red-400 text-sm">{errors.description}</p>
                )}
            </div>

            <div className="space-y-2">
                <Label className="font-semibold">Visi</Label>
                <RichTextEditor
                    content={data.vision}
                    onChange={(content) => setData('vision', content)}
                    onImageDelete={handleEditorImageDelete}
                />
                {errors.vision && (
                    <p className="text-red-500 dark:text-red-400 text-sm">{errors.vision}</p>
                )}
            </div>

            <div className="space-y-2">
                <Label className="font-semibold">Misi</Label>
                <RichTextEditor
                    content={data.mission}
                    onChange={(content) => setData('mission', content)}
                    onImageDelete={handleEditorImageDelete}
                />
                {errors.mission && (
                    <p className="text-red-500 dark:text-red-400 text-sm">{errors.mission}</p>
                )}
            </div>

            <div className="grid grid-cols-1">
                <FileUpload
                    label="Foto Profil Perusahaan"
                    accept="image/*"
                    value={previews.image}
                    onChange={handleProfileImageChange}
                    onDelete={handleProfileImageDelete}
                    type="image"
                    error={errors.profile_image}
                />
            </div>

            <div className="flex justify-end">
                <Button type="submit" disabled={processing}>
                    {processing ? (
                        <>
                            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                            Menyimpan...
                        </>
                    ) : (
                        <>
                            <Save className="w-4 h-4 mr-2" />
                            Simpan Perubahan
                        </>
                    )}
                </Button>
            </div>
        </form>
    )

    const seoForm = (
        <form onSubmit={handleSEOSubmit} className="space-y-4">
            <SEOFields
                metaTitle={data.meta_title}
                metaDescription={data.meta_description}
                metaKeywords={data.meta_keywords}
                slug={data.slug}
                onMetaTitleChange={(value) => setData('meta_title', value)}
                onMetaDescriptionChange={(value) => setData('meta_description', value)}
                onMetaKeywordsChange={(value) => setData('meta_keywords', value)}
                onSlugChange={(value) => setData('slug', value)}
            />

            {/* Error messages untuk SEO fields */}
            {errors.meta_title && (
                <p className="text-red-500 text-sm">{errors.meta_title}</p>
            )}
            {errors.meta_description && (
                <p className="text-red-500 text-sm">{errors.meta_description}</p>
            )}
            {errors.meta_keywords && (
                <p className="text-red-500 text-sm">{errors.meta_keywords}</p>
            )}
            {errors.slug && (
                <p className="text-red-500 text-sm">{errors.slug}</p>
            )}

            <div className="flex justify-end">
                <Button type="submit" disabled={processing}>
                    {processing ? (
                        <>
                            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                            Menyimpan...
                        </>
                    ) : (
                        <>
                            <Save className="w-4 h-4 mr-2" />
                            Simpan SEO
                        </>
                    )}
                </Button>
            </div>
        </form>
    )

    return (
        <ContentTabs seoContent={seoForm}>
            {contentForm}
        </ContentTabs>
    )
}
