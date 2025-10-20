// resources/js/pages/about.tsx

import { Head } from "@inertiajs/react";
import { MainLayout } from "@/layouts/main-layout";
import { AboutHeroSection } from "@/components/sections/about-hero-section";
import { MissionVisionSection } from "@/components/sections/mission-vision-section";
import { ProfileSection } from "@/components/sections/profile-section";
// import { StatsSection } from "@/components/sections/stats-section";
import { CertificatesCarousel } from "@/components/organism/certificates-carousel";
import { AboutUs, Certificate, CompanySetting, Service } from "@/types";

interface AboutPageProps {
    companySettings: CompanySetting;
    featuredServices: Service[];
    about: AboutUs;
    certificates: Certificate[];
}

export default function About({ companySettings, about, certificates, featuredServices }: AboutPageProps) {
    return (
        <MainLayout settings={companySettings} services={featuredServices}>
            <Head>
                <title>{about?.meta_title || `Tentang Kami | ${companySettings.company_name}`}</title>
                <meta name="description" content={about?.meta_description || companySettings.company_description} />
                <meta name="keywords" content={about?.meta_keywords || ""} />
            </Head>

            {/* Hero Section with Description */}
            {about?.description && (
                <AboutHeroSection description={about.description} />
            )}

            {/* Mission & Vision Section */}
            <MissionVisionSection
                vision={about?.vision}
                mission={about?.mission}
            />

            {/* Stats Section */}

            {/* Profile Images & Video Section */}
            <ProfileSection
                images={about?.profile_images || []}
                videoUrl={about?.profile_video_url || undefined}
            />

            {/* Certificates Carousel */}
            {certificates && certificates.length > 0 && (
                <CertificatesCarousel certificates={certificates} />
            )}
        </MainLayout>
    );
}
