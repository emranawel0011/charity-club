import { Heart } from 'lucide-react';

export function RotatingBadge() {
  const text = 'SINCE 2015 \u2022 CARING FOR COMMUNITY \u2022 ';
  const characters = text.split('');
  const degreePerChar = 360 / characters.length;

  return (
    <div className="relative w-36 h-36 md:w-40 md:h-40 animate-rotate-badge">
      <div className="absolute inset-0 rounded-full bg-warm-gold/15" />
      <div className="absolute inset-0 flex items-center justify-center">
        <Heart className="w-6 h-6 text-warm-gold fill-warm-gold" />
      </div>
      {characters.map((char, i) => (
        <span
          key={i}
          className="absolute left-1/2 top-0 font-body text-[11px] font-medium uppercase text-warm-gold"
          style={{
            height: '50%',
            transform: `rotate(${i * degreePerChar}deg)`,
            transformOrigin: '0 100%',
          }}
        >
          {char}
        </span>
      ))}
    </div>
  );
}
