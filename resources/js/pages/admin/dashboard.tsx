// resources/js/Pages/admin/dashboard.tsx

import { Head } from "@inertiajs/react"
import AppLayout from "@/layouts/app-layout"
import { DashboardStatsGrid } from "@/components/organism/dashboard-stats-grid"
import { RecentMessagesPanel } from "@/components/organism/recent-messages-panel"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { DashboardProps } from "@/types/dashboard"
import { BreadcrumbItem } from "@/types"
import {
    TrendingUp,
    Calendar,
    Briefcase,
    Images,
    Cog,
    Building2
} from "lucide-react"
import { router } from "@inertiajs/react"
import { dashboard } from '@/routes/admin';
import { index as aboutRute } from "@/routes/admin/management-content/about"
import { create as serviceRouteCreate } from "@/routes/admin/management-content/services"
import { index as galleryIndex } from "@/routes/admin/management-content/gallery"
import { index as settingRoute } from "@/routes/admin/settings"
import HeadingSmall from "@/components/organism/heading-small"

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: dashboard.url(),
    },
]

export default function Dashboard({ stats, recentMessages }: DashboardProps) {
    const quickActions = [
        {
            title: "Kelola Tentang Kami",
            description: "Edit informasi perusahaan",
            icon: <Building2 className="h-5 w-5" />,
            href: aboutRute(),
            color: "bg-blue-500"
        },
        {
            title: "Tambah Layanan",
            description: "Buat layanan baru",
            icon: <Briefcase className="h-5 w-5" />,
            href: serviceRouteCreate(),
            color: "bg-green-500"
        },
        {
            title: "Upload Galeri",
            description: "Tambah foto ke galeri",
            icon: <Images className="h-5 w-5" />,
            href: galleryIndex(),
            color: "bg-purple-500"
        },
        {
            title: "Pengaturan",
            description: "Konfigurasi sistem",
            icon: <Cog className="h-5 w-5" />,
            href: settingRoute(),
            color: "bg-gray-500"
        }
    ]

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard | Admin" />

            <div className="space-y-6 mx-auto max-w-7xl px-4 py-6 w-full">
                {/* Welcome Section */}
                <div className="flex flex-col space-y-2 lg:flex-row lg:items-center lg:justify-between lg:space-y-0">
                    <HeadingSmall
                        title="Dashboard"
                        description="Selamat datang di panel administrasi. Kelola konten website Anda dengan mudah."
                    />
                    <div className="flex items-center space-x-2">
                        <Button variant="outline" size="sm">
                            <Calendar className="mr-2 h-4 w-4" />
                            {new Date().toLocaleDateString('id-ID', {
                                weekday: 'long',
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric'
                            })}
                        </Button>
                    </div>
                </div>

                {/* Stats Overview */}
                <DashboardStatsGrid stats={stats} />

                {/* Content Grid */}
                <div className="grid gap-6 grid-cols-1 lg:grid-cols-3">
                    {/* Quick Actions */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center space-x-2">
                                <TrendingUp className="h-5 w-5" />
                                <span>Aksi Cepat</span>
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-3">
                            {quickActions.map((action, index) => (
                                <div
                                    key={index}
                                    className="flex items-center space-x-3 p-3 rounded-lg border cursor-pointer transition-colors hover:bg-muted/50"
                                    onClick={() => router.visit(action.href)}
                                >
                                    <div className={`p-2 rounded-md text-white ${action.color}`}>
                                        {action.icon}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="font-medium text-sm truncate">
                                            {action.title}
                                        </p>
                                        <p className="text-xs text-muted-foreground truncate">
                                            {action.description}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </CardContent>
                    </Card>

                    {/* Recent Messages Panel */}
                    <RecentMessagesPanel
                        messages={recentMessages}
                        unreadCount={stats.messages.unread}
                    />
                </div>
            </div>
        </AppLayout>
    )
}
