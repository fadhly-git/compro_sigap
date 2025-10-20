// resources/js/components/organisms/global-footer.tsx

import { Link } from "@inertiajs/react";
import { Mail, MapPin, Phone, Facebook, Instagram, Linkedin, Twitter, ArrowUpRight } from "lucide-react";
import { AppLogo } from "@/components/atoms/app-logo";
import { SocialMediaLink } from "@/components/molecules/social-media-link";
import { CompanySetting } from "@/types";

interface GlobalFooterProps {
    settings: CompanySetting;
}

export function GlobalFooter({ settings }: GlobalFooterProps) {
    const currentYear = new Date().getFullYear();
    const socialMedia = settings.social_media || {};

    const quickLinks = [
        { label: "Beranda", href: "/" },
        { label: "Tentang Kami", href: "/about" },
        { label: "Layanan", href: "/services" },
        { label: "Galeri", href: "/gallery" },
        { label: "Klien", href: "/clients" },
        { label: "Kontak", href: "/contact" },
    ];

    return (
        <footer className="relative bg-gradient-to-br from-[#00334e] to-[#001f2e] text-white overflow-hidden">
            {/* Decorative elements */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-[#21b6fc]/10 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-72 h-72 bg-[#1e94d2]/10 rounded-full blur-3xl" />

            <div className="container mx-auto max-w-7xl relative z-10">
                {/* Main Footer Content */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 px-6 py-16 border-b border-white/10">
                    {/* Company Info */}
                    <div className="lg:col-span-1">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="p-2 bg-white/10 backdrop-blur-sm rounded-lg">
                                <AppLogo
                                    logoPath={settings.logo_path}
                                    companyName={settings.company_name}
                                    size="sm"
                                />
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-white">
                                    {settings.company_name}
                                </h3>
                                <p className="text-xs text-white/70">Your Tech Partner</p>
                            </div>
                        </div>
                        <p className="text-sm text-white/80 leading-relaxed mb-6">
                            {settings.company_description}
                        </p>

                        {/* Social Media */}
                        <div className="flex gap-3">
                            {socialMedia.facebook && (
                                <SocialMediaLink
                                    href={socialMedia.facebook}
                                    icon={Facebook}
                                    label="Follow us on Facebook"
                                    ariaLabel="Facebook"
                                />
                            )}
                            {socialMedia.instagram && (
                                <SocialMediaLink
                                    href={socialMedia.instagram}
                                    icon={Instagram}
                                    label="Follow us on Instagram"
                                    ariaLabel="Instagram"
                                />
                            )}
                            {socialMedia.linkedin && (
                                <SocialMediaLink
                                    href={socialMedia.linkedin}
                                    icon={Linkedin}
                                    label="Connect on LinkedIn"
                                    ariaLabel="LinkedIn"
                                />
                            )}
                            {socialMedia.twitter && (
                                <SocialMediaLink
                                    href={socialMedia.twitter}
                                    icon={Twitter}
                                    label="Follow us on Twitter"
                                    ariaLabel="Twitter"
                                />
                            )}
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="text-lg font-bold text-white mb-6">Quick Links</h4>
                        <ul className="space-y-3">
                            {quickLinks.map((link) => (
                                <li key={link.href}>
                                    <Link
                                        href={link.href}
                                        className="text-sm text-white/80 hover:text-[#21b6fc] transition-colors flex items-center gap-2 group"
                                    >
                                        <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Services */}
                    <div>
                        <h4 className="text-lg font-bold text-white mb-6">Layanan Kami</h4>
                        <ul className="space-y-3">
                            <li>
                                <Link
                                    href="/services"
                                    className="text-sm text-white/80 hover:text-[#21b6fc] transition-colors flex items-center gap-2 group"
                                >
                                    <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                                    Pengembangan Website
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/services"
                                    className="text-sm text-white/80 hover:text-[#21b6fc] transition-colors flex items-center gap-2 group"
                                >
                                    <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                                    Aplikasi Mobile
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/services"
                                    className="text-sm text-white/80 hover:text-[#21b6fc] transition-colors flex items-center gap-2 group"
                                >
                                    <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                                    UI/UX Design
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/services"
                                    className="text-sm text-white/80 hover:text-[#21b6fc] transition-colors flex items-center gap-2 group"
                                >
                                    <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                                    IT Consulting
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h4 className="text-lg font-bold text-white mb-6">Hubungi Kami</h4>
                        <ul className="space-y-4">
                            {settings.company_email && (
                                <li>
                                    <a
                                        href={`mailto:${settings.company_email}`}
                                        className="text-sm text-white/80 hover:text-[#21b6fc] transition-colors flex items-start gap-3 group"
                                    >
                                        <Mail className="w-4 h-4 mt-0.5 flex-shrink-0" />
                                        <span className="break-all">{settings.company_email}</span>
                                    </a>
                                </li>
                            )}
                            {settings.company_phone && (
                                <li>
                                    <a
                                        href={`tel:${settings.company_phone}`}
                                        className="text-sm text-white/80 hover:text-[#21b6fc] transition-colors flex items-start gap-3 group"
                                    >
                                        <Phone className="w-4 h-4 mt-0.5 flex-shrink-0" />
                                        <span>{settings.company_phone}</span>
                                    </a>
                                </li>
                            )}
                            {settings.company_address && (
                                <li>
                                    <div className="text-sm text-white/80 flex items-start gap-3">
                                        <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" />
                                        <span>{settings.company_address}</span>
                                    </div>
                                </li>
                            )}
                        </ul>
                    </div>
                </div>

                {/* Bottom Footer */}
                <div className="px-6 py-6 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-sm text-white/80 text-center md:text-left">
                        © {currentYear}{" "}
                        <span className="font-semibold text-white">{settings.company_name}</span>.
                        All rights reserved.
                    </p>
                    <div className="flex gap-6">
                        <Link
                            href="/privacy"
                            className="text-sm text-white/80 hover:text-[#21b6fc] transition-colors"
                        >
                            Privacy Policy
                        </Link>
                        <Link
                            href="/terms"
                            className="text-sm text-white/80 hover:text-[#21b6fc] transition-colors"
                        >
                            Terms of Service
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
