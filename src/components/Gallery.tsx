
import React from 'react';
import { Card } from '@/components/ui/card';
import robeSoiree from '@/assets/robe-soiree-rouge.jpg';
import fashionShow from '@/assets/fashion-show.jpg';
import choristes from '@/assets/choristes.jpg';
import collectionHomme from '@/assets/collection-homme.jpg';
import collectionEnfants from '@/assets/collection-enfants.jpg';
import atelierEquipe from '@/assets/atelier-equipe-action.jpg';
import tenuePro from '@/assets/tenue-professionnelle.jpg';
import saintValentin from '@/assets/saint-valentin.jpg';
import journeeFemme from '@/assets/journee-femme.jpg';

const Gallery = () => {
  const galleryItems = [
    { src: atelierEquipe, alt: "L'équipe CK Couture en pleine action", category: "Atelier" },
    { src: fashionShow, alt: "Défilé de mode CK Couture", category: "Défilé" },
    { src: robeSoiree, alt: "Robe de soirée élégante", category: "Création" },
    { src: collectionHomme, alt: "Collection homme premium", category: "Homme" },
    { src: choristes, alt: "Tenues de choristes assorties", category: "Groupe" },
    { src: collectionEnfants, alt: "Collection enfants festive", category: "Enfants" },
    { src: tenuePro, alt: "Tenue professionnelle sur mesure", category: "Professionnel" },
    { src: saintValentin, alt: "Collection Saint-Valentin couple", category: "Événement" },
    { src: journeeFemme, alt: "Collection femme tendance", category: "Femme" },
  ];

  return (
    <section id="galerie" className="py-12 md:py-20 bg-gradient-elegant">
      <div className="container mx-auto px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-playfair font-bold text-elegant-800 mb-4 md:mb-6">
              Nos Réalisations
            </h2>
            <div className="w-20 md:w-24 h-1 bg-gradient-to-r from-elegant-400 to-rose-400 mx-auto mb-4 md:mb-6"></div>
            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto px-4">
              Un aperçu de nos créations pour toutes les occasions et tous les styles
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {galleryItems.map((item, index) => (
              <Card 
                key={index} 
                className={`group overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1 md:hover:-translate-y-2 border-0 ${index === 0 ? 'sm:col-span-2 lg:col-span-1' : ''}`}
              >
                <div className="relative overflow-hidden">
                  <img 
                    src={item.src}
                    alt={item.alt}
                    className="w-full h-48 md:h-64 object-cover group-hover:scale-105 md:group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="absolute bottom-3 md:bottom-4 left-3 md:left-4 text-white">
                      <span className="inline-block bg-white/20 backdrop-blur-sm px-2 md:px-3 py-1 rounded-full text-xs md:text-sm font-medium">
                        {item.category}
                      </span>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Gallery;
