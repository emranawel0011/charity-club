import { useEffect, useRef, useState } from 'react';
import Marquee from 'react-fast-marquee';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SectionLabel } from '@/components/SectionLabel';
import { AnimatedCounter } from '@/components/AnimatedCounter';

gsap.registerPlugin(ScrollTrigger);

const storyImages = [
  '/assets/story-1.jpg',
  '/assets/story-2.jpg',
  '/assets/story-3.jpg',
  '/assets/story-4.jpg',
  '/assets/story-5.jpg',
  '/assets/story-6.jpg',
  '/assets/story-7.jpg',
  '/assets/story-8.jpg',
];

const stats = [
  { value: 47, label: 'Adoptions This Year' },
  { value: 320, label: 'Students Supported' },
  { value: 1200, label: 'Trees Planted' },
];

export function StorySection() {
  const sectionRef = useRef<HTMLElement>(null);
  const quoteRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        quoteRef.current,
        { opacity: 0, scale: 0.95 },
        {
          opacity: 1,
          scale: 1,
          duration: 0.6,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: quoteRef.current,
            start: 'top 85%',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="story"
      ref={sectionRef}
      className="relative overflow-hidden"
    >
      {/* Gallery Section with Terracotta Background */}
      <div className="bg-terracotta py-16 md:py-20 relative">
        {/* Header */}
        <div className="text-center mb-10 relative z-10 px-6">
          <SectionLabel text="OUR IMPACT" color="warm-gold" />
          <h2 className="font-display text-3xl md:text-4xl font-medium text-warm-white">
            Stories from Our Community
          </h2>
        </div>

        {/* Marquee Gallery - Row 1 (left) */}
        <div className="mb-4">
          <Marquee
            speed={isVisible ? 40 : 0}
            direction="left"
            gradient={false}
            pauseOnHover
          >
            {storyImages.map((img, i) => (
              <div
                key={`r1-${i}`}
                className="w-[280px] md:w-[300px] h-[190px] md:h-[200px] mx-2 rounded-xl overflow-hidden border-2 border-white/20 flex-shrink-0"
              >
                <img
                  src={img}
                  alt={`Community story ${i + 1}`}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
            ))}
          </Marquee>
        </div>

        {/* Marquee Gallery - Row 2 (right) */}
        <div>
          <Marquee
            speed={isVisible ? 40 : 0}
            direction="right"
            gradient={false}
            pauseOnHover
          >
            {[...storyImages].reverse().map((img, i) => (
              <div
                key={`r2-${i}`}
                className="w-[280px] md:w-[300px] h-[190px] md:h-[200px] mx-2 rounded-xl overflow-hidden border-2 border-white/20 flex-shrink-0"
              >
                <img
                  src={img}
                  alt={`Community story ${8 - i}`}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
            ))}
          </Marquee>
        </div>

        {/* Quote Overlay */}
        <div className="flex justify-center mt-10 px-6 relative z-10">
          <div
            ref={quoteRef}
            className="bg-warm-white/90 backdrop-blur-xl rounded-3xl p-8 md:p-10 max-w-[500px] shadow-card"
          >
            <p className="font-display text-lg md:text-[22px] italic text-soft-charcoal leading-relaxed mb-4">
              &ldquo;The Helping Hand changed how I see my neighborhood. We&apos;re not
              just residents — we&apos;re a family looking out for each other.&rdquo;
            </p>
            <p className="font-body text-sm font-medium text-muted-brown">
              — Maria Santos, Volunteer since 2018
            </p>
          </div>
        </div>
      </div>

      {/* Stats Bar */}
      <div className="bg-dark-brown py-10 md:py-12">
        <div className="max-w-[1200px] mx-auto px-6 md:px-10">
          <div className="flex flex-col md:flex-row justify-center items-center gap-10 md:gap-20">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="font-display text-4xl md:text-5xl text-warm-gold">
                  <AnimatedCounter end={stat.value} />
                </div>
                <div className="font-body text-sm font-medium text-warm-white/70 mt-2">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
