import { useScrollEntrance } from '@/hooks/useScrollEntrance';
import { SectionLabel } from '@/components/SectionLabel';
import { ProgramCard } from '@/components/ProgramCard';

const programs = [
  {
    image: '/assets/program-adoption.jpg',
    title: 'Pet Adoption Drives',
    description:
      'Monthly events connecting rescued animals with loving families in our community.',
    donationTag: '$25 feeds a shelter pet for a week',
  },
  {
    image: '/assets/program-school.jpg',
    title: 'School Supply Drive',
    description:
      'Annual collection and distribution of educational materials to under-resourced students.',
    donationTag: '$50 equips a student for the year',
  },
  {
    image: '/assets/program-garden.jpg',
    title: 'Community Gardens',
    description:
      'Transforming vacant lots into green spaces that feed and beautify our neighborhood.',
    donationTag: '$30 plants a community tree',
  },
  {
    image: '/assets/program-cleanup.jpg',
    title: 'Neighborhood Cleanup',
    description:
      'Regular cleanup events keeping our parks, streets, and public spaces clean and beautiful.',
    donationTag: '$20 sponsors cleanup supplies',
  },
  {
    image: '/assets/program-mentorship.jpg',
    title: 'Youth Mentorship',
    description:
      'Pairing caring adult mentors with local students for academic and personal growth.',
    donationTag: '$100 funds a month of mentoring',
  },
  {
    image: '/assets/program-senior.jpg',
    title: 'Senior Support',
    description:
      'Companionship and assistance programs for elderly community members living alone.',
    donationTag: '$40 provides a care package',
  },
];

export function ProgramsSection() {
  const headingRef = useScrollEntrance<HTMLDivElement>({ delay: 0.2 });
  const gridRef = useScrollEntrance<HTMLDivElement>({
    childSelector: '.program-card',
    stagger: 0.1,
    delay: 0.3,
  });

  return (
    <section
      id="programs"
      className="bg-warm-cream py-16 md:py-20 lg:py-[120px]"
    >
      <div className="max-w-[1200px] mx-auto px-6 md:px-10">
        {/* Heading */}
        <div ref={headingRef} className="text-center mb-12">
          <SectionLabel text="OUR PROGRAMS" />
          <h2 className="font-display text-3xl md:text-4xl font-medium text-soft-charcoal">
            Ways to Get Involved
          </h2>
        </div>

        {/* Desktop Grid */}
        <div
          ref={gridRef}
          className="hidden md:grid grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {programs.map((program) => (
            <div key={program.title} className="program-card">
              <ProgramCard
                image={program.image}
                title={program.title}
                description={program.description}
                donationTag={program.donationTag}
              />
            </div>
          ))}
        </div>

        {/* Mobile Horizontal Scroll */}
        <div className="md:hidden flex gap-4 overflow-x-auto snap-x snap-mandatory pb-4 -mx-6 px-6 scrollbar-hide">
          {programs.map((program) => (
            <ProgramCard
              key={program.title}
              image={program.image}
              title={program.title}
              description={program.description}
              donationTag={program.donationTag}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
