import type { LucideIcon } from "lucide-react";

interface CustomIconProps {
    size?: number;
    className?: string;
    viewBox?: string;
}

type CustomIcon = LucideIcon | React.FC<CustomIconProps>;

interface IconProps {
    icon: CustomIcon;
    size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
    className?: string;
    'aria-label'?: string;
}

export type { IconProps, CustomIconProps };