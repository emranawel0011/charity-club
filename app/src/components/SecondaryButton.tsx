import { cn } from '@/lib/utils';

interface SecondaryButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  href?: string;
  className?: string;
}

export function SecondaryButton({ children, onClick, href, className }: SecondaryButtonProps) {
  const baseClasses = cn(
    'inline-flex items-center justify-center rounded-full font-body text-sm font-medium uppercase tracking-[1px]',
    'border border-soft-charcoal text-soft-charcoal bg-transparent',
    'transition-all duration-300 ease-out',
    'hover:bg-soft-charcoal hover:text-warm-cream px-8 py-3.5',
    className
  );

  if (href) {
    return (
      <a href={href} className={baseClasses}>
        {children}
      </a>
    );
  }

  return (
    <button onClick={onClick} className={baseClasses}>
      {children}
    </button>
  );
}
