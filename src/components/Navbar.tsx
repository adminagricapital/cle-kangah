
import React, { useState, useEffect, useRef } from 'react';
import { Menu, X, Scissors, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link, useLocation } from 'react-router-dom';

interface NavGroup {
  label: string;
  items: { href: string; label: string }[];
}

interface NavItem {
  href: string;
  label: string;
}

type NavEntry = NavItem | NavGroup;

const isGroup = (entry: NavEntry): entry is NavGroup => 'items' in entry;

const navEntries: NavEntry[] = [
  { href: '/#accueil', label: 'Accueil' },
  { href: '/#apropos', label: 'À propos' },
  {
    label: 'Nos Créations',
    items: [
      { href: '/atelier', label: 'Atelier CK Couture' },
      { href: '/boutique', label: 'Boutique en ligne' },
      { href: '/commander', label: 'Commander sur mesure' },
    ],
  },
  {
    label: 'Ressources',
    items: [
      { href: '/services', label: 'Nos Services' },
      { href: '/blog', label: 'Blog & Actualités' },
      { href: '/temoignages', label: 'Avis Clients' },
    ],
  },
  { href: '/#contact', label: 'Contact' },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [openMobileGroup, setOpenMobileGroup] = useState<string | null>(null);
  const location = useLocation();
  const dropdownTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
    setOpenDropdown(null);
    setOpenMobileGroup(null);
  }, [location]);

  const handleClick = (href: string) => {
    setIsOpen(false);
    setOpenDropdown(null);
    if (href.startsWith('/#')) {
      const id = href.slice(2);
      if (location.pathname === '/') {
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
      } else {
        window.location.href = href;
      }
    }
  };

  const handleMouseEnter = (label: string) => {
    if (dropdownTimeout.current) clearTimeout(dropdownTimeout.current);
    setOpenDropdown(label);
  };

  const handleMouseLeave = () => {
    dropdownTimeout.current = setTimeout(() => setOpenDropdown(null), 200);
  };

  const renderLink = (item: NavItem, className: string, onClick?: () => void) =>
    item.href.startsWith('/#') ? (
      <a
        key={item.href}
        href={item.href}
        onClick={(e) => {
          e.preventDefault();
          handleClick(item.href);
          onClick?.();
        }}
        className={className}
      >
        {item.label}
      </a>
    ) : (
      <Link
        key={item.href}
        to={item.href}
        className={`${className} ${location.pathname === item.href ? '!text-elegant-600' : ''}`}
        onClick={onClick}
      >
        {item.label}
      </Link>
    );

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-background/95 backdrop-blur-md shadow-lg' : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center space-x-2">
            <Scissors className="w-6 h-6 text-elegant-600" />
            <span className="font-playfair font-bold text-xl text-elegant-800">Clémence KANGAH</span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden lg:flex items-center space-x-1">
            {navEntries.map((entry) =>
              isGroup(entry) ? (
                <div
                  key={entry.label}
                  className="relative"
                  onMouseEnter={() => handleMouseEnter(entry.label)}
                  onMouseLeave={handleMouseLeave}
                >
                  <button
                    className="flex items-center gap-1 px-3 py-2 text-sm font-medium text-foreground/80 hover:text-elegant-600 transition-colors rounded-md"
                    onClick={() => setOpenDropdown(openDropdown === entry.label ? null : entry.label)}
                  >
                    {entry.label}
                    <ChevronDown
                      className={`w-3.5 h-3.5 transition-transform duration-200 ${
                        openDropdown === entry.label ? 'rotate-180' : ''
                      }`}
                    />
                  </button>
                  {openDropdown === entry.label && (
                    <div className="absolute top-full left-0 mt-1 w-52 bg-background border border-border rounded-xl shadow-xl py-2 animate-in fade-in-0 zoom-in-95 duration-150">
                      {entry.items.map((sub) =>
                        renderLink(
                          sub,
                          'block px-4 py-2.5 text-sm text-foreground/80 hover:text-elegant-600 hover:bg-muted transition-colors'
                        )
                      )}
                    </div>
                  )}
                </div>
              ) : (
                renderLink(
                  entry,
                  'px-3 py-2 text-sm font-medium text-foreground/80 hover:text-elegant-600 transition-colors rounded-md'
                )
              )
            )}
          </div>

          <Button variant="ghost" size="sm" className="lg:hidden" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </Button>
        </div>

        {/* Mobile nav */}
        {isOpen && (
          <div className="lg:hidden bg-background/95 backdrop-blur-md border-t border-border">
            <div className="py-3 space-y-1">
              {navEntries.map((entry) =>
                isGroup(entry) ? (
                  <div key={entry.label}>
                    <button
                      className="flex items-center justify-between w-full px-4 py-2.5 text-foreground/80 hover:text-elegant-600 font-medium text-sm"
                      onClick={() =>
                        setOpenMobileGroup(openMobileGroup === entry.label ? null : entry.label)
                      }
                    >
                      {entry.label}
                      <ChevronDown
                        className={`w-4 h-4 transition-transform duration-200 ${
                          openMobileGroup === entry.label ? 'rotate-180' : ''
                        }`}
                      />
                    </button>
                    {openMobileGroup === entry.label && (
                      <div className="pl-6 space-y-1 pb-1">
                        {entry.items.map((sub) =>
                          renderLink(
                            sub,
                            'block px-4 py-2 text-sm text-foreground/70 hover:text-elegant-600 hover:bg-muted/50 rounded-md transition-colors',
                            () => setIsOpen(false)
                          )
                        )}
                      </div>
                    )}
                  </div>
                ) : (
                  renderLink(
                    entry,
                    'block px-4 py-2.5 text-foreground/80 hover:text-elegant-600 hover:bg-muted/50 transition-colors text-sm font-medium',
                    () => setIsOpen(false)
                  )
                )
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
