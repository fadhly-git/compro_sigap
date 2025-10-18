import { NavFooter } from '@/components/organism/nav-footer';
import { NavMain } from '@/components/organism/nav-main';
import { NavUser } from '@/components/organism/nav-user';
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from '@/components/ui/sidebar';
import { dashboard } from '@/routes/admin';
import { index as about } from '@/routes/admin/management-content/about';
import { type NavItem } from '@/types';
import { Link } from '@inertiajs/react';
import { FactoryIcon, LayoutGrid, SendIcon } from 'lucide-react';
import AppLogo from './app-logo';

const mainNavItems: NavItem[] = [
    {
        title: 'Dashboard',
        href: dashboard(),
        icon: LayoutGrid,
    },
    {
        title: 'Manajemen Konten',
        href: '#',
        icon: LayoutGrid,
        items: [
            {
                title: 'Tentang Kami',
                href: about(),
                icon: FactoryIcon
            },
            {
                title: 'Layanan',
                href: '/admin/management-content/services',
                icon: FactoryIcon
            }
        ]
    }
];

const footerNavItems: NavItem[] = [
    {
        title: 'Feedback',
        href: 'https://github.com/laravel/react-starter-kit',
        icon: SendIcon,
    },
];

export function AppSidebar() {
    return (
        <Sidebar collapsible="icon" variant="inset">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href={dashboard()} prefetch>
                                <AppLogo />
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                <NavMain items={mainNavItems} />
            </SidebarContent>

            <SidebarFooter>
                <NavFooter items={footerNavItems} className="mt-auto" />
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}
