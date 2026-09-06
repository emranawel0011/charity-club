import { useScrollEntrance } from '@/hooks/useScrollEntrance';
import { SectionLabel } from '@/components/SectionLabel';
import { PrimaryButton } from '@/components/PrimaryButton';
import { SecondaryButton } from '@/components/SecondaryButton';
import { Check } from 'lucide-react';

export function CTASection() {
  const contentRef = useScrollEntrance<HTMLDivElement>({
    childSelector: '.cta-item',
    stagger: 0.1,
    delay: 0.2,
  });

  return (
    <section
      id="donate"
      className="relative py-16 md:py-20 lg:py-[120px] overflow-hidden"
    >
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-soft-lavender/20 to-warm-cream" />

      <div
        ref={contentRef}
        className="relative z-10 max-w-[800px] mx-auto px-6 md:px-10 text-center"
      >
        <div className="cta-item">
          <SectionLabel text="TAKE ACTION" />
        </div>

        <h2 className="cta-item font-display text-3xl md:text-4xl lg:text-[56px] font-normal text-soft-charcoal leading-[1.1] max-w-[700px] mx-auto mb-6">
          Be the Change Your Community Needs
        </h2>

        <p className="cta-item font-body text-lg text-muted-brown leading-relaxed max-w-[560px] mx-auto mb-10">
          Every contribution matters — whether it&apos;s your time, a donation, or
          simply sharing our mission with a friend. Together, we can build a
          stronger, kinder community.
        </p>

        <div className="cta-item flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
          <PrimaryButton href="#donate" size="large">
            Donate Now
          </PrimaryButton>
          <SecondaryButton href="#programs">Become a Volunteer</SecondaryButton>
        </div>

        <div className="cta-item flex items-center justify-center gap-2 text-muted-brown/70">
          <Check className="w-4 h-4 text-sage-green" />
          <span className="font-body text-sm">
            100% of donations go directly to community programs.
          </span>
        </div>
      </div>
    </section>
  );
}
