
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Heart, Users, BookOpen, Target } from 'lucide-react';

const About = () => {
  return (
    <section id="apropos" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-playfair font-bold text-elegant-800 mb-6">
              À propos de moi
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-elegant-400 to-rose-400 mx-auto"></div>
          </div>

          {/* Main Content */}
          <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
            {/* Text Content */}
            <div className="space-y-6">
              <p className="text-lg leading-relaxed text-gray-700">
                Je suis née avec des aiguilles entre les mains, mais mon rêve va bien au-delà du tissu. 
                Je m'appelle <span className="font-semibold text-elegant-700">Clémence KANGAH</span>. 
                Mon parcours est fait de couture, de transmission, de leadership féminin et de foi.
              </p>
              
              <p className="text-lg leading-relaxed text-gray-700">
                Formée dans la couture traditionnelle et contemporaine, j'ai élargi ma mission vers 
                l'accompagnement social, la formation, la gestion de projets communautaires et l'écriture.
              </p>
              
              <p className="text-lg leading-relaxed text-gray-700">
                Chaque action que je pose est guidée par un fil invisible : la volonté de guérir, 
                de construire, d'éveiller.
              </p>
              
              <p className="text-lg leading-relaxed text-elegant-700 font-semibold">
                Aujourd'hui, je m'engage à bâtir, à tisser des ponts entre les âmes, à laisser une 
                trace utile, féminine et durable.
              </p>
            </div>

            {/* Profile Image */}
            <div className="relative">
              <div className="relative overflow-hidden rounded-2xl shadow-2xl">
                <img 
                  src="/lovable-uploads/fac15059-22a8-44a1-8a93-e841d8edee86.png"
                  alt="Clémence KANGAH"
                  className="w-full h-96 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-elegant-900/20 to-transparent"></div>
              </div>
              
              {/* Floating elements */}
              <div className="absolute -top-4 -right-4 w-8 h-8 bg-rose-400 rounded-full animate-float"></div>
              <div className="absolute -bottom-4 -left-4 w-6 h-6 bg-elegant-400 rounded-full animate-float" style={{ animationDelay: '1s' }}></div>
            </div>
          </div>

          {/* Values Cards */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="text-center hover:shadow-lg transition-shadow duration-300 border-elegant-200">
              <CardContent className="p-6">
                <Heart className="w-12 h-12 text-rose-500 mx-auto mb-4" />
                <h3 className="font-playfair font-semibold text-xl text-gray-800 mb-2">Foi</h3>
                <p className="text-gray-600">Guidée par mes valeurs spirituelles</p>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow duration-300 border-elegant-200">
              <CardContent className="p-6">
                <Users className="w-12 h-12 text-elegant-500 mx-auto mb-4" />
                <h3 className="font-playfair font-semibold text-xl text-gray-800 mb-2">Communauté</h3>
                <p className="text-gray-600">Tisser des liens et créer du lien social</p>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow duration-300 border-elegant-200">
              <CardContent className="p-6">
                <BookOpen className="w-12 h-12 text-coral-500 mx-auto mb-4" />
                <h3 className="font-playfair font-semibold text-xl text-gray-800 mb-2">Transmission</h3>
                <p className="text-gray-600">Partager mes connaissances et expériences</p>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow duration-300 border-elegant-200">
              <CardContent className="p-6">
                <Target className="w-12 h-12 text-rose-500 mx-auto mb-4" />
                <h3 className="font-playfair font-semibold text-xl text-gray-800 mb-2">Impact</h3>
                <p className="text-gray-600">Laisser une trace positive et durable</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
