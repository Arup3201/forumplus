import { useState, useCallback } from 'react';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { cn } from '@/lib/utils';
import { Icons } from '@/components/icons';

interface OptimizedAvatarProps {
  src?: string | null;
  alt?: string;
  fallbackText?: string;
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

const sizeClasses = {
  sm: 'w-8 h-8',
  md: 'w-12 h-12', 
  lg: 'w-16 h-16',
  xl: 'w-32 h-32'
};

const OptimizedAvatar = ({ 
  src, 
  alt, 
  fallbackText, 
  className, 
  size = 'md' 
}: OptimizedAvatarProps) => {
  const [imageError, setImageError] = useState(false);
  const [imageLoading, setImageLoading] = useState(true);

  const handleImageError = useCallback(() => {
    setImageError(true);
    setImageLoading(false);
  }, []);

  const handleImageLoad = useCallback(() => {
    setImageError(false);
    setImageLoading(false);
  }, []);

  // Don't attempt to load image if src is null/undefined or we've had an error
  const shouldShowImage = src && !imageError;

  return (
    <Avatar className={cn(sizeClasses[size], className)}>
      {shouldShowImage && (
        <AvatarImage
          src={src}
          alt={alt ?? 'User avatar'}
          onError={handleImageError}
          onLoad={handleImageLoad}
          referrerPolicy='no-referrer'
          className={cn(
            "transition-opacity duration-200",
            imageLoading ? "opacity-0" : "opacity-100"
          )}
        />
      )}
      <AvatarFallback className={cn(
        "bg-gradient-to-br from-blue-500 to-purple-600 font-semibold text-white",
        imageLoading && shouldShowImage ? "opacity-50" : "opacity-100"
      )}>
        {fallbackText ? (
          fallbackText
            .split(' ')
            .map(n => n[0])
            .join('')
            .toUpperCase()
            .slice(0, 2)
        ) : (
          <Icons.User className={cn(
            sizeClasses[size]
          )} />
        )}
      </AvatarFallback>
    </Avatar>
  );
}

export default OptimizedAvatar;