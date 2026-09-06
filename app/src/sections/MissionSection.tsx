import { useScrollEntrance } from '@/hooks/useScrollEntrance';
import { SectionLabel } from '@/components/SectionLabel';
import { MissionCard } from '@/components/MissionCard';

const missions = [
  {
    image: '/assets/mission-animals.jpg',
    title: 'Animal Welfare',
    description:
      'From rescuing stray animals to organizing community pet adoption events, we work to ensure every animal in our neighborhood receives the care and love they deserve.',
  },
  {
    image: '/assets/mission-education.jpg',
    title: 'Education Support',
    description:
      'We provide tutoring, school supplies, and scholarship opportunities to local students, believing that every child deserves access to quality education regardless of their background.',
  },
  {
    image: '/assets/mission-environment.jpg',
    title: 'Environmental Care',
    description:
      'Through tree planting drives, community garden projects, and neighborhood cleanups, we\'re dedicated to making our local environment greener, cleaner, and more sustainable.',
  },
];

export function MissionSection() {
  const headingRef = useScrollEntrance<HTMLDivElement>({ delay: 0.2 });
  const cardsRef = useScrollEntrance<HTMLDivElement>({
    childSelector: '.mission-card',
    stagger: 0.15,
    delay: 0.3,
  });

  return (
    <section className="bg-warm-cream py-16 md:py-20 lg:py-[120px]">
      <div className="max-w-[1200px] mx-auto px-6 md:px-10">
        {/* Heading */}
        <div ref={headingRef} className="text-center mb-12">
          <SectionLabel text="WHAT WE DO" />
          <h2 className="font-display text-3xl md:text-4xl font-medium text-soft-charcoal max-w-[600px] mx-auto">
            Three Ways We Make a Difference
          </h2>
        </div>

        {/* Cards Grid */}
        <div
          ref={cardsRef}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {missions.map((mission) => (
            <div key={mission.title} className="mission-card">
              <MissionCard
                image={mission.image}
                title={mission.title}
                description={mission.description}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
