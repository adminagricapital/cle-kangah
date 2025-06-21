
import React from 'react';
import { Sparkles, Heart, Target, Shield } from 'lucide-react';

const ValuFam = () => {
  return (
    <section id="valufam" className="py-20 bg-gradient-rose">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-playfair font-bold text-elegant-800 mb-6">
              ValuFam – Valeurs Féminines
            </h2>
            <div className="max-w-3xl mx-auto">
              <blockquote className="text-2xl md:text-3xl font-playfair italic text-rose-700 mb-6">
                &quot;En marche vers l&apos;image d&apos;Abigaïl&quot;
              </blockquote>
              <p className="text-lg text-gray-700 leading-relaxed">
                ValuFam est une démarche, un choix de vie. Inspirée par Abigaïl, femme biblique de sagesse, 
                de stratégie et de foi, j&apos;incarne une féminité forte, paisible et agissante.
              </p>
            </div>
          </div>

          {/* Values Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            <div className="text-center group">
              <div className="w-16 h-16 bg-rose-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-rose-200 transition-colors">
                <Heart className="w-8 h-8 text-rose-600" />
              </div>
              <h3 className="font-playfair font-semibold text-xl text-elegant-800 mb-2">
                Oser se connaître
              </h3>
              <p className="text-gray-600">
                et se respecter
              </p>
            </div>

            <div className="text-center group">
              <div className="w-16 h-16 bg-elegant-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-elegant-200 transition-colors">
                <Shield className="w-8 h-8 text-elegant-600" />
              </div>
              <h3 className="font-playfair font-semibold text-xl text-elegant-800 mb-2">
                Servir sans
              </h3>
              <p className="text-gray-600">
                s&apos;effacer
              </p>
            </div>

            <div className="text-center group">
              <div className="w-16 h-16 bg-coral-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-coral-200 transition-colors">
                <Target className="w-8 h-8 text-coral-600" />
              </div>
              <h3 className="font-playfair font-semibold text-xl text-elegant-800 mb-2">
                Bâtir avec
              </h3>
              <p className="text-gray-600">
                amour et vérité
              </p>
            </div>

            <div className="text-center group">
              <div className="w-16 h-16 bg-rose-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-rose-200 transition-colors">
                <Sparkles className="w-8 h-8 text-rose-600" />
              </div>
              <h3 className="font-playfair font-semibold text-xl text-elegant-800 mb-2">
                Guérir sans
              </h3>
              <p className="text-gray-600">
                blâmer
              </p>
            </div>
          </div>

          {/* Bottom Message */}
          <div className="text-center">
            <div className="max-w-4xl mx-auto">
              <p className="text-xl text-gray-700 leading-relaxed mb-6">
                ValuFam est le chemin de la femme-réparation, de la femme-impact. 
                Ce site est l&apos;écho de ce message.
              </p>
              <div className="w-24 h-1 bg-rose-300 mx-auto"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ValuFam;
