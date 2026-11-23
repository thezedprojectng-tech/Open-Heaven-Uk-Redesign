import Image, { ImageProps } from 'next/image';

interface SafeImageProps extends Omit<ImageProps, 'alt'> {
  alt: string; // Required explicitly
}

/**
 * Enforces mandatory alt text for next/image across the entire project.
 */
export function SafeImage({ alt, ...props }: SafeImageProps) {
  return <Image alt={alt} {...props} />;
}
