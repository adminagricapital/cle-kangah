
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Scissors, Palette, Users, Crown, BookOpen, Sparkles } from 'lucide-react';

const Skills = () => {
  const skills = [
    {
      icon: Scissors,
      title: "Couture sur mesure",
      description: "Dame, Homme, Enfants — robes, costumes, boubous, tenues de cérémonie",
      color: "text-elegant-600"
    },
    {
      icon: Palette,
      title: "Stylisme & Modélisme",
      description: "Création de modèles, design de motifs, conseils en image",
      color: "text-rose-600"
    },
    {
      icon: Crown,
      title: "Habillement événementiel",
      description: "Mariages, défilés de mode, concours de beauté, chorales",
      color: "text-coral-600"
    },
    {
      icon: Sparkles,
      title: "Broderie & Finitions",
      description: "Broderie traditionnelle, surfilage, retouches, pressing",
      color: "text-elegant-600"
    },
    {
      icon: BookOpen,
      title: "Écriture & Transmission",
      description: "Livres introspectifs, spirituels et sociaux",
      color: "text-rose-600"
    },
    {
      icon: Users,
      title: "Formation & Mentorat",
      description: "Apprentissage couture, ateliers communautaires, leadership féminin",
      color: "text-coral-600"
    }
  ];

  return (
    <section id="savoir-faire" className="py-20 bg-gradient-rose">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-playfair font-bold text-elegant-800 mb-6">
              Savoir-faire
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-elegant-400 to-rose-400 mx-auto mb-6"></div>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              De l'aiguille à la plume, un savoir-faire complet au service de l'élégance et de la transmission
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {skills.map((skill, index) => {
              const IconComponent = skill.icon;
              return (
                <Card 
                  key={index} 
                  className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-2 bg-white/80 backdrop-blur-sm border-0"
                >
                  <CardContent className="p-8 text-center">
                    <div className="mb-6">
                      <IconComponent className={`w-16 h-16 ${skill.color} mx-auto group-hover:scale-110 transition-transform duration-300`} />
                    </div>
                    <h3 className="font-playfair font-semibold text-xl text-foreground mb-3">
                      {skill.title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {skill.description}
                    </p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;
