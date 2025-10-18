import { Badge } from '@/components/ui/badge'

interface StatusBadgeProps {
    isActive: boolean
    className?: string
}

export function StatusBadge({ isActive, className = '' }: StatusBadgeProps) {
    return (
        <Badge
            variant={isActive ? 'default' : 'secondary'}
            className={className}
        >
            {isActive ? 'Aktif' : 'Tidak Aktif'}
        </Badge>
    )
}
