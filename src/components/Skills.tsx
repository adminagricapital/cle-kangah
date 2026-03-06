
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import skillCouture from '@/assets/skill-couture-mesure.jpg';
import skillStylisme from '@/assets/skill-stylisme.jpg';
import skillEvenementiel from '@/assets/skill-evenementiel.jpg';
import skillBroderie from '@/assets/skill-broderie.jpg';
import skillEcriture from '@/assets/skill-ecriture.jpg';
import skillFormation from '@/assets/skill-formation.jpg';

const Skills = () => {
  const skills = [
    {
      image: skillCouture,
      title: "Couture sur mesure",
      description: "Dame, Homme, Enfants — robes, costumes, boubous, tenues de cérémonie",
    },
    {
      image: skillStylisme,
      title: "Stylisme & Modélisme",
      description: "Création de modèles, design de motifs, conseils en image",
    },
    {
      image: skillEvenementiel,
      title: "Habillement événementiel",
      description: "Mariages, défilés de mode, concours de beauté, chorales",
    },
    {
      image: skillBroderie,
      title: "Broderie & Finitions",
      description: "Broderie traditionnelle, surfilage, retouches, pressing",
    },
    {
      image: skillEcriture,
      title: "Écriture & Transmission",
      description: "Livres introspectifs, spirituels et sociaux",
    },
    {
      image: skillFormation,
      title: "Formation & Mentorat",
      description: "Apprentissage couture, ateliers communautaires, leadership féminin",
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
            {skills.map((skill, index) => (
              <Card 
                key={index} 
                className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-2 bg-white/80 backdrop-blur-sm border-0 overflow-hidden"
              >
                <div className="relative h-52 overflow-hidden">
                  <img 
                    src={skill.image} 
                    alt={skill.title} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                </div>
                <CardContent className="p-6 text-center">
                  <h3 className="font-playfair font-semibold text-xl text-foreground mb-3">
                    {skill.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {skill.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;
