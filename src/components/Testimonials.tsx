
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Quote, Star } from 'lucide-react';

const Testimonials = () => {
  const testimonials = [
    {
      quote: "Clémence est bien plus qu'une couturière. Elle recoud les cœurs et restaure les femmes.",
      author: "Yasmine",
      role: "Lectrice",
      rating: 5
    },
    {
      quote: "Son livre a changé ma vision de la responsabilité. Une parole vraie et humaine.",
      author: "Jean-Marc",
      role: "Enseignant",
      rating: 5
    },
    {
      quote: "Une femme de terrain, de vérité et d'honneur. Son impact dépasse largement son entourage immédiat.",
      author: "Ahoua",
      role: "Partenaire communautaire",
      rating: 5
    },
    {
      quote: "Grâce à ses ateliers, j'ai retrouvé confiance en moi et en mes capacités. Merci Clémence !",
      author: "Marie-Claire",
      role: "Participante atelier",
      rating: 5
    },
    {
      quote: "Ses projets agricoles ont transformé notre communauté. Une vision qui inspire et une action qui transforme.",
      author: "Kouassi",
      role: "Producteur, Gonaté",
      rating: 5
    }
  ];

  return (
    <section id="temoignages" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-playfair font-bold text-elegant-800 mb-6">
              Témoignages
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-elegant-400 to-rose-400 mx-auto mb-6"></div>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto">
              Les mots de ceux qui ont été touchés par mon travail et ma démarche
            </p>
          </div>

          {/* Testimonials Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card 
                key={index} 
                className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border-elegant-200"
              >
                <CardContent className="p-8">
                  <div className="mb-6">
                    <Quote className="w-8 h-8 text-elegant-400 mb-4" />
                    
                    {/* Rating */}
                    <div className="flex space-x-1 mb-4">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                      ))}
                    </div>
                    
                    <blockquote className="text-gray-700 leading-relaxed italic mb-6">
                      "{testimonial.quote}"
                    </blockquote>
                  </div>
                  
                  <div className="border-t border-elegant-200 pt-6">
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 bg-gradient-elegant rounded-full flex items-center justify-center">
                        <span className="font-playfair font-semibold text-elegant-700">
                          {testimonial.author.charAt(0)}
                        </span>
                      </div>
                      <div>
                        <h4 className="font-semibold text-elegant-800">{testimonial.author}</h4>
                        <p className="text-sm text-gray-600">{testimonial.role}</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
