// resources/js/components/molecules/media-preview-modal.tsx

import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import { Download, ExternalLink, X } from 'lucide-react';
import { useState } from 'react';

interface MediaPreviewModalProps {
    isOpen: boolean;
    onClose: () => void;
    mediaUrl: string | null;
    mediaType: 'image' | 'video';
    title: string;
}

export function MediaPreviewModal({
    isOpen,
    onClose,
    mediaUrl,
    mediaType,
    title,
}: MediaPreviewModalProps) {
    const [isLoading, setIsLoading] = useState(true);

    // Parse mediaUrl jika berupa array JSON
    let parsedUrl: string | null = null;
    if (mediaUrl) {
        try {
            if (typeof mediaUrl === 'string' && mediaUrl.trim().startsWith('[')) {
                const arr = JSON.parse(mediaUrl);
                parsedUrl = Array.isArray(arr) ? arr[0] : null;
            } else {
                parsedUrl = mediaUrl;
            }
        } catch {
            parsedUrl = null;
        }
    }

    if (!parsedUrl) return null;

    const handleDownload = () => {
        const link = document.createElement('a');
        link.href = parsedUrl;
        link.download = `${title.toLowerCase().replace(/\s+/g, '-')}.${mediaType === 'image' ? 'jpg' : 'mp4'}`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const handleOpenInNewTab = () => {
        window.open(parsedUrl, '_blank');
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="max-h-[90vh] max-w-4xl border bg-white p-0 dark:border-gray-700 dark:bg-gray-900">
                <DialogHeader className="border-b p-4 dark:border-gray-700">
                    <div className="flex items-center justify-between">
                        <DialogTitle className="text-gray-900 dark:text-gray-100">
                            Preview: {title}
                        </DialogTitle>
                    </div>
                </DialogHeader>

                <div className="relative flex-1 overflow-hidden bg-gray-50 dark:bg-gray-800">
                    {mediaType === 'image' ? (
                        <div className="relative flex h-full min-h-[400px] w-full items-center justify-center">
                            {isLoading && (
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <div className="h-8 w-8 animate-spin rounded-full border-b-2 border-blue-600 dark:border-blue-400"></div>
                                </div>
                            )}
                            <img
                                src={`/storage/${parsedUrl}`}
                                alt={title}
                                className="max-h-[70vh] max-w-full object-contain"
                                onLoad={() => setIsLoading(false)}
                                onError={() => setIsLoading(false)}
                            />
                        </div>
                    ) : (
                        <div className="relative flex h-full min-h-[400px] w-full items-center justify-center">
                            {isLoading && (
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <div className="h-8 w-8 animate-spin rounded-full border-b-2 border-blue-600 dark:border-blue-400"></div>
                                </div>
                            )}
                            <video
                                src={parsedUrl}
                                controls
                                className="max-h-[70vh] max-w-full rounded"
                                onLoadedData={() => setIsLoading(false)}
                                onError={() => setIsLoading(false)}
                                style={{ backgroundColor: 'transparent' }}
                            >
                                <source src={parsedUrl} />
                                Browser Anda tidak mendukung video.
                            </video>
                        </div>
                    )}
                </div>
                <DialogDescription className="flex items-center justify-end space-x-2 border-t p-4 dark:border-gray-700">
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={handleOpenInNewTab}
                        disabled={isLoading}
                    >
                        <ExternalLink className="mr-2" />
                        Buka di Tab Baru
                    </Button>
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={handleDownload}
                        disabled={isLoading}
                    >
                        <Download className="mr-2" />
                        Unduh
                    </Button>
                    <Button variant="destructive" size="sm" onClick={onClose}>
                        <X className="mr-2" />
                        Tutup
                    </Button>
                </DialogDescription>
            </DialogContent>
        </Dialog>
    );
}
