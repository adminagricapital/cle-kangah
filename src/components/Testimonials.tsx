
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Quote, Star, ArrowRight, MessageSquarePlus } from 'lucide-react';
import { Link } from 'react-router-dom';
import ReviewForm from '@/components/ReviewForm';

const Testimonials = () => {
  const testimonials = [
    { quote: "Clémence a transformé mon rêve de robe de mariée en réalité. Un travail d'une finesse exceptionnelle.", author: "Yasmine", role: "Mariée comblée", rating: 5 },
    { quote: "Mon costume sur mesure était parfait. Coupe impeccable, tissu de qualité. Je recommande à 100%.", author: "Jean-Marc", role: "Client fidèle", rating: 5 },
    { quote: "L'atelier CK Couture a habillé toute notre chorale. 40 tenues identiques, livrées dans les temps.", author: "Ahoua", role: "Directrice de chorale", rating: 5 },
  ];

  return (
    <section id="temoignages" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-playfair font-bold text-elegant-800 mb-6">Témoignages</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-elegant-400 to-rose-400 mx-auto mb-6" />
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">La satisfaction de nos clients est notre plus belle récompense</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-10">
            {testimonials.map((t, i) => (
              <Card key={i} className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border-elegant-200">
                <CardContent className="p-8">
                  <Quote className="w-8 h-8 text-elegant-400 mb-4" />
                  <div className="flex gap-1 mb-4">
                    {[...Array(t.rating)].map((_, j) => <Star key={j} className="w-4 h-4 text-yellow-400 fill-current" />)}
                  </div>
                  <blockquote className="text-muted-foreground leading-relaxed italic mb-6">"{t.quote}"</blockquote>
                  <div className="border-t border-elegant-200 pt-6 flex items-center gap-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-elegant-200 to-elegant-300 rounded-full flex items-center justify-center">
                      <span className="font-playfair font-semibold text-elegant-700">{t.author.charAt(0)}</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground">{t.author}</h4>
                      <p className="text-sm text-muted-foreground">{t.role}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <ReviewForm
              trigger={
                <Button className="bg-elegant-600 hover:bg-elegant-700 text-white">
                  <MessageSquarePlus className="w-4 h-4 mr-2" /> Laisser votre avis
                </Button>
              }
            />
            <Link to="/temoignages">
              <Button variant="outline" className="border-elegant-300 text-elegant-700">
                Voir tous les témoignages <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
