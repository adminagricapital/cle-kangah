
import React, { useState, useEffect } from 'react';
import { Menu, X, Scissors } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { href: '/#accueil', label: 'Accueil' },
    { href: '/#apropos', label: 'À propos' },
    { href: '/atelier', label: 'CK Couture' },
    { href: '/services', label: 'Services' },
    { href: '/#ouvrages', label: 'Mes Ouvrages' },
    { href: '/commander', label: 'Commander' },
    { href: '/blog', label: 'Blog' },
    { href: '/#contact', label: 'Contact' },
  ];

  const handleClick = (href: string) => {
    setIsOpen(false);
    if (href.startsWith('/#')) {
      const id = href.slice(2);
      if (location.pathname === '/') {
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
      } else {
        window.location.href = href;
      }
    }
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled ? 'bg-white/95 backdrop-blur-md shadow-lg' : 'bg-transparent'
    }`}>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center space-x-2">
            <Scissors className="w-6 h-6 text-elegant-600" />
            <span className="font-playfair font-bold text-xl text-elegant-800">
              Clémence KANGAH
            </span>
          </Link>

          <div className="hidden lg:flex space-x-6">
            {navItems.map((item) => (
              item.href.startsWith('/#') ? (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={(e) => { e.preventDefault(); handleClick(item.href); }}
                  className="text-gray-700 hover:text-elegant-600 transition-colors duration-200 font-medium text-sm"
                >
                  {item.label}
                </a>
              ) : (
                <Link
                  key={item.href}
                  to={item.href}
                  className={`transition-colors duration-200 font-medium text-sm ${
                    location.pathname === item.href ? 'text-elegant-600' : 'text-gray-700 hover:text-elegant-600'
                  }`}
                >
                  {item.label}
                </Link>
              )
            ))}
          </div>

          <Button
            variant="ghost"
            size="sm"
            className="lg:hidden"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </Button>
        </div>

        {isOpen && (
          <div className="lg:hidden bg-white/95 backdrop-blur-md border-t border-gray-200">
            <div className="py-4 space-y-2">
              {navItems.map((item) => (
                item.href.startsWith('/#') ? (
                  <a
                    key={item.href}
                    href={item.href}
                    className="block px-4 py-2 text-gray-700 hover:text-elegant-600 hover:bg-elegant-50 transition-colors duration-200"
                    onClick={(e) => { e.preventDefault(); handleClick(item.href); }}
                  >
                    {item.label}
                  </a>
                ) : (
                  <Link
                    key={item.href}
                    to={item.href}
                    className="block px-4 py-2 text-gray-700 hover:text-elegant-600 hover:bg-elegant-50 transition-colors duration-200"
                    onClick={() => setIsOpen(false)}
                  >
                    {item.label}
                  </Link>
                )
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
