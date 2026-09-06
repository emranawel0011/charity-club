import { useState } from 'react';
import { Heart, Instagram, Facebook, Twitter } from 'lucide-react';
import { PrimaryButton } from '@/components/PrimaryButton';

const quickLinks = [
  { label: 'About Us', href: '#about' },
  { label: 'Our Programs', href: '#programs' },
  { label: 'Get Involved', href: '#donate' },
  { label: 'Contact', href: '#' },
];

const programLinks = [
  { label: 'Animal Welfare', href: '#programs' },
  { label: 'Education Support', href: '#programs' },
  { label: 'Environmental Care', href: '#programs' },
  { label: 'Senior Support', href: '#programs' },
];

export function Footer() {
  const [email, setEmail] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setEmail('');
  };

  return (
    <footer className="bg-dark-brown pt-16 md:pt-20 pb-10">
      <div className="max-w-[1200px] mx-auto px-6 md:px-10">
        {/* Main Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12 mb-16">
          {/* Logo & Tagline */}
          <div>
            <a href="#" className="flex items-center gap-2 mb-4">
              <Heart className="w-5 h-5 text-terracotta fill-terracotta" />
              <span className="font-display text-lg font-semibold text-warm-white">
                The Helping Hand
              </span>
            </a>
            <p className="font-body text-sm text-warm-white/60 max-w-[240px]">
              Caring for our community since 2015.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-display text-2xl font-normal text-warm-white mb-4">
              Quick Links
            </h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="font-body text-sm text-warm-white/70 hover:text-warm-white transition-colors duration-300"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Programs */}
          <div>
            <h4 className="font-display text-2xl font-normal text-warm-white mb-4">
              Programs
            </h4>
            <ul className="space-y-3">
              {programLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="font-body text-sm text-warm-white/70 hover:text-warm-white transition-colors duration-300"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="font-display text-2xl font-normal text-warm-white mb-4">
              Stay Connected
            </h4>
            <p className="font-body text-sm text-warm-white/60 mb-4">
              Get updates on our events, programs, and impact stories.
            </p>
            <form onSubmit={handleSubmit} className="flex gap-2 mb-6">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email address"
                className="flex-1 min-w-0 bg-dark-brown border border-warm-white/20 rounded-xl px-4 py-3 font-body text-sm text-warm-white placeholder:text-warm-white/40 focus:border-terracotta focus:outline-none transition-colors"
              />
              <PrimaryButton className="px-5 py-3 text-xs">Subscribe</PrimaryButton>
            </form>

            {/* Contact Info */}
            <div className="space-y-1 mb-4">
              <a
                href="mailto:hello@helpinghandcharity.org"
                className="block font-body text-sm text-warm-white/60 hover:text-warm-white transition-colors"
              >
                hello@helpinghandcharity.org
              </a>
              <a
                href="tel:+15551234567"
                className="block font-body text-sm text-warm-white/60 hover:text-warm-white transition-colors"
              >
                (555) 123-4567
              </a>
            </div>

            {/* Social Links */}
            <div className="flex items-center gap-4">
              <a
                href="#"
                className="text-warm-white/50 hover:text-warm-white transition-colors"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="text-warm-white/50 hover:text-warm-white transition-colors"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="text-warm-white/50 hover:text-warm-white transition-colors"
              >
                <Twitter className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-warm-white/10 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="font-body text-xs text-warm-white/40">
            &copy; 2025 The Helping Hand Charity Club. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <a
              href="#"
              className="font-body text-xs text-warm-white/40 hover:text-warm-white/70 transition-colors"
            >
              Privacy Policy
            </a>
            <span className="text-warm-white/20">&bull;</span>
            <a
              href="#"
              className="font-body text-xs text-warm-white/40 hover:text-warm-white/70 transition-colors"
            >
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
