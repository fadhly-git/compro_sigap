// resources/js/components/molecules/whatsapp-button.tsx

import { Button } from "@/components/ui/button";
import { CompanySetting } from "@/types";

interface WhatsAppButtonProps {
    settings: CompanySetting;
}

export function WhatsAppButton({ settings }: WhatsAppButtonProps) {
    if (!settings.whatsapp_enabled || !settings.whatsapp_number) {
        return null;
    }

    const handleClick = () => {
        const phoneNumber = settings.whatsapp_number?.replace(/[^0-9]/g, "") || "";
        const message = encodeURIComponent(
            settings.whatsapp_default_message || "Halo, saya ingin bertanya..."
        );
        const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;
        window.open(whatsappUrl, "_blank");
    };

    return (
        <Button
            onClick={handleClick}
            size="icon"
            className="fixed bottom-6 right-6 z-50 h-14 w-14 rounded-full shadow-lg transition-all hover:scale-110 md:h-auto md:w-auto md:py-2 px-4"
            title="Chat via WhatsApp"
        >
            <img src="/icons/whatsapp-ico.svg" alt="WhatsApp" className="h-6 w-6 md:mr-2" />
            <span className="hidden md:inline">Chat WhatsApp</span>
        </Button>
    );
}
