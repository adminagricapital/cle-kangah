import React, { useEffect, useState } from "react";
import SEOHead from "@/components/SEOHead";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ModelGenerator from "@/components/ModelGenerator";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { supabase } from "@/integrations/supabase/client";
import { Link } from "react-router-dom";
import { ArrowRight, Loader2, Sparkles, BookOpen } from "lucide-react";
import { motion } from "framer-motion";

// Pre-built catalogue entries for when DB is empty
import garmentRobeLongue from "@/assets/garment-robe-longue.jpg";
import garmentAgbada from "@/assets/garment-agbada.jpg";
import garmentTailleur from "@/assets/garment-tailleur.jpg";
import garmentBoubou from "@/assets/garment-boubou.jpg";
import garmentCombinaison from "@/assets/garment-combinaison.jpg";
import garmentDashiki from "@/assets/garment-dashiki.jpg";
import garmentRobeMariee from "@/assets/garment-robe-mariee.jpg";
import garmentCaftan from "@/assets/garment-caftan.jpg";
import garmentTenueFete from "@/assets/garment-tenue-fete.jpg";
import garmentChemise from "@/assets/garment-chemise.jpg";
import garmentJupeCrayon from "@/assets/garment-jupe-crayon.jpg";
import garmentBapteme from "@/assets/garment-bapteme.jpg";
import garmentCorsage from "@/assets/garment-corsage.jpg";
import garmentGilet from "@/assets/garment-gilet.jpg";
import garmentPagneNoue from "@/assets/garment-pagne-noue.jpg";
import garmentBlouse from "@/assets/garment-blouse.jpg";

const staticModels = [
  { id: "s1", description: "Robe longue en wax multicolore avec dos nu et traîne légère", style: "africain", gender: "femme", image_url: garmentRobeLongue },
  { id: "s2", description: "Agbada royal brodé bleu et or pour cérémonie", style: "traditionnel", gender: "homme", image_url: garmentAgbada },
  { id: "s3", description: "Tailleur femme moderne en tissu africain, coupe cintrée", style: "moderne", gender: "femme", image_url: garmentTailleur },
  { id: "s4", description: "Grand Boubou satiné avec broderies artisanales", style: "traditionnel", gender: "homme", image_url: garmentBoubou },
  { id: "s5", description: "Combinaison pantalon en ankara avec ceinture dorée", style: "africain", gender: "femme", image_url: garmentCombinaison },
  { id: "s6", description: "Dashiki moderne manches courtes, coupe ajustée", style: "africain", gender: "homme", image_url: garmentDashiki },
  { id: "s7", description: "Robe de mariée en dentelle et satin avec voile brodé", style: "europeen", gender: "femme", image_url: garmentRobeMariee },
  { id: "s8", description: "Caftan marocain blanc brodé fil d'or", style: "oriental", gender: "homme", image_url: garmentCaftan },
  { id: "s9", description: "Robe de fête fillette en tulle rose et satin", style: "moderne", gender: "enfant", image_url: garmentTenueFete },
  { id: "s10", description: "Chemise cintrée en wax graphique", style: "africain", gender: "homme", image_url: garmentChemise },
  { id: "s11", description: "Jupe crayon taille haute en bazin riche", style: "africain", gender: "femme", image_url: garmentJupeCrayon },
  { id: "s12", description: "Ensemble baptême bébé blanc et doré", style: "traditionnel", gender: "enfant", image_url: garmentBapteme },
  { id: "s13", description: "Corsage peplum en wax hollandais coloré", style: "africain", gender: "femme", image_url: garmentCorsage },
  { id: "s14", description: "Gilet sans manches en kente tissé main", style: "ivoirien", gender: "homme", image_url: garmentGilet },
  { id: "s15", description: "Pagne noué traditionnel avec haut assorti", style: "ivoirien", gender: "femme", image_url: garmentPagneNoue },
  { id: "s16", description: "Blouse évasée en mousseline et dentelle", style: "moderne", gender: "femme", image_url: garmentBlouse },
];

const genderLabels: Record<string, string> = { femme: "Femme", homme: "Homme", enfant: "Enfant" };
const styleLabels: Record<string, string> = {
  africain: "Africain", ivoirien: "Ivoirien", europeen: "Européen",
  oriental: "Oriental", moderne: "Moderne", traditionnel: "Traditionnel",
};

const Catalogue = () => {
  const [dbModels, setDbModels] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeGender, setActiveGender] = useState("tous");

  useEffect(() => {
    supabase
      .from("generated_models")
      .select("*")
      .eq("is_public", true)
      .order("created_at", { ascending: false })
      .limit(50)
      .then(({ data }) => {
        setDbModels(data || []);
        setLoading(false);
      });
  }, []);

  const allModels = [...dbModels, ...staticModels];
  const filtered = activeGender === "tous" ? allModels : allModels.filter(m => m.gender === activeGender);

  return (
    <div className="min-h-screen">
      <SEOHead
        title="Catalogue Modèles – Inspirations Couture | CK Couture Daloa"
        description="Explorez notre catalogue de modèles de couture : robes, agbadas, tailleurs, combinaisons et plus. Générez votre propre modèle par IA."
        path="/catalogue"
      />
      <Navbar />
      <main className="pt-20 pb-16">
        {/* Hero */}
        <div className="bg-gradient-elegant py-16 mb-8">
          <div className="container mx-auto px-4 text-center">
            <BookOpen className="w-10 h-10 mx-auto mb-3 text-elegant-600" />
            <h1 className="text-3xl md:text-5xl font-playfair font-bold text-elegant-800 mb-3">
              Catalogue des Modèles
            </h1>
            <div className="w-24 h-1 bg-gradient-to-r from-elegant-400 to-rose-400 mx-auto mb-3" />
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Parcourez nos inspirations ou créez votre modèle unique grâce à notre IA créative
            </p>
          </div>
        </div>

        <div className="container mx-auto px-4">
          {/* AI Generator */}
          <div className="max-w-3xl mx-auto mb-16">
            <ModelGenerator onSelectModel={(url, desc) => {
              window.location.href = `/commander?model=${encodeURIComponent(url)}&desc=${encodeURIComponent(desc)}`;
            }} />
          </div>

          {/* Gallery */}
          <div className="max-w-7xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-playfair font-bold text-elegant-800 text-center mb-8">
              Tous les Modèles
            </h2>

            <Tabs value={activeGender} onValueChange={setActiveGender} className="mb-8">
              <div className="flex justify-center">
                <TabsList className="bg-elegant-50">
                  <TabsTrigger value="tous">Tous</TabsTrigger>
                  <TabsTrigger value="femme">Femme</TabsTrigger>
                  <TabsTrigger value="homme">Homme</TabsTrigger>
                  <TabsTrigger value="enfant">Enfant</TabsTrigger>
                </TabsList>
              </div>

              <TabsContent value={activeGender}>
                {loading ? (
                  <div className="flex justify-center py-12">
                    <Loader2 className="w-8 h-8 animate-spin text-elegant-500" />
                  </div>
                ) : (
                  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
                    {filtered.map((model, i) => (
                      <motion.div
                        key={model.id}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.05, duration: 0.4 }}
                      >
                        <Card className="group overflow-hidden hover:shadow-xl transition-all duration-300 border-0 shadow-md h-full">
                          <div className="relative aspect-[3/4] overflow-hidden">
                            <img
                              src={model.image_url}
                              alt={model.description}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                            />
                            <div className="absolute top-2 left-2 flex gap-1">
                              <Badge className="bg-elegant-600/90 text-white text-[10px]">
                                {genderLabels[model.gender] || model.gender}
                              </Badge>
                              <Badge variant="outline" className="bg-background/80 text-[10px]">
                                {styleLabels[model.style] || model.style}
                              </Badge>
                            </div>
                            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent p-3">
                              <p className="text-white text-xs sm:text-sm line-clamp-2">{model.description}</p>
                            </div>
                          </div>
                          <CardContent className="p-3">
                            <Link to={`/commander?model=${encodeURIComponent(model.image_url)}&desc=${encodeURIComponent(model.description)}`}>
                              <Button size="sm" className="w-full bg-elegant-600 hover:bg-elegant-700 text-white text-xs">
                                <Sparkles className="w-3 h-3 mr-1" /> Commander ce modèle
                              </Button>
                            </Link>
                          </CardContent>
                        </Card>
                      </motion.div>
                    ))}
                  </div>
                )}
                <p className="text-center text-sm text-muted-foreground mt-6">{filtered.length} modèle{filtered.length > 1 ? 's' : ''}</p>
              </TabsContent>
            </Tabs>
          </div>

          {/* CTA */}
          <div className="max-w-4xl mx-auto mt-16 bg-gradient-to-r from-elegant-600 to-rose-600 rounded-2xl p-8 md:p-12 text-center text-white">
            <h2 className="text-2xl md:text-3xl font-playfair font-bold mb-4">Votre Modèle n'est pas ici ?</h2>
            <p className="text-white/90 mb-6 max-w-xl mx-auto">Générez-le avec notre IA ou envoyez-nous une photo d'inspiration !</p>
            <Link to="/commander">
              <Button size="lg" className="bg-white text-elegant-800 hover:bg-white/90">
                Commander sur mesure <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Catalogue;
