
import React from 'react';
import { Heart, Scissors } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-elegant-900 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            {/* Brand */}
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Scissors className="w-6 h-6 text-elegant-300" />
                <span className="font-playfair font-bold text-xl">Clémence KANGAH</span>
              </div>
              <p className="text-elegant-300 leading-relaxed">
                Nouvelle Trace Féminine – À la couture de l'être et à l'ouvrage du monde
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="font-playfair font-semibold text-lg mb-4">Navigation rapide</h3>
              <ul className="space-y-2 text-elegant-300">
                <li><a href="#accueil" className="hover:text-white transition-colors">Accueil</a></li>
                <li><a href="#apropos" className="hover:text-white transition-colors">À propos</a></li>
                <li><a href="#ouvrages" className="hover:text-white transition-colors">Mes Ouvrages</a></li>
                <li><a href="#valufam" className="hover:text-white transition-colors">ValuFam</a></li>
                <li><a href="#contact" className="hover:text-white transition-colors">Contact</a></li>
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <h3 className="font-playfair font-semibold text-lg mb-4">Contact</h3>
              <div className="space-y-2 text-elegant-300">
                <p>+225 07 79 99 78 73</p>
                <p>innocentkoffi1@gmail.com</p>
                <p>Daloa, Haut-Sassandra</p>
                <p>Côte d'Ivoire</p>
              </div>
            </div>
          </div>

          {/* Divider */}
          <div className="border-t border-elegant-700 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <p className="text-elegant-300 text-sm">
                © 2026 Clémence KANGAH. Tous droits réservés. | <a href="/mentions-legales" className="hover:text-white underline">Mentions légales</a>
              </p>
              <p className="text-elegant-300 text-sm flex items-center">
                Créé avec <Heart className="w-4 h-4 text-rose-400 mx-1" /> et passion
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
