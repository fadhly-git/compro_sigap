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

    return (
        <TooltipProvider>
            <Head>
                <title>{pageTitle}</title>
                <meta name="description" content={pageDescription} />
                {settings.meta_keywords && (
                    <meta name="keywords" content={settings.meta_keywords} />
                )}
                {settings.favicon_path && (
                    <link rel="icon" type="image/x-icon" href={settings.favicon_path} />
                )}
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
