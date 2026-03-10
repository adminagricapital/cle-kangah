
import React, { useState, useEffect, useRef } from 'react';
import { Menu, X, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import ckLogo from '@/assets/ck-couture-logo.png';

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
      { href: '/catalogue', label: 'Catalogue Modèles' },
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

const dropdownVariants = {
  hidden: { opacity: 0, y: -8, scale: 0.96 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.2, ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number], staggerChildren: 0.04 },
  },
  exit: {
    opacity: 0,
    y: -6,
    scale: 0.96,
    transition: { duration: 0.15, ease: 'easeIn' as const },
  },
};

const itemVariants = {
  hidden: { opacity: 0, x: -8 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.15 } },
};

const mobileMenuVariants = {
  hidden: { opacity: 0, height: 0 },
  visible: {
    opacity: 1,
    height: 'auto',
    transition: { duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number], staggerChildren: 0.05 },
  },
  exit: { opacity: 0, height: 0, transition: { duration: 0.2, ease: 'easeIn' as const } },
};

const mobileItemVariants = {
  hidden: { opacity: 0, x: -12 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.2 } },
};

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
          <Link to="/" className="flex items-center">
            <img src={ckLogo} alt="CK Couture" className="h-10 w-auto" />
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
                    <motion.span
                      animate={{ rotate: openDropdown === entry.label ? 180 : 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <ChevronDown className="w-3.5 h-3.5" />
                    </motion.span>
                  </button>
                  <AnimatePresence>
                    {openDropdown === entry.label && (
                      <motion.div
                        variants={dropdownVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        className="absolute top-full left-0 mt-1 w-52 bg-background border border-border rounded-xl shadow-xl py-2 overflow-hidden"
                      >
                        {entry.items.map((sub) => (
                          <motion.div key={sub.href} variants={itemVariants}>
                            {renderLink(
                              sub,
                              'block px-4 py-2.5 text-sm text-foreground/80 hover:text-elegant-600 hover:bg-muted transition-colors'
                            )}
                          </motion.div>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
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
            <AnimatePresence mode="wait">
              {isOpen ? (
                <motion.span
                  key="close"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <X className="w-6 h-6" />
                </motion.span>
              ) : (
                <motion.span
                  key="menu"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <Menu className="w-6 h-6" />
                </motion.span>
              )}
            </AnimatePresence>
          </Button>
        </div>

        {/* Mobile nav */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              variants={mobileMenuVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="lg:hidden bg-background/95 backdrop-blur-md border-t border-border overflow-hidden"
            >
              <div className="py-3 space-y-1">
                {navEntries.map((entry) =>
                  isGroup(entry) ? (
                    <motion.div key={entry.label} variants={mobileItemVariants}>
                      <button
                        className="flex items-center justify-between w-full px-4 py-2.5 text-foreground/80 hover:text-elegant-600 font-medium text-sm"
                        onClick={() =>
                          setOpenMobileGroup(openMobileGroup === entry.label ? null : entry.label)
                        }
                      >
                        {entry.label}
                        <motion.span
                          animate={{ rotate: openMobileGroup === entry.label ? 180 : 0 }}
                          transition={{ duration: 0.2 }}
                        >
                          <ChevronDown className="w-4 h-4" />
                        </motion.span>
                      </button>
                      <AnimatePresence>
                        {openMobileGroup === entry.label && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto', transition: { duration: 0.2, staggerChildren: 0.05 } }}
                            exit={{ opacity: 0, height: 0, transition: { duration: 0.15 } }}
                            className="pl-6 space-y-1 pb-1 overflow-hidden"
                          >
                            {entry.items.map((sub) => (
                              <motion.div
                                key={sub.href}
                                initial={{ opacity: 0, x: -8 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.15 }}
                              >
                                {renderLink(
                                  sub,
                                  'block px-4 py-2 text-sm text-foreground/70 hover:text-elegant-600 hover:bg-muted/50 rounded-md transition-colors',
                                  () => setIsOpen(false)
                                )}
                              </motion.div>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  ) : (
                    <motion.div key={(entry as NavItem).href} variants={mobileItemVariants}>
                      {renderLink(
                        entry as NavItem,
                        'block px-4 py-2.5 text-foreground/80 hover:text-elegant-600 hover:bg-muted/50 transition-colors text-sm font-medium',
                        () => setIsOpen(false)
                      )}
                    </motion.div>
                  )
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
};

export default Navbar;
