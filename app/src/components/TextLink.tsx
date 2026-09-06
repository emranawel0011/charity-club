import { ArrowRight } from 'lucide-react';

interface TextLinkProps {
  children: React.ReactNode;
  href?: string;
}

export function TextLink({ children, href = '#' }: TextLinkProps) {
  return (
    <a
      href={href}
      className="inline-flex items-center gap-2 font-body text-sm font-medium uppercase tracking-[0.5px] text-terracotta transition-all duration-300 group"
    >
      <span className="group-hover:underline underline-offset-4">{children}</span>
      <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
    </a>
  );
}
