
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Quote, Star } from 'lucide-react';

const Testimonials = () => {
  const testimonials = [
    {
      quote: "Clémence a transformé mon rêve de robe de mariée en réalité. Un travail d'une finesse exceptionnelle.",
      author: "Yasmine",
      role: "Mariée comblée",
      rating: 5
    },
    {
      quote: "Mon costume sur mesure était parfait. Coupe impeccable, tissu de qualité. Je recommande à 100%.",
      author: "Jean-Marc",
      role: "Client fidèle",
      rating: 5
    },
    {
      quote: "L'atelier CK Couture a habillé toute notre chorale. 40 tenues identiques, livrées dans les temps. Impressionnant !",
      author: "Ahoua",
      role: "Directrice de chorale",
      rating: 5
    },
    {
      quote: "Ses livres m'ont profondément touchée. Une parole vraie qui accompagne les femmes dans leur cheminement.",
      author: "Marie-Claire",
      role: "Lectrice",
      rating: 5
    },
    {
      quote: "Du défilé de mode aux tenues de tous les jours, CK Couture sait tout faire avec excellence et passion.",
      author: "Kouassi",
      role: "Organisateur événementiel",
      rating: 5
    }
  ];

  return (
    <section id="temoignages" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-playfair font-bold text-elegant-800 mb-6">
              Témoignages
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-elegant-400 to-rose-400 mx-auto mb-6"></div>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              La satisfaction de nos clients est notre plus belle récompense
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card 
                key={index} 
                className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border-elegant-200"
              >
                <CardContent className="p-8">
                  <div className="mb-6">
                    <Quote className="w-8 h-8 text-elegant-400 mb-4" />
                    <div className="flex space-x-1 mb-4">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                      ))}
                    </div>
                    <blockquote className="text-muted-foreground leading-relaxed italic mb-6">
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
                        <h4 className="font-semibold text-foreground">{testimonial.author}</h4>
                        <p className="text-sm text-muted-foreground">{testimonial.role}</p>
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
