// resources/js/components/molecules/image-upload-field.tsx

import { useState, useRef } from 'react'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Upload, X, Eye, FileImage, Loader2 } from 'lucide-react'
import { MediaPreviewModal } from '@/components/molecules/media-preview-modal'
import { toast } from 'sonner'
import uploadRoute from '@/routes/admin/media'

interface ImageUploadFieldProps {
  label: string
  value: string | null
  onChange: (path: string) => void
  onDelete: () => void
  error?: string
  className?: string
  required?: boolean
}

export function ImageUploadField({
  label,
  value,
  onChange,
  onDelete,
  error,
  className = '',
  required = false
}: ImageUploadFieldProps) {
  const [previewModal, setPreviewModal] = useState(false)
  const [isUploading, setIsUploading] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    if (!file.type.startsWith('image/')) {
      toast.error('File harus berupa gambar')
      return
    }

    const maxSize = 5 * 1024 * 1024 // 5MB
    if (file.size > maxSize) {
      toast.error('Ukuran file terlalu besar. Maksimal 5MB')
      return
    }

    setIsUploading(true)

    try {
      const formData = new FormData()
      formData.append('file', file)

      const response = await fetch(uploadRoute.upload.url(), {
        method: 'POST',
        body: formData,
        headers: {
          'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || '',
        },
      })

      const result = await response.json()

      if (result.success) {
        onChange(result.url)
        toast.success('Gambar berhasil diupload')
      } else {
        toast.error(result.error || 'Gagal mengupload gambar')
      }
    } catch (error) {
      console.error('Upload error:', error)
      toast.error('Terjadi kesalahan saat mengupload')
    } finally {
      setIsUploading(false)
    }
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

  return (
    <div className={`space-y-2 ${className}`}>
      <Label>
        {label}
        {required && <span className="text-destructive ml-1">*</span>}
      </Label>

      <div className="relative">
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="hidden"
          disabled={isUploading}
        />

        {value ? (
          <div className="relative group border-2 border-dashed rounded-lg p-4 bg-secondary/50">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <FileImage className="w-8 h-8 text-blue-500" />
                <div>
                  <p className="text-sm font-medium">Gambar berhasil dipilih</p>
                  <p className="text-xs text-muted-foreground">Klik preview untuk melihat</p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => setPreviewModal(true)}
                >
                  <Eye className="w-4 h-4" />
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={handleClick}
                  disabled={isUploading}
                >
                  {isUploading ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Ganti'}
                </Button>
                <Button
                  type="button"
                  variant="destructive"
                  size="sm"
                  onClick={handleDelete}
                  disabled={isUploading}
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        ) : (
          <div
            onClick={handleClick}
            className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer hover:border-primary hover:bg-secondary/50 transition-colors ${
              isUploading ? 'pointer-events-none opacity-50' : ''
            }`}
          >
            {isUploading ? (
              <div className="flex flex-col items-center">
                <Loader2 className="w-12 h-12 mx-auto text-muted-foreground mb-4 animate-spin" />
                <p className="text-sm font-medium mb-1">Mengupload...</p>
              </div>
            ) : (
              <>
                <Upload className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
                <p className="text-sm font-medium mb-1">Klik untuk upload gambar</p>
                <p className="text-xs text-muted-foreground">PNG, JPG, JPEG hingga 5MB</p>
              </>
            )}
          </div>
        )}
      </div>

      {error && <p className="text-sm text-destructive">{error}</p>}

      <MediaPreviewModal
        isOpen={previewModal}
        onClose={() => setPreviewModal(false)}
        mediaUrl={value}
        mediaType="image"
        title={label}
      />
    </div>
  )
}
