// resources/js/components/organisms/dashboard-stats-grid.tsx

import { StatCard } from "@/components/molecules/stat-card"
import { DashboardStats } from "@/types/dashboard"
import {
    FileText,
    Briefcase,
    Users,
    Image,
    FolderOpen,
    MessageSquare,
    Award
} from "lucide-react"
import { index as aboutRoute } from "@/routes/admin/management-content/about"
import { index as serviceRoute } from "@/routes/admin/management-content/services"
import { index as clientRoute } from "@/routes/admin/management-content/portfolio"
import { index as galleryRoute } from "@/routes/admin/management-content/gallery"
import { index as messageRoute } from "@/routes/admin/message"
import { index as certificateRoute } from "@/routes/admin/certificates"

interface DashboardStatsGridProps {
    stats: DashboardStats
}

export function DashboardStatsGrid({ stats }: DashboardStatsGridProps) {
    return (
        <div className="grid gap-4 md:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
            <StatCard
                title="Halaman Tentang"
                value={stats.pages.about}
                description="Total halaman tentang kami"
                icon={<FileText />}
                href={aboutRoute().url}
            />

            <StatCard
                title="Layanan Aktif"
                value={stats.pages.services}
                description="Layanan yang dipublikasikan"
                icon={<Briefcase />}
                href={serviceRoute().url}
            />

            <StatCard
                title="Klien Portfolio"
                value={stats.pages.clients}
                description="Klien yang terdaftar"
                icon={<Users />}
                href={clientRoute().url}
            />

            <StatCard
                title="Kategori Galeri"
                value={stats.gallery.categories}
                description="Kategori galeri aktif"
                icon={<FolderOpen />}
                href={galleryRoute().url}
            />

            <StatCard
                title="Item Galeri"
                value={stats.gallery.items}
                description="Total item galeri"
                icon={<Image />}
                href={galleryRoute().url}
            />

            <StatCard
                title="Pesan Masuk"
                value={stats.messages.total}
                description={`${stats.messages.unread} belum dibaca`}
                icon={<MessageSquare />}
                href={messageRoute.url()}
            />

            <StatCard
                title="Pesan Hari Ini"
                value={stats.messages.today}
                description="Pesan masuk hari ini"
                icon={<MessageSquare />}
                href={messageRoute.url()}
            />

            <StatCard
                title="Sertifikat Aktif"
                value={stats.certificates.active}
                description={`dari ${stats.certificates.total} total`}
                icon={<Award />}
                href={certificateRoute.url()}
            />
        </div>
    )
}
