import React from "react";
import { Button } from "@/components/ui/button";
import { ShoppingBag, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import boutiqueImg from "@/assets/boutique-preview.jpg";

const BoutiquePreview = () => {
  return (
    <section className="py-20 bg-muted">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            {/* Text */}
            <div className="order-2 lg:order-1">
              <h2 className="text-3xl md:text-5xl font-playfair font-bold text-elegant-800 mb-4">
                Commander en Ligne
              </h2>
              <div className="w-24 h-1 bg-gradient-to-r from-elegant-400 to-rose-400 mb-6" />
              <p className="text-muted-foreground text-lg mb-6">
                Commandez votre tenue sur mesure directement en ligne. Choisissez votre tissu, 
                votre modèle, envoyez vos mesures — on s'occupe du reste !
              </p>
              <ul className="space-y-3 mb-8 text-sm text-muted-foreground">
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-elegant-600 rounded-full" />
                  Couture Dame, Homme, Enfants
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-elegant-600 rounded-full" />
                  Tissus traditionnels ivoiriens (Baoulé, Sénoufo, Dan, Agni...)
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-elegant-600 rounded-full" />
                  Livraison sous 7 jours — Garantie 100% satisfait
                </li>
              </ul>
              <Link to="/commander">
                <Button size="lg" className="bg-elegant-600 hover:bg-elegant-700 text-white">
                  <ShoppingBag className="w-5 h-5 mr-2" /> Commander maintenant <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            </div>

            {/* Image */}
            <div className="order-1 lg:order-2">
              <div className="rounded-2xl overflow-hidden shadow-2xl">
                <img src={boutiqueImg} alt="Boutique prêt-à-porter" className="w-full h-64 md:h-96 object-cover" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BoutiquePreview;
