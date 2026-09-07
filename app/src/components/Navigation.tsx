import { useState, useEffect } from "react";
import { Heart, Menu, X } from "lucide-react";
import { PrimaryButton } from "./PrimaryButton";

const navLinks = [
  { label: "Programs", href: "#programs" },
  { label: "Our Impact", href: "#story" },
  { label: "About", href: "#about" },
  { label: "Giving Preferences", href: "/donate" },
];

export function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string,
  ) => {
    if (!href.startsWith("#")) return;
    e.preventDefault();
    setMobileOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-[1000] h-[72px] flex items-center transition-all duration-300 ${
        scrolled
          ? "bg-warm-white/85 backdrop-blur-md shadow-[0_1px_0_rgba(45,42,38,0.06)]"
          : "bg-warm-white border-b border-border-beige"
      }`}
    >
      <div className="w-full max-w-[1200px] mx-auto px-6 md:px-10 flex items-center justify-between">
        {/* Logo */}
        <a href="#" className="flex items-center gap-2">
          <Heart className="w-5 h-5 text-terracotta fill-terracotta" />
          <span className="font-display text-xl font-semibold text-soft-charcoal">
            The Helping Hand
          </span>
        </a>

        {/* Desktop Nav Links */}
        <div className="hidden md:flex items-center gap-10">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={(e) => handleNavClick(e, link.href)}
              className="font-body text-sm font-medium text-muted-brown hover:text-terracotta transition-colors duration-300"
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* Desktop CTA */}
        <div className="hidden md:block">
          <PrimaryButton href="#donate">Donate Now</PrimaryButton>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden p-2 text-soft-charcoal"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? (
            <X className="w-6 h-6" />
          ) : (
            <Menu className="w-6 h-6" />
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden absolute top-[72px] left-0 right-0 bg-warm-white border-b border-border-beige overflow-hidden transition-all duration-300 ${
          mobileOpen ? "max-h-64 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="px-6 py-4 flex flex-col gap-4">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={(e) => handleNavClick(e, link.href)}
              className="font-body text-sm font-medium text-muted-brown hover:text-terracotta transition-colors"
            >
              {link.label}
            </a>
          ))}
          <PrimaryButton href="#donate" className="w-full mt-2">
            Donate Now
          </PrimaryButton>
        </div>
      </div>
    </nav>
  );
}
