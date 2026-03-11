
import React from 'react';
import { Card } from '@/components/ui/card';
import { motion } from 'framer-motion';
import robeSoiree from '@/assets/robe-soiree-rouge.jpg';
import fashionShow from '@/assets/fashion-show.jpg';
import choristes from '@/assets/choristes.jpg';
import collectionHomme from '@/assets/collection-homme.jpg';
import collectionEnfants from '@/assets/collection-enfants.jpg';
import atelierEquipe from '@/assets/atelier-equipe-action.jpg';
import tenuePro from '@/assets/tenue-professionnelle.jpg';
import saintValentin from '@/assets/saint-valentin.jpg';
import journeeFemme from '@/assets/journee-femme.jpg';
import pagneIvoirien from '@/assets/pagne-ivoirien-traditionnel.jpg';
import pagneBaoule from '@/assets/pagne-baoule-kita.jpg';
import pagneKorhogo from '@/assets/pagne-korhogo.jpg';
import pagneWoodin from '@/assets/pagne-woodin-luxe.jpg';
import pagneBazin from '@/assets/pagne-bazin-riche.jpg';
import pagneFaso from '@/assets/pagne-faso-dan-fani.jpg';

const Gallery = () => {
  const galleryItems = [
    { src: atelierEquipe, alt: "L'équipe CK Couture en pleine action", category: "Atelier" },
    { src: fashionShow, alt: "Défilé de mode CK Couture", category: "Défilé" },
    { src: robeSoiree, alt: "Robe de soirée élégante", category: "Création" },
    { src: pagneIvoirien, alt: "Pagne wax traditionnel ivoirien", category: "Pagne Wax" },
    { src: collectionHomme, alt: "Collection homme premium", category: "Homme" },
    { src: pagneBaoule, alt: "Pagne Baoulé Kita tissé main", category: "Pagne Kita" },
    { src: choristes, alt: "Tenues de choristes assorties", category: "Groupe" },
    { src: pagneKorhogo, alt: "Toile de Korhogo peinte Sénoufo", category: "Korhogo" },
    { src: collectionEnfants, alt: "Collection enfants festive", category: "Enfants" },
    { src: pagneWoodin, alt: "Pagne Woodin luxe émeraude et or", category: "Woodin" },
    { src: tenuePro, alt: "Tenue professionnelle sur mesure", category: "Professionnel" },
    { src: pagneBazin, alt: "Bazin riche bordeaux brodé", category: "Bazin" },
    { src: saintValentin, alt: "Collection Saint-Valentin couple", category: "Événement" },
    { src: pagneFaso, alt: "Faso Dan Fani indigo tissé artisanal", category: "Faso Dan Fani" },
    { src: journeeFemme, alt: "Collection femme tendance", category: "Femme" },
  ];

  return (
    <section id="galerie" className="py-12 md:py-20 bg-gradient-elegant">
      <div className="container mx-auto px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="text-center mb-10 md:mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-playfair font-bold text-elegant-800 mb-4 md:mb-6">
              Nos Réalisations & Pagnes Traditionnels
            </h2>
            <div className="w-20 md:w-24 h-1 bg-gradient-to-r from-elegant-400 to-rose-400 mx-auto mb-4 md:mb-6"></div>
            <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto px-2">
              Créations sur mesure et tissus traditionnels ivoiriens authentiques
            </p>
          </motion.div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-3 md:gap-4">
            {galleryItems.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
              >
                <Card className="group overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-0">
                  <div className="relative overflow-hidden">
                    <img 
                      src={item.src}
                      alt={item.alt}
                      loading="lazy"
                      className="w-full h-36 sm:h-44 md:h-52 object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="absolute bottom-2 md:bottom-3 left-2 md:left-3 text-white">
                        <span className="inline-block bg-white/20 backdrop-blur-sm px-2 py-0.5 md:px-3 md:py-1 rounded-full text-xs font-medium">
                          {item.category}
                        </span>
                      </div>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Gallery;
