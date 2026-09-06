import { useMagneticEffect } from '@/hooks/useMagneticEffect';
import { cn } from '@/lib/utils';

interface PrimaryButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  href?: string;
  className?: string;
  size?: 'default' | 'large';
}

export function PrimaryButton({
  children,
  onClick,
  href,
  className,
  size = 'default',
}: PrimaryButtonProps) {
  const buttonRef = useMagneticEffect();

  const baseClasses = cn(
    'inline-flex items-center justify-center rounded-full font-body text-sm font-medium uppercase tracking-[1px]',
    'bg-terracotta text-warm-white transition-all duration-300 ease-out',
    'hover:bg-terracotta-light hover:shadow-button will-change-transform',
    size === 'default' ? 'px-8 py-3.5' : 'px-10 py-4 text-base',
    className
  );

  if (href) {
    return (
      <a ref={buttonRef as React.Ref<HTMLAnchorElement>} href={href} className={baseClasses}>
        {children}
      </a>
    );
  }

  return (
    <button ref={buttonRef} onClick={onClick} className={baseClasses}>
      {children}
    </button>
  );
}
