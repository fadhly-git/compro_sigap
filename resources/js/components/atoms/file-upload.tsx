import { useState, useRef } from 'react'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Upload, X, Eye, FileImage, FileVideo } from 'lucide-react'
import { MediaPreviewModal } from '@/components/molecules/media-preview-modal'

interface FileUploadProps {
    label: string
    accept: string
    value: string | null
    onChange: (file: File | null) => void
    onDelete: () => void
    type: 'image' | 'video'
    error?: string
    className?: string
}

export function FileUpload({
    label,
    accept,
    value,
    onChange,
    onDelete,
    type,
    error,
    className = ''
}: FileUploadProps) {
    const [previewModal, setPreviewModal] = useState(false)
    const fileInputRef = useRef<HTMLInputElement>(null)

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0] || null
        onChange(file)
    }

    const handleClick = () => {
        fileInputRef.current?.click()
    }

    const handleDelete = () => {
        onDelete()
        if (fileInputRef.current) {
            fileInputRef.current.value = ''
        }
    }

    const openPreview = () => {
        if (value) {
            setPreviewModal(true)
        }
    }

    return (
        <div className={`space-y-2 ${className}`}>
            <Label className="text-gray-700 dark:text-gray-300">{label}</Label>

            <div className="relative">
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
                    <div
                        onClick={handleClick}
                        className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-8 text-center cursor-pointer hover:border-blue-400 dark:hover:border-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/10 transition-colors"
                    >
                        <Upload className="w-12 h-12 mx-auto text-gray-400 dark:text-gray-500 mb-4" />
                        <p className="text-sm font-medium text-gray-900 dark:text-gray-100 mb-1">
                            Klik untuk upload {type === 'image' ? 'gambar' : 'video'}
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                            {type === 'image'
                                ? 'PNG, JPG, JPEG hingga 5MB'
                                : 'MP4, MOV, AVI hingga 10MB'
                            }
                        </p>
                    </div>
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
        </div>
    )
}
