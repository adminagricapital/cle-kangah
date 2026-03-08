import React, { useEffect, useState } from "react";
import SEOHead from "@/components/SEOHead";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ReviewForm from "@/components/ReviewForm";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Star, Quote, MessageSquarePlus } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

interface Review {
  id: string;
  client_name: string;
  rating: number;
  title: string | null;
  comment: string;
  service_type: string;
  created_at: string;
}

const serviceLabels: Record<string, string> = {
  couture: "Couture sur mesure",
  "robe-mariee": "Robe de mariée",
  evenementiel: "Événementiel",
  formation: "Formation",
  boutique: "Boutique",
  autre: "Autre",
};

const Temoignages = () => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReviews = async () => {
      const { data } = await supabase
        .from("reviews")
        .select("*")
        .order("created_at", { ascending: false }) as any;
      setReviews(data || []);
      setLoading(false);
    };
    fetchReviews();
  }, []);

  // Static testimonials as fallback
  const staticTestimonials = [
    { id: "s1", client_name: "Yasmine", rating: 5, title: "Robe de mariée parfaite", comment: "Clémence a transformé mon rêve de robe de mariée en réalité. Un travail d'une finesse exceptionnelle.", service_type: "robe-mariee", created_at: "2024-06-01" },
    { id: "s2", client_name: "Jean-Marc", rating: 5, title: "Costume impeccable", comment: "Mon costume sur mesure était parfait. Coupe impeccable, tissu de qualité. Je recommande à 100%.", service_type: "couture", created_at: "2024-05-15" },
    { id: "s3", client_name: "Ahoua", rating: 5, title: "40 tenues de chorale", comment: "L'atelier CK Couture a habillé toute notre chorale. 40 tenues identiques, livrées dans les temps. Impressionnant !", service_type: "evenementiel", created_at: "2024-04-20" },
    { id: "s4", client_name: "Marie-Claire", rating: 5, title: "Une auteure inspirante", comment: "Ses livres m'ont profondément touchée. Une parole vraie qui accompagne les femmes dans leur cheminement.", service_type: "autre", created_at: "2024-03-10" },
    { id: "s5", client_name: "Kouassi", rating: 5, title: "Excellence et passion", comment: "Du défilé de mode aux tenues de tous les jours, CK Couture sait tout faire avec excellence et passion.", service_type: "couture", created_at: "2024-02-28" },
    { id: "s6", client_name: "Aminata", rating: 5, title: "Formation de qualité", comment: "J'ai suivi la formation couture avec Clémence. Aujourd'hui je couds mes propres créations grâce à elle.", service_type: "formation", created_at: "2024-01-15" },
  ];

  const allReviews = reviews.length > 0 ? reviews : staticTestimonials;

  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="pt-20 pb-16">
        <div className="relative bg-elegant-800 py-16 mb-8">
          <div className="container mx-auto px-4 text-center text-white">
            <Quote className="w-10 h-10 mx-auto mb-3 text-elegant-300" />
            <h1 className="text-3xl md:text-5xl font-playfair font-bold mb-3">
              Témoignages Clients
            </h1>
            <div className="w-24 h-1 bg-gradient-to-r from-elegant-400 to-rose-400 mx-auto mb-3" />
            <p className="text-elegant-200 max-w-2xl mx-auto mb-6">
              Découvrez ce que nos clients pensent de nos créations et services
            </p>
            <ReviewForm
              trigger={
                <Button size="lg" className="bg-white text-elegant-800 hover:bg-white/90">
                  <MessageSquarePlus className="w-5 h-5 mr-2" /> Laisser votre avis
                </Button>
              }
            />
          </div>
        </div>

        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            {loading ? (
              <div className="text-center py-16 text-muted-foreground">Chargement...</div>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {allReviews.map((review) => (
                  <Card key={review.id} className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border-elegant-200">
                    <CardContent className="p-8">
                      <div className="mb-4">
                        <Quote className="w-7 h-7 text-elegant-400 mb-3" />
                        <div className="flex gap-1 mb-2">
                          {Array.from({ length: review.rating }).map((_, i) => (
                            <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                          ))}
                        </div>
                        {review.title && (
                          <h3 className="font-semibold text-foreground mb-2">{review.title}</h3>
                        )}
                        <blockquote className="text-muted-foreground leading-relaxed italic">
                          "{review.comment}"
                        </blockquote>
                      </div>
                      <div className="border-t border-elegant-200 pt-4 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-gradient-to-br from-elegant-200 to-elegant-300 rounded-full flex items-center justify-center">
                            <span className="font-playfair font-semibold text-elegant-700">
                              {review.client_name.charAt(0)}
                            </span>
                          </div>
                          <span className="font-semibold text-sm text-foreground">{review.client_name}</span>
                        </div>
                        <span className="text-xs bg-elegant-100 text-elegant-700 px-2 py-1 rounded-full">
                          {serviceLabels[review.service_type] || review.service_type}
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Temoignages;
