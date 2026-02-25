
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { BookOpen } from 'lucide-react';

const Projects = () => {
  return (
    <section id="projets" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-playfair font-bold text-elegant-800 mb-6">
              Projets & Réalisations
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-elegant-400 to-rose-400 mx-auto"></div>
          </div>

          {/* Livres */}
          <Card className="hover:shadow-xl transition-shadow duration-300 border-elegant-200">
            <CardHeader className="pb-4">
              <div className="flex items-center space-x-3 mb-4">
                <BookOpen className="w-8 h-8 text-rose-600" />
                <Badge variant="secondary" className="bg-rose-100 text-rose-800">
                  Littérature
                </Badge>
              </div>
              <CardTitle className="text-2xl font-playfair text-elegant-800">
                📚 Livres
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center p-4 bg-gradient-elegant rounded-lg">
                  <h4 className="font-playfair font-semibold text-elegant-800 mb-2">
                    L'erreur de la femme ou Mère indigne
                  </h4>
                  <Badge className="bg-elegant-600 text-white">Publié</Badge>
                </div>
                <div className="text-center p-4 bg-gradient-rose rounded-lg">
                  <h4 className="font-playfair font-semibold text-elegant-800 mb-2">
                    Toujours à l'église mais jamais avec Dieu
                  </h4>
                  <Badge className="bg-rose-600 text-white">Publié</Badge>
                </div>
                <div className="text-center p-4 bg-gradient-coral rounded-lg">
                  <h4 className="font-playfair font-semibold text-elegant-800 mb-2">
                    Es-tu en couple avec toi-même ?
                  </h4>
                  <Badge variant="outline" className="border-coral-600 text-coral-700">En préparation</Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default Projects;
