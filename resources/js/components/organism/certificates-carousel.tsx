// resources/js/components/organisms/certificates-carousel.tsx

import { SectionTitle } from "@/components/atoms/section-title-guest";
import { CertificateBadge } from "@/components/molecules/certificate-badge";
import { Certificate } from "@/types";
import { useEffect, useRef } from "react";

interface CertificatesCarouselProps {
    certificates: Certificate[];
}

export function CertificatesCarousel({ certificates }: CertificatesCarouselProps) {
    const scrollRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const scrollContainer = scrollRef.current;
        if (!scrollContainer) return;

        let scrollInterval: NodeJS.Timeout;

        const startScroll = () => {
            scrollInterval = setInterval(() => {
                if (scrollContainer.scrollLeft >= scrollContainer.scrollWidth / 2) {
                    scrollContainer.scrollLeft = 0;
                } else {
                    scrollContainer.scrollLeft += 1;
                }
            }, 30);
        };

        startScroll();

        return () => clearInterval(scrollInterval);
    }, []);

    const duplicatedCertificates = [...certificates, ...certificates];

    return (
        <section className="container max-w-7xl mx-auto py-20 px-4">
            <SectionTitle>Sertifikasi & Penghargaan</SectionTitle>

            <div
                ref={scrollRef}
                className="overflow-hidden"
                style={{ cursor: 'grab' }}
            >
                <div className="flex gap-6 w-max">
                    {duplicatedCertificates.map((cert, index) => (
                        <CertificateBadge key={`${cert.id}-${index}`} certificate={cert} />
                    ))}
                </div>
            </div>
        </section>
    );
}
