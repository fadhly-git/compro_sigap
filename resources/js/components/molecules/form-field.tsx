// resources/js/components/molecules/form-field.tsx

import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'

interface FormFieldProps {
    label: string
    name: string
    value: string
    onChange: (value: string) => void
    type?: 'input' | 'textarea'
    placeholder?: string
    required?: boolean
    className?: string
}

export function FormField({
    label,
    name,
    value,
    onChange,
    type = 'input',
    placeholder,
    required = false,
    className = ''
}: FormFieldProps) {
    return (
        <div className={`space-y-2 ${className}`}>
            <Label htmlFor={name}>
                {label}
                {required && <span className="text-destructive ml-1">*</span>}
            </Label>
            {type === 'textarea' ? (
                <Textarea
                    id={name}
                    name={name}
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    placeholder={placeholder}
                    className="min-h-[100px]"
                />
            ) : (
                <Input
                    id={name}
                    name={name}
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    placeholder={placeholder}
                />
            )}
        </div>
    )
}
