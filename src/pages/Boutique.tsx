import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ShoppingBag, ArrowRight, Star } from "lucide-react";
import { Link } from "react-router-dom";
import collectionHomme from "@/assets/collection-homme.jpg";
import collectionEnfants from "@/assets/collection-enfants.jpg";
import robeSoiree from "@/assets/robe-soiree-rouge.jpg";
import fashionShow from "@/assets/fashion-show.jpg";
import choristes from "@/assets/choristes.jpg";
import tenuePro from "@/assets/tenue-professionnelle.jpg";
import journeeFemme from "@/assets/journee-femme.jpg";
import saintValentin from "@/assets/saint-valentin.jpg";
import tissus from "@/assets/tissus-varietes.jpg";
import atelierEquipe from "@/assets/atelier-equipe-action.jpg";

interface Product {
  id: string;
  name: string;
  category: string;
  price: string;
  image: string;
  badge?: string;
  rating: number;
}

const products: Product[] = [
  { id: "1", name: "Robe de Soirée Élégante", category: "femme", price: "45 000 FCFA", image: robeSoiree, badge: "Populaire", rating: 5 },
  { id: "2", name: "Costume Homme Premium", category: "homme", price: "65 000 FCFA", image: collectionHomme, badge: "Nouveau", rating: 5 },
  { id: "3", name: "Ensemble Enfants Festif", category: "enfants", price: "25 000 FCFA", image: collectionEnfants, rating: 4 },
  { id: "4", name: "Tenue de Défilé Fashion", category: "femme", price: "85 000 FCFA", image: fashionShow, badge: "Exclusif", rating: 5 },
  { id: "5", name: "Robe de Choriste Bordeaux", category: "femme", price: "35 000 FCFA", image: choristes, rating: 4 },
  { id: "6", name: "Tailleur Professionnel", category: "homme", price: "55 000 FCFA", image: tenuePro, rating: 5 },
  { id: "7", name: "Collection 8 Mars Femme Forte", category: "femme", price: "50 000 FCFA", image: journeeFemme, badge: "Tendance", rating: 5 },
  { id: "8", name: "Duo Saint-Valentin Couple", category: "femme", price: "95 000 FCFA", image: saintValentin, badge: "Promo", rating: 5 },
  { id: "9", name: "Tissus Wax Premium (6 yards)", category: "tissus", price: "15 000 FCFA", image: tissus, rating: 4 },
  { id: "10", name: "Tenue de Groupe Assortie", category: "homme", price: "40 000 FCFA", image: atelierEquipe, rating: 4 },
];

const Boutique = () => {
  const [activeTab, setActiveTab] = useState("tous");

  const filtered = activeTab === "tous" ? products : products.filter(p => p.category === activeTab);

  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="pt-20 pb-16">
        {/* Hero */}
        <div className="relative bg-elegant-800 py-16 mb-8">
          <div className="container mx-auto px-4 text-center text-white">
            <ShoppingBag className="w-10 h-10 mx-auto mb-3 text-elegant-300" />
            <h1 className="text-3xl md:text-5xl font-playfair font-bold mb-3">
              Boutique CK Couture
            </h1>
            <div className="w-24 h-1 bg-gradient-to-r from-elegant-400 to-rose-400 mx-auto mb-3" />
            <p className="text-elegant-200 max-w-2xl mx-auto">
              Découvrez nos collections prêt-à-porter et commandez vos tenues sur mesure. 
              Homme, Femme, Enfants — pour toutes les occasions.
            </p>
          </div>
        </div>

        <div className="container mx-auto px-4">
          {/* Tabs */}
          <Tabs value={activeTab} onValueChange={setActiveTab} className="max-w-6xl mx-auto">
            <div className="flex justify-center mb-8">
              <TabsList className="bg-elegant-50">
                <TabsTrigger value="tous">Tous</TabsTrigger>
                <TabsTrigger value="femme">Femme</TabsTrigger>
                <TabsTrigger value="homme">Homme</TabsTrigger>
                <TabsTrigger value="enfants">Enfants</TabsTrigger>
                <TabsTrigger value="tissus">Tissus</TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value={activeTab}>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filtered.map((product) => (
                  <Card key={product.id} className="group overflow-hidden hover:shadow-xl transition-all duration-300 border-0 shadow-md">
                    <div className="relative aspect-[4/5] overflow-hidden">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      {product.badge && (
                        <Badge className="absolute top-3 left-3 bg-elegant-600 text-white">{product.badge}</Badge>
                      )}
                    </div>
                    <CardContent className="p-4">
                      <div className="flex items-center gap-1 mb-2">
                        {Array.from({ length: product.rating }).map((_, i) => (
                          <Star key={i} className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />
                        ))}
                      </div>
                      <h3 className="font-playfair font-semibold text-foreground mb-1">{product.name}</h3>
                      <div className="flex items-center justify-between">
                        <span className="text-lg font-bold text-elegant-600">{product.price}</span>
                        <Link to="/commander">
                          <Button size="sm" className="bg-elegant-600 hover:bg-elegant-700 text-white">
                            Commander <ArrowRight className="w-3.5 h-3.5 ml-1" />
                          </Button>
                        </Link>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>

          {/* CTA */}
          <div className="max-w-4xl mx-auto mt-16 bg-gradient-to-r from-elegant-600 to-rose-600 rounded-2xl p-8 md:p-12 text-center text-white">
            <h2 className="text-2xl md:text-3xl font-playfair font-bold mb-4">
              Envie d'une Création Unique ?
            </h2>
            <p className="text-white/90 mb-6 max-w-xl mx-auto">
              Commandez une tenue sur mesure avec vos choix de tissu, couleurs et style. 
              Livraison en 7 jours maximum.
            </p>
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

export default Boutique;
