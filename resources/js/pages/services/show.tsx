// resources/js/pages/services/show.tsx

import { Head } from "@inertiajs/react";
import { MainLayout } from "@/layouts/main-layout";
import { ServiceDetailSection } from "@/components/sections/service-detail-section";
import { CompanySetting, Service } from "@/types";

interface ServiceShowPageProps {
    companySettings: CompanySetting;
    service: Service;
    featuredServices: Service[];
}

export default function ServiceShow({
    companySettings,
    service,
    featuredServices
}: ServiceShowPageProps) {
    return (
        <MainLayout settings={companySettings} services={featuredServices}>
            <Head>
                <title>
                    {service.metaTitle || `${service.title} | ${companySettings.company_name}`}
                </title>
                <meta
                    name="description"
                    content={service.metaDescription || service.description}
                />
                {service.metaKeywords && (
                    <meta name="keywords" content={service.metaKeywords} />
                )}
            </Head>

            <ServiceDetailSection service={service} />
        </MainLayout>
    );
}
