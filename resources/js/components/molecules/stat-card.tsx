// resources/js/components/molecules/stat-card.tsx

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { Link } from '@inertiajs/react';

interface StatCardProps {
    title: string;
    value: number | string;
    description?: string;
    icon?: React.ReactNode;
    trend?: {
        value: number;
        isPositive: boolean;
    };
    className?: string;
    href?: string;
}

export function StatCard({
    title,
    value,
    description,
    icon,
    trend,
    href = '#',
    className,
}: StatCardProps) {
    return (
        <Link href={href}>
            <Card className={cn('relative overflow-hidden', className)}>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                        {title}
                    </CardTitle>
                    {icon && (
                        <div className="h-4 w-4 text-muted-foreground">
                            {icon}
                        </div>
                    )}
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">{value}</div>
                    {description && (
                        <p className="text-xs text-muted-foreground">
                            {description}
                        </p>
                    )}
                    {trend && (
                        <div
                            className={cn(
                                'mt-1 flex items-center text-xs',
                                trend.isPositive
                                    ? 'text-green-600'
                                    : 'text-red-600',
                            )}
                        >
                            <span
                                className={cn(
                                    'mr-1',
                                    trend.isPositive ? '↗' : '↘',
                                )}
                            >
                                {trend.isPositive ? '↗' : '↘'}
                            </span>
                            {trend.value}%
                        </div>
                    )}
                </CardContent>
            </Card>
        </Link>
    );
}
