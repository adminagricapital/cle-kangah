
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Crown, Heart, Building, Heal } from 'lucide-react';

const ValuFam = () => {
  const values = [
    {
      icon: Crown,
      title: "Oser se connaître et se respecter",
      description: "La connaissance de soi est le premier pas vers l'authenticité et le respect de sa propre valeur."
    },
    {
      icon: Heart,
      title: "Servir sans s'effacer",
      description: "Donner aux autres tout en préservant son identité et sa dignité personnelle."
    },
    {
      icon: Building,
      title: "Bâtir avec amour et vérité",
      description: "Construire des relations et des projets sur des fondations solides d'amour et d'honnêteté."
    },
    {
      icon: Heal,
      title: "Guérir sans blâmer",
      description: "Apporter la guérison et la restauration sans porter de jugement ni de reproches."
    }
  ];

  return (
    <section id="valufam" className="py-20 bg-gradient-rose">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-playfair font-bold text-elegant-800 mb-4">
              ValuFam – Valeurs Féminines
            </h2>
            <p className="text-2xl font-playfair font-medium text-rose-700 mb-6 italic">
              > En marche vers l'image d'Abigaïl
            </p>
            <div className="w-24 h-1 bg-gradient-to-r from-elegant-400 to-rose-400 mx-auto"></div>
          </div>

          {/* Introduction */}
          <div className="max-w-4xl mx-auto mb-16">
            <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-lg">
              <CardContent className="p-8 lg:p-12">
                <p className="text-lg leading-relaxed text-gray-700 mb-6">
                  <strong>ValuFam</strong> est une démarche, un choix de vie. Inspirée par Abigaïl, 
                  femme biblique de sagesse, de stratégie et de foi, j'incarne une féminité forte, 
                  paisible et agissante.
                </p>
                
                <p className="text-lg leading-relaxed text-gray-700 mb-6">
                  <strong>ValuFam</strong> est le chemin de la femme-réparation, de la femme-impact. 
                  Ce site est l'écho de ce message.
                </p>

                <p className="text-xl font-playfair font-medium text-elegant-700 text-center">
                  Être une femme de valeurs, c'est :
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Values Grid */}
          <div className="grid md:grid-cols-2 gap-8">
            {values.map((value, index) => {
              const IconComponent = value.icon;
              return (
                <Card 
                  key={index} 
                  className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-2 bg-white/90 backdrop-blur-sm border-0"
                >
                  <CardContent className="p-8">
                    <div className="flex items-start space-x-4">
                      <div className="flex-shrink-0">
                        <IconComponent className="w-12 h-12 text-rose-600 group-hover:scale-110 transition-transform duration-300" />
                      </div>
                      <div>
                        <h3 className="font-playfair font-semibold text-xl text-elegant-800 mb-3">
                          {value.title}
                        </h3>
                        <p className="text-gray-700 leading-relaxed">
                          {value.description}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Quote */}
          <div className="text-center mt-16">
            <Card className="max-w-3xl mx-auto bg-white/90 backdrop-blur-sm border-0 shadow-lg">
              <CardContent className="p-8">
                <blockquote className="text-xl font-playfair font-medium text-elegant-800 italic leading-relaxed">
                  "ValuFam est le chemin de la femme-réparation, de la femme-impact. 
                  Ce site est l'écho de ce message."
                </blockquote>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ValuFam;
