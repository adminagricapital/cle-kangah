
import React from 'react';
import { Sparkles, Heart, Target, Shield } from 'lucide-react';

const ValuFam = () => {
  return (
    <section id="valufam" className="py-12 md:py-20 bg-gradient-rose">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-playfair font-bold text-elegant-800 mb-4 md:mb-6">
              ValuFam – Valeurs Féminines
            </h2>
            <div className="max-w-4xl mx-auto">
              <blockquote className="text-xl md:text-2xl lg:text-3xl font-playfair italic text-rose-700 mb-4 md:mb-6">
                &quot;En marche vers l&apos;image d&apos;Abigaïl&quot;
              </blockquote>
              <p className="text-base md:text-lg text-gray-700 leading-relaxed px-4">
                ValuFam est une démarche, un choix de vie. Inspirée par Abigaïl, femme biblique de sagesse, 
                de stratégie et de foi, j&apos;incarne une féminité forte, paisible et agissante.
              </p>
            </div>
          </div>

          {/* Values Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 mb-12 md:mb-16">
            <div className="text-center group">
              <div className="w-14 h-14 md:w-16 md:h-16 bg-rose-100 rounded-full flex items-center justify-center mx-auto mb-3 md:mb-4 group-hover:bg-rose-200 transition-colors">
                <Heart className="w-6 h-6 md:w-8 md:h-8 text-rose-600" />
              </div>
              <h3 className="font-playfair font-semibold text-lg md:text-xl text-elegant-800 mb-2">
                Oser se connaître
              </h3>
              <p className="text-sm md:text-base text-gray-600">
                et se respecter
              </p>
            </div>

            <div className="text-center group">
              <div className="w-14 h-14 md:w-16 md:h-16 bg-elegant-100 rounded-full flex items-center justify-center mx-auto mb-3 md:mb-4 group-hover:bg-elegant-200 transition-colors">
                <Shield className="w-6 h-6 md:w-8 md:h-8 text-elegant-600" />
              </div>
              <h3 className="font-playfair font-semibold text-lg md:text-xl text-elegant-800 mb-2">
                Servir sans
              </h3>
              <p className="text-sm md:text-base text-gray-600">
                s&apos;effacer
              </p>
            </div>

            <div className="text-center group">
              <div className="w-14 h-14 md:w-16 md:h-16 bg-coral-100 rounded-full flex items-center justify-center mx-auto mb-3 md:mb-4 group-hover:bg-coral-200 transition-colors">
                <Target className="w-6 h-6 md:w-8 md:h-8 text-coral-600" />
              </div>
              <h3 className="font-playfair font-semibold text-lg md:text-xl text-elegant-800 mb-2">
                Bâtir avec
              </h3>
              <p className="text-sm md:text-base text-gray-600">
                amour et vérité
              </p>
            </div>

            <div className="text-center group">
              <div className="w-14 h-14 md:w-16 md:h-16 bg-rose-100 rounded-full flex items-center justify-center mx-auto mb-3 md:mb-4 group-hover:bg-rose-200 transition-colors">
                <Sparkles className="w-6 h-6 md:w-8 md:h-8 text-rose-600" />
              </div>
              <h3 className="font-playfair font-semibold text-lg md:text-xl text-elegant-800 mb-2">
                Guérir sans
              </h3>
              <p className="text-sm md:text-base text-gray-600">
                blâmer
              </p>
            </div>
          </div>

          {/* Bottom Message */}
          <div className="text-center">
            <div className="max-w-4xl mx-auto px-4">
              <p className="text-lg md:text-xl text-gray-700 leading-relaxed mb-4 md:mb-6">
                ValuFam est le chemin de la femme-réparation, de la femme-impact. 
                Ce site est l&apos;écho de ce message.
              </p>
              <div className="w-20 md:w-24 h-1 bg-rose-300 mx-auto"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ValuFam;
