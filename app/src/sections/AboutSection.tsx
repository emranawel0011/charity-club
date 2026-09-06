import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SectionLabel } from '@/components/SectionLabel';
import { SecondaryButton } from '@/components/SecondaryButton';
import { AnimatedCounter } from '@/components/AnimatedCounter';

gsap.registerPlugin(ScrollTrigger);

const stats = [
  { value: 200, suffix: '+', label: 'Active Volunteers' },
  { value: 15000, suffix: '+', label: 'Lives Impacted' },
  { value: 50, suffix: '+', label: 'Events Per Year' },
];

export function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Image entrance from left
      gsap.fromTo(
        imageRef.current,
        { opacity: 0, x: -40 },
        {
          opacity: 1,
          x: 0,
          duration: 0.7,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
          },
        }
      );

      // Text elements stagger
      gsap.fromTo(
        '.about-text > *',
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: '.about-text',
            start: 'top 85%',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="bg-warm-white py-16 md:py-20 lg:py-[120px]"
    >
      <div className="max-w-[1200px] mx-auto px-6 md:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-12 items-center">
          {/* Left Image */}
          <div
            ref={imageRef}
            className="relative aspect-[4/5] max-h-[600px] rounded-3xl overflow-hidden shadow-card-hover"
          >
            <img
              src="/assets/about-photo.jpg"
              alt="Community charity event"
              className="w-full h-full object-cover"
              loading="lazy"
            />
          </div>

          {/* Right Content */}
          <div className="about-text">
            <SectionLabel text="OUR STORY" />

            <h2 className="font-display text-3xl md:text-4xl font-medium text-soft-charcoal leading-tight mb-6">
              Building a Caring Community, One Act at a Time
            </h2>

            <p className="font-body text-base text-muted-brown leading-relaxed mb-4">
              Founded in 2015 by a small group of neighbors who believed their
              community could be better, The Helping Hand has grown into a
              vibrant network of over 200 volunteers. We started with a simple
              neighborhood cleanup and have since expanded to three core programs
              that touch every corner of our community.
            </p>

            <p className="font-body text-base text-muted-brown leading-relaxed mb-8">
              What makes us different is our belief that charity begins at home —
              not just in distant places, but right here in our own streets,
              parks, and schools. Every donation, every volunteer hour, and every
              act of kindness stays within our community, creating a ripple
              effect of positive change.
            </p>

            {/* Stats */}
            <div className="flex flex-wrap gap-8 mb-8">
              {stats.map((stat) => (
                <div key={stat.label} className="text-center md:text-left">
                  <div className="font-display text-4xl font-medium text-terracotta">
                    <AnimatedCounter end={stat.value} suffix={stat.suffix} />
                  </div>
                  <div className="font-body text-sm font-medium uppercase text-muted-brown mt-1">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>

            <SecondaryButton>Meet Our Team</SecondaryButton>
          </div>
        </div>
      </div>
    </section>
  );
}
