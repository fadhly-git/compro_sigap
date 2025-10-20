// resources/js/components/organisms/certificates-carousel.tsx

import { SectionTitle } from "@/components/atoms/section-title-guest";
import { CertificateBadge } from "@/components/molecules/certificate-badge";
import { Certificate } from "@/types";

interface CertificatesCarouselProps {
    certificates: Certificate[];
}

export function CertificatesCarousel({ certificates }: CertificatesCarouselProps) {
    // Duplicate certificates multiple times for seamless infinite loop
    const duplicatedCertificates = [...certificates, ...certificates, ...certificates];

    return (
        <section className="container max-w-7xl mx-auto py-20 px-4 overflow-hidden">
            <SectionTitle>Sertifikasi & Penghargaan</SectionTitle>

            <div className="relative w-full mt-8">
                {/* Gradient overlays for fade effect */}
                <div className="absolute left-0 top-0 bottom-0 w-20 md:w-32 bg-gradient-to-r from-white dark:from-gray-950 to-transparent z-10 pointer-events-none" />
                <div className="absolute right-0 top-0 bottom-0 w-20 md:w-32 bg-gradient-to-l from-white dark:from-gray-950 to-transparent z-10 pointer-events-none" />

                {/* Scrolling container */}
                <div className="overflow-hidden">
                    <div className="flex gap-6 animate-infinite-scroll hover:[animation-play-state:paused]">
                        {duplicatedCertificates.map((cert, index) => (
                            <div key={`${cert.id}-${index}`} className="flex-shrink-0">
                                <CertificateBadge certificate={cert} />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
