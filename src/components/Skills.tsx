
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Scissors, Palette, Users, Smartphone, BookOpen, MessageCircle } from 'lucide-react';

const Skills = () => {
  const skills = [
    {
      icon: Scissors,
      title: "Couture sur mesure",
      description: "Modèles traditionnels et modernes",
      color: "text-elegant-600"
    },
    {
      icon: Palette,
      title: "Création textile",
      description: "Design d'identité visuelle",
      color: "text-rose-600"
    },
    {
      icon: Users,
      title: "Coordination de projets",
      description: "Projets agricoles et sociaux",
      color: "text-coral-600"
    },
    {
      icon: Smartphone,
      title: "Solutions digitales",
      description: "BizControl, MoTiMô",
      color: "text-elegant-600"
    },
    {
      icon: BookOpen,
      title: "Rédaction",
      description: "Livres introspectifs, sociaux et spirituels",
      color: "text-rose-600"
    },
    {
      icon: MessageCircle,
      title: "Animation",
      description: "Groupes communautaires et ateliers",
      color: "text-coral-600"
    }
  ];

  return (
    <section id="savoir-faire" className="py-20 bg-gradient-rose">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-playfair font-bold text-elegant-800 mb-6">
              Savoir-faire
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-elegant-400 to-rose-400 mx-auto mb-6"></div>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto">
              Ma force ? Transformer une idée en action, un besoin en solution, une blessure en victoire.
            </p>
          </div>

          {/* Skills Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
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
                    <h3 className="font-playfair font-semibold text-xl text-gray-800 mb-3">
                      {skill.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      {skill.description}
                    </p>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Quote */}
          <div className="text-center">
            <Card className="max-w-2xl mx-auto bg-white/90 backdrop-blur-sm border-0 shadow-lg">
              <CardContent className="p-8">
                <blockquote className="text-xl font-playfair font-medium text-elegant-800 italic leading-relaxed">
                  "Ma force ? Transformer une idée en action, un besoin en solution, une blessure en victoire."
                </blockquote>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;
