// resources/js/layouts/main-layout.tsx

import { Head } from "@inertiajs/react";
import { ReactNode } from "react";
import { HeaderNavbar } from "@/components/organism/header-navbar";
import { GlobalFooter } from "@/components/organism/global-footer";
import { CompanySetting, Service } from "@/types";
import { TooltipProvider } from "@/components/ui/tooltip";

interface MainLayoutProps {
    children: ReactNode;
    settings: CompanySetting;
    services?: Service[];
    title?: string;
    description?: string;
}

export function MainLayout({
    children,
    settings,
    services = [],
    title,
    description
}: MainLayoutProps) {
    const pageTitle = title
        ? `${title} - ${settings.company_name}`
        : settings.meta_title || settings.company_name;
    const pageDescription = description || settings.meta_description || settings.company_description;

    const siteUrl = typeof window !== 'undefined' ? window.location.origin : '';
    const logoUrl = `${siteUrl}/images/logo-removebg.png`;
    const currentUrl = typeof window !== 'undefined' ? window.location.href : '';

    return (
        <TooltipProvider>
            <Head>
                {/* Primary Meta Tags */}
                <title>{pageTitle}</title>
                <meta name="title" content={pageTitle} />
                <meta name="description" content={pageDescription} />
                {settings.meta_keywords && (
                    <meta name="keywords" content={settings.meta_keywords} />
                )}

                {/* Favicon */}
                {settings.favicon_path && (
                    <link rel="icon" type="image/x-icon" href={settings.favicon_path} />
                )}

                {/* Open Graph / Facebook */}
                <meta property="og:type" content="website" />
                <meta property="og:url" content={currentUrl} />
                <meta property="og:title" content={pageTitle} />
                <meta property="og:description" content={pageDescription} />
                <meta property="og:image" content={logoUrl} />
                <meta property="og:image:width" content="1200" />
                <meta property="og:image:height" content="630" />
                <meta property="og:site_name" content={settings.company_name} />
                <meta property="og:locale" content="id_ID" />

                {/* Twitter */}
                <meta property="twitter:card" content="summary_large_image" />
                <meta property="twitter:url" content={currentUrl} />
                <meta property="twitter:title" content={pageTitle} />
                <meta property="twitter:description" content={pageDescription} />
                <meta property="twitter:image" content={logoUrl} />

                {/* Mobile Optimization */}
                <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=5.0" />
                <meta name="theme-color" content="#21b6fc" />
                <meta name="mobile-web-app-capable" content="yes" />
                <meta name="apple-mobile-web-app-capable" content="yes" />
                <meta name="apple-mobile-web-app-status-bar-style" content="default" />
                <meta name="apple-mobile-web-app-title" content={settings.company_name} />

                {/* Apple Touch Icon */}
                <link rel="apple-touch-icon" href={logoUrl} />
            </Head>

            <div className="min-h-screen flex flex-col">
                <HeaderNavbar settings={settings} services={services} />

                <main className="flex-grow">
                    {children}
                </main>

                <GlobalFooter settings={settings} services={services} />
            </div>
        </TooltipProvider>
    );
}
