
import React from 'react';
import { Card } from '@/components/ui/card';

const Gallery = () => {
  const galleryItems = [
    {
      src: "/lovable-uploads/13cde68b-dd54-400c-a5d5-5026d97be25f.png",
      alt: "Clémence dans son atelier de couture",
      category: "Atelier"
    },
    {
      src: "/lovable-uploads/49d38ade-0757-4d81-8f11-59ea32e1eb40.png",
      alt: "Robe africaine traditionnelle",
      category: "Création"
    },
    {
      src: "/lovable-uploads/1ec4f64b-7df4-431f-ad06-84c9514b9b63.png",
      alt: "Tenue masculine élégante",
      category: "Mode Homme"
    },
    {
      src: "/lovable-uploads/64eae6be-7f6f-4eed-9c39-a9fd86f82625.png",
      alt: "Ensemble traditionnel sur mannequin",
      category: "Collection"
    },
    {
      src: "/lovable-uploads/8ce7ab53-38fb-48f3-902a-a0605bd1a57e.png",
      alt: "Tissus et catalogue de modèles",
      category: "Inspiration"
    },
    {
      src: "/lovable-uploads/90fe56aa-7a10-4972-9338-6799ce653bad.png",
      alt: "Formation et transmission",
      category: "Formation"
    },
    {
      src: "/lovable-uploads/1422dda0-46e1-4688-8710-210a30812e0e.png",
      alt: "Clémence en tenue décontractée",
      category: "Portrait"
    },
    {
      src: "/lovable-uploads/45860e4d-8943-431c-be8e-1f550853ad8d.png",
      alt: "Création de masques et accessoires",
      category: "Accessoires"
    },
    {
      src: "/lovable-uploads/9c80126b-39f7-49cd-9ac4-4e9f36c7a3e5.png",
      alt: "Projet agricole - plants de palmier",
      category: "Agriculture"
    }
  ];

  return (
    <section id="galerie" className="py-12 md:py-20 bg-gradient-elegant">
      <div className="container mx-auto px-4">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-playfair font-bold text-elegant-800 mb-4 md:mb-6">
              Galerie
            </h2>
            <div className="w-20 md:w-24 h-1 bg-gradient-to-r from-elegant-400 to-rose-400 mx-auto mb-4 md:mb-6"></div>
            <p className="text-lg md:text-xl text-gray-700 max-w-3xl mx-auto px-4">
              Un aperçu de mes réalisations, projets et moments marquants
            </p>
          </div>

          {/* Gallery Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {galleryItems.map((item, index) => (
              <Card 
                key={index} 
                className="group overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1 md:hover:-translate-y-2 border-0"
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
