import { Sparkles } from 'lucide-react';

interface SectionLabelProps {
  text: string;
  color?: 'terracotta' | 'warm-gold';
}

export function SectionLabel({ text, color = 'terracotta' }: SectionLabelProps) {
  const colorClass = color === 'warm-gold' ? 'text-warm-gold' : 'text-terracotta';

  return (
    <div className="flex items-center justify-center gap-2 mb-4">
      <Sparkles className={`w-3 h-3 ${colorClass}`} />
      <span
        className={`font-body text-xs font-medium uppercase tracking-[0.5px] ${colorClass}`}
      >
        {text}
      </span>
    </div>
  );
}
