// resources/js/components/atoms/video-player.tsx

import { Play } from "lucide-react";
import { useState } from "react";

interface VideoPlayerProps {
    videoUrl: string;
    thumbnailUrl?: string;
    className?: string;
}

export function VideoPlayer({ videoUrl, thumbnailUrl, className = "" }: VideoPlayerProps) {
    const [isPlaying, setIsPlaying] = useState(false);

    // Extract video ID from YouTube URL
    const getYouTubeId = (url: string) => {
        const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
        const match = url.match(regExp);
        return match && match[2].length === 11 ? match[2] : null;
    };

    const videoId = getYouTubeId(videoUrl);
    const embedUrl = videoId ? `https://www.youtube.com/embed/${videoId}?autoplay=1` : videoUrl;

    if (isPlaying) {
        return (
            <div className={`relative w-full aspect-video ${className}`}>
                <iframe
                    src={embedUrl}
                    title="Video Player"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="absolute inset-0 w-full h-full rounded-lg"
                />
            </div>
        );
    }

    return (
        <div className={`relative w-full aspect-video cursor-pointer group ${className}`} onClick={() => setIsPlaying(true)}>
            <img
                src={thumbnailUrl || `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`}
                alt="Video thumbnail"
                className="absolute inset-0 w-full h-full object-cover rounded-lg"
            />
            <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-colors rounded-lg flex items-center justify-center">
                <div className="w-16 h-16 sm:w-20 sm:h-20 bg-white/90 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Play className="w-8 h-8 sm:w-10 sm:h-10 text-[#1e94d2] ml-1" fill="currentColor" />
                </div>
            </div>
        </div>
    );
}
