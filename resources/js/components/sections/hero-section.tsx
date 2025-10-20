
import { ArrowRight, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AppLogo } from "@/components/atoms/app-logo";
import { AnimatedCounter } from "@/components/atoms/animated-counter";
import { CompanySetting } from "@/types";

interface HeroSectionProps {
    settings: CompanySetting;
    clientCount: number;
    tagline?: string;
    shortDescription?: string;
}

export function HeroSection({ settings, clientCount, tagline, shortDescription }: HeroSectionProps) {
    const whatsappLink = settings.whatsapp_enabled && settings.whatsapp_number
        ? `https://wa.me/${settings.whatsapp_number.replace(/\D/g, "")}?text=${encodeURIComponent(
              settings.whatsapp_default_message || "Halo, saya tertarik dengan layanan Anda."
          )}`
        : "/contact";

    // Calculate years of experience from founding year
    const currentYear = new Date().getFullYear();
    const yearsOfExperience = settings.founding_year
        ? currentYear - settings.founding_year
        : 5;

    return (
        <section className="relative flex items-center justify-center min-h-[90vh] bg-gradient-to-br from-[#F3FCFF] via-[#E6F7FB] to-[#C1E8F7] py-20 px-4 overflow-hidden">
            {/* Decorative elements */}
            <div className="absolute top-20 left-10 w-72 h-72 bg-[#21b6fc]/20 rounded-full blur-3xl animate-pulse" />
            <div className="absolute bottom-20 right-10 w-60 h-60 bg-[#1e94d2]/15 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '700ms' }} />
            <div className="absolute top-1/2 left-1/4 w-48 h-48 bg-[#00a3cc]/10 rounded-full blur-2xl" />

            {/* Main Content */}
            <div className="relative flex flex-col items-center max-w-4xl w-full text-center space-y-8 z-10 container">
                <div className="animate-fade-in-down p-6 bg-white/50 backdrop-blur-sm rounded-2xl shadow-xl">
                    <AppLogo
                        logoPath={settings.logo_path}
                        companyName={settings.company_name}
                        size="lg"
                        className="w-28 h-28"
                    />
                </div>

                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#00334e] leading-tight animate-fade-in">
                    {settings.company_name}
                </h1>

                <p className="text-xl md:text-2xl text-[#126088] max-w-2xl font-medium leading-relaxed animate-fade-in-up">
                    {tagline || settings.tagline}
                </p>

                {(shortDescription || settings.short_description_below_tagline) && (
                    <p className="text-base md:text-lg text-[#126088]/80 max-w-4xl leading-relaxed animate-fade-in-up" style={{ animationDelay: '200ms' }}>
                        {shortDescription || settings.short_description_below_tagline}
                    </p>
                )}

                <div className="flex flex-col sm:flex-row gap-4 pt-4 animate-fade-in-up" style={{ animationDelay: '300ms' }}>
                    <Button
                        asChild
                        className="bg-gradient-to-r from-[#21b6fc] to-[#1e94d2] text-white font-semibold px-10 py-6 text-lg shadow-xl hover:shadow-2xl hover:scale-105 transition-all"
                    >
                        <a href={whatsappLink} target={settings.whatsapp_enabled ? "_blank" : undefined} rel="noopener noreferrer">
                            Konsultasi Gratis
                            <ArrowRight className="w-5 h-5 ml-2" />
                        </a>
                    </Button>

                    <Button
                        asChild
                        variant="outline"
                        className="border-2 border-[#21b6fc] text-[#1e94d2] font-semibold px-10 py-6 text-lg hover:bg-[#21b6fc] hover:text-white transition-all"
                    >
                        <a href="/services">
                            Lihat Layanan
                        </a>
                    </Button>
                </div>

                {/* Stats */}
                <div className="flex items-center gap-8 pt-8 text-[#126088] animate-fade-in-up" style={{ animationDelay: '500ms' }}>
                    <div className="flex flex-col items-center">
                        <span className="text-3xl font-bold text-[#1e94d2]">
                            <AnimatedCounter end={clientCount} suffix="+" />
                        </span>
                        <span className="text-sm">Jumlah Client</span>
                    </div>
                    <div className="w-px h-12 bg-[#126088]/30" />
                    <div className="flex flex-col items-center">
                        <span className="text-3xl font-bold text-[#1e94d2]">
                            <AnimatedCounter end={yearsOfExperience} suffix="+" />
                        </span>
                        <span className="text-sm">Tahun Pengalaman</span>
                    </div>
                </div>
            </div>

            {/* Scroll indicator */}
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
                <ChevronDown className="w-6 h-6 text-[#126088]" />
            </div>
        </section>
    );
}
