import { useState, useRef } from 'react'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Upload, X, Eye, FileImage, FileVideo, FolderOpen } from 'lucide-react'
import { MediaPreviewModal } from '@/components/molecules/media-preview-modal'
import { MediaPickerModal } from '@/components/molecules/media-picker-modal'
import { toast } from 'sonner'

interface FileUploadProps {
    label: string
    accept: string
    value: string | null
    onChange: (file: File | string | null) => void // Bisa file atau string path
    type: 'image' | 'video'
    error?: string
    className?: string
}

export function FileUpload({
    label,
    accept,
    value,
    onChange,
    type,
    error,
    className = ''
}: FileUploadProps) {
    const [previewModal, setPreviewModal] = useState(false)
    const [showMediaPicker, setShowMediaPicker] = useState(false)
    const fileInputRef = useRef<HTMLInputElement>(null)

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0] || null
        onChange(file)
    }

    const handleClick = () => {
        // Buka media picker modal, bukan file input
        setShowMediaPicker(true)
    }

    const handleDelete = () => {
        // Hanya clear value/preview, tidak ada request delete ke server
        onChange(null)
        if (fileInputRef.current) {
            fileInputRef.current.value = ''
        }
    }

    const openPreview = () => {
        if (value) {
            setPreviewModal(true)
        }
    }

    const handleMediaSelect = (path: string) => {
        // Kirim path string langsung, bukan File object
        onChange(path)
        toast.success(`${type === 'image' ? 'Gambar' : 'Video'} berhasil dipilih dari library`)
    }

    return (
        <div className={`space-y-2 ${className}`}>
            <Label className="text-gray-700 dark:text-gray-300">{label}</Label>

            <div className="space-y-3">
                <input
                    ref={fileInputRef}
                    type="file"
                    accept={accept}
                    onChange={handleFileChange}
                    className="hidden"
                />

                {value ? (
                    <div className="relative group border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-4 bg-gray-50 dark:bg-gray-800/50">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                {type === 'image' ? (
                                    <FileImage className="w-8 h-8 text-blue-500 dark:text-blue-400" />
                                ) : (
                                    <FileVideo className="w-8 h-8 text-purple-500 dark:text-purple-400" />
                                )}
                                <div>
                                    <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
                                        {type === 'image' ? 'Gambar' : 'Video'} berhasil dipilih
                                    </p>
                                    <p className="text-xs text-gray-500 dark:text-gray-400">
                                        Klik preview untuk melihat
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-center gap-2">
                                <Button
                                    type="button"
                                    variant="outline"
                                    size="sm"
                                    onClick={openPreview}
                                    className="border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                                >
                                    <Eye className="w-4 h-4" />
                                </Button>
                                <Button
                                    type="button"
                                    variant="outline"
                                    size="sm"
                                    onClick={handleClick}
                                    className="border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                                >
                                    Ganti
                                </Button>
                                <Button
                                    type="button"
                                    variant="outline"
                                    size="sm"
                                    onClick={handleDelete}
                                    className="border-red-300 dark:border-red-600 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20"
                                >
                                    <X className="w-4 h-4" />
                                </Button>
                            </div>
                        </div>
                    </div>
                ) : (
                    <>
                        <div
                            onClick={handleClick}
                            className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-8 text-center cursor-pointer hover:border-blue-400 dark:hover:border-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/10 transition-colors"
                        >
                            <Upload className="w-12 h-12 mx-auto text-gray-400 dark:text-gray-500 mb-4" />
                            <p className="text-sm font-medium text-gray-900 dark:text-gray-100 mb-1">
                                Klik untuk upload {type === 'image' ? 'gambar' : 'video'} baru
                            </p>
                            <p className="text-xs text-gray-500 dark:text-gray-400">
                                {type === 'image'
                                    ? 'PNG, JPG, JPEG hingga 5MB'
                                    : 'MP4, MOV, AVI hingga 10MB'
                                }
                            </p>
                        </div>

                        <div className="relative">
                            <div className="absolute inset-0 flex items-center">
                                <span className="w-full border-t border-gray-300 dark:border-gray-600" />
                            </div>
                            <div className="relative flex justify-center text-xs uppercase">
                                <span className="bg-background px-2 text-gray-500 dark:text-gray-400">
                                    Atau
                                </span>
                            </div>
                        </div>

                        <Button
                            type="button"
                            variant="outline"
                            className="w-full"
                            onClick={() => setShowMediaPicker(true)}
                        >
                            <FolderOpen className="mr-2 h-4 w-4" />
                            Pilih dari Media Library
                        </Button>
                    </>
                )}
            </div>

            {error && (
                <p className="text-red-500 dark:text-red-400 text-sm">{error}</p>
            )}

            <MediaPreviewModal
                isOpen={previewModal}
                onClose={() => setPreviewModal(false)}
                mediaUrl={value}
                mediaType={type}
                title={label}
            />

            <MediaPickerModal
                isOpen={showMediaPicker}
                onClose={() => setShowMediaPicker(false)}
                onSelect={handleMediaSelect}
                fileType={type}
                title={`Pilih ${type === 'image' ? 'Gambar' : 'Video'}`}
            />
        </div>
    )
}
