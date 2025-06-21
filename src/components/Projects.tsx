
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Sprout, Smartphone, BookOpen, MapPin, Calendar, Users } from 'lucide-react';

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

          <div className="grid lg:grid-cols-2 gap-8 mb-12">
            {/* Projet ACPH-GRP */}
            <Card className="hover:shadow-xl transition-shadow duration-300 border-elegant-200">
              <CardHeader className="pb-4">
                <div className="flex items-center space-x-3 mb-4">
                  <Sprout className="w-8 h-8 text-green-600" />
                  <Badge variant="secondary" className="bg-green-100 text-green-800">
                    Agriculture
                  </Badge>
                </div>
                <CardTitle className="text-2xl font-playfair text-elegant-800">
                  🌿 Projet ACPH-GRP
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 leading-relaxed mb-4">
                  Relance durable de la culture du palmier à huile à Gonaté. 200 hectares en bail 
                  communautaire avec les propriétaires terriens.
                </p>
                <div className="space-y-2 mb-4">
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <MapPin className="w-4 h-4" />
                    <span>Gonaté, Côte d'Ivoire</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <Users className="w-4 h-4" />
                    <span>Autonomisation des producteurs</span>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="outline" className="text-green-700 border-green-300">200 hectares</Badge>
                  <Badge variant="outline" className="text-green-700 border-green-300">Gestion associative</Badge>
                  <Badge variant="outline" className="text-green-700 border-green-300">Impact local</Badge>
                </div>
              </CardContent>
            </Card>

            {/* Applications digitales */}
            <Card className="hover:shadow-xl transition-shadow duration-300 border-elegant-200">
              <CardHeader className="pb-4">
                <div className="flex items-center space-x-3 mb-4">
                  <Smartphone className="w-8 h-8 text-blue-600" />
                  <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                    Digital
                  </Badge>
                </div>
                <CardTitle className="text-2xl font-playfair text-elegant-800">
                  📅 Applications digitales
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div>
                    <h4 className="font-semibold text-elegant-700 mb-2">BizControl Express</h4>
                    <p className="text-gray-600 text-sm">
                      Outil de gestion journalisée pour petits entrepreneurs
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-elegant-700 mb-2">MoTiMô</h4>
                    <p className="text-gray-600 text-sm">
                      Assistant financier connecté au Mobile Money
                    </p>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2 mt-4">
                  <Badge variant="outline" className="text-blue-700 border-blue-300">Entrepreneuriat</Badge>
                  <Badge variant="outline" className="text-blue-700 border-blue-300">Mobile Money</Badge>
                  <Badge variant="outline" className="text-blue-700 border-blue-300">Innovation</Badge>
                </div>
              </CardContent>
            </Card>
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
