import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { FloatingPetals } from '@/components/FloatingPetals';
import { RotatingBadge } from '@/components/RotatingBadge';
import { PrimaryButton } from '@/components/PrimaryButton';
import { SectionLabel } from '@/components/SectionLabel';

export function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.3 });

      // Content fade in
      tl.fromTo(
        '.hero-label',
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' }
      )
        .fromTo(
          '.hero-headline',
          { opacity: 0, y: 40 },
          { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' },
          '-=0.3'
        )
        .fromTo(
          '.hero-desc',
          { opacity: 0, y: 40 },
          { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' },
          '-=0.3'
        )
        .fromTo(
          '.hero-cta',
          { opacity: 0, y: 40 },
          { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' },
          '-=0.3'
        );

      // Image collage stagger
      tl.fromTo(
        '.hero-img-main',
        { opacity: 0, scale: 0.95 },
        { opacity: 1, scale: 1, duration: 0.6, ease: 'power2.out' },
        '-=0.4'
      )
        .fromTo(
          '.hero-img-secondary',
          { opacity: 0, scale: 0.95 },
          { opacity: 1, scale: 1, duration: 0.6, ease: 'power2.out' },
          '-=0.4'
        )
        .fromTo(
          '.hero-img-accent',
          { opacity: 0, scale: 0.8 },
          { opacity: 1, scale: 1, duration: 0.6, ease: 'power2.out' },
          '-=0.3'
        );

      // Badge entrance
      tl.fromTo(
        badgeRef.current,
        { opacity: 0, scale: 0.5 },
        { opacity: 1, scale: 1, duration: 0.8, ease: 'back.out(1.7)' },
        '-=0.3'
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleJoinClick = () => {
    const programsSection = document.querySelector('#programs');
    if (programsSection) {
      programsSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen w-full bg-warm-white overflow-hidden pt-[72px]"
    >
      <FloatingPetals />

      <div className="relative z-10 w-full max-w-[1200px] mx-auto px-6 md:px-10 min-h-[calc(100vh-72px)] flex items-center">
        <div className="grid grid-cols-1 lg:grid-cols-[55%_45%] gap-8 lg:gap-4 w-full items-center py-12 lg:py-0">
          {/* Left Content */}
          <div ref={contentRef} className="order-1 lg:order-1">
            <div className="hero-label">
              <SectionLabel text="CHARITY CLUB" />
            </div>

            <h1 className="hero-headline font-display text-4xl md:text-5xl lg:text-[72px] font-normal text-soft-charcoal leading-[1.05] tracking-tight max-w-[600px]">
              Compassion in Action, Community at Heart
            </h1>

            <p className="hero-desc font-body text-lg text-muted-brown leading-relaxed max-w-[480px] mt-6">
              The Helping Hand Charity Club brings neighbors together to create
              meaningful change — from caring for stray animals to supporting
              local students and protecting our environment.
            </p>

            <div className="hero-cta mt-8">
              <PrimaryButton onClick={handleJoinClick}>Join Our Cause</PrimaryButton>
            </div>
          </div>

          {/* Right Image Collage */}
          <div
            ref={imageRef}
            className="relative order-2 lg:order-2 h-[400px] md:h-[500px] lg:h-[550px]"
          >
            {/* Main Image */}
            <div className="hero-img-main absolute top-0 left-0 w-[70%] lg:w-[60%] rounded-3xl overflow-hidden shadow-card-hover z-[2]">
              <img
                src="/assets/hero-main.jpg"
                alt="Community garden event"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Secondary Image */}
            <div className="hero-img-secondary absolute bottom-0 right-0 w-[55%] lg:w-[55%] rounded-3xl overflow-hidden shadow-card-hover z-[3]">
              <img
                src="/assets/hero-secondary.jpg"
                alt="Holding a kitten"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Accent Circular Image */}
            <div className="hero-img-accent absolute top-[35%] right-[5%] w-[100px] h-[100px] md:w-[120px] md:h-[120px] rounded-full overflow-hidden shadow-card-hover z-[4] rotate-[8deg]">
              <img
                src="/assets/hero-accent.jpg"
                alt="School supplies"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Rotating Badge */}
            <div
              ref={badgeRef}
              className="absolute bottom-4 left-[10%] lg:bottom-8 lg:left-auto lg:right-4 z-[5]"
            >
              <RotatingBadge />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
