interface ProgramCardProps {
  image: string;
  title: string;
  description: string;
  donationTag: string;
}

export function ProgramCard({
  image,
  title,
  description,
  donationTag,
}: ProgramCardProps) {
  return (
    <div className="group bg-light-beige rounded-2xl overflow-hidden transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-card min-w-[280px] md:min-w-0 flex-shrink-0 snap-start">
      <div className="aspect-[4/3] overflow-hidden">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-400 ease-out group-hover:scale-[1.03]"
          loading="lazy"
        />
      </div>
      <div className="p-6">
        <h3 className="font-display text-2xl font-normal text-soft-charcoal mb-2">
          {title}
        </h3>
        <p className="font-body text-base text-muted-brown leading-relaxed mb-4">
          {description}
        </p>
        <span className="inline-block px-3 py-1 rounded-full bg-sage-green/15 text-sage-green font-body text-xs font-medium uppercase mb-3">
          {donationTag}
        </span>
        <div>
          <a
            href="/donate"
            className="font-body text-sm font-medium uppercase text-terracotta hover:underline underline-offset-4"
          >
            Donate
          </a>
        </div>
      </div>
    </div>
  );
}
