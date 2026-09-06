import { TextLink } from './TextLink';

interface MissionCardProps {
  image: string;
  title: string;
  description: string;
  linkText?: string;
}

export function MissionCard({
  image,
  title,
  description,
  linkText = 'Learn More',
}: MissionCardProps) {
  return (
    <div className="group bg-light-beige rounded-2xl overflow-hidden transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-card">
      <div className="aspect-[4/3] overflow-hidden">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-400 ease-out group-hover:scale-[1.03]"
        />
      </div>
      <div className="p-6">
        <h3 className="font-display text-2xl font-normal text-soft-charcoal mb-3">
          {title}
        </h3>
        <p className="font-body text-base text-muted-brown leading-relaxed mb-4">
          {description}
        </p>
        <TextLink>{linkText}</TextLink>
      </div>
    </div>
  );
}
