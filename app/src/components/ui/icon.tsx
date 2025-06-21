import { cn } from "@/lib/utils";
import type { IconProps } from "@/types/components/icon";

const iconSizes = {
  xs: 'w-3 h-3',
  sm: 'w-4 h-4', 
  md: 'w-5 h-5',
  lg: 'w-6 h-6',
  xl: 'w-8 h-8',
} as const;

export const Icon = ({ 
  icon: IconComponent, 
  size = 'md', 
  className,
  'aria-label': ariaLabel,
  ...props 
}: IconProps) => {
  return (
    <IconComponent
      className={cn(iconSizes[size], className)}
      aria-label={ariaLabel}
      {...props}
    />
  );
};