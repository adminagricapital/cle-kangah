import React from "react";
import { Button } from "@/components/ui/button";
import { Scissors, Users, Clock, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import atelierTeam from "@/assets/atelier-team.jpg";
import heroAtelier from "@/assets/hero-atelier-main.jpg";

const AtelierPreview = () => {
  return (
    <section className="py-20 bg-white overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-5xl font-playfair font-bold text-elegant-800 mb-4">
            L'Atelier CK Couture
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-elegant-400 to-rose-400 mx-auto mb-4" />
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            Un espace créatif de 30+ personnes dédié à l'excellence de la couture africaine
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto items-center">
          {/* Images */}
          <div className="grid grid-cols-2 gap-4">
            <div className="rounded-2xl overflow-hidden shadow-lg col-span-2">
              <img src={heroAtelier} alt="Atelier CK Couture" className="w-full h-48 md:h-64 object-cover" />
            </div>
            <div className="rounded-2xl overflow-hidden shadow-lg">
              <img src={atelierTeam} alt="Équipe de l'atelier" className="w-full h-32 md:h-40 object-cover" />
            </div>
            <div className="rounded-2xl overflow-hidden shadow-lg bg-gradient-to-br from-elegant-600 to-rose-600 flex items-center justify-center p-6 text-white text-center">
              <div>
                <div className="text-3xl md:text-4xl font-playfair font-bold mb-1">30+</div>
                <div className="text-sm text-white/80">Employés & Apprenants</div>
              </div>
            </div>
          </div>

          {/* Info */}
          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-elegant-100 rounded-xl flex items-center justify-center shrink-0">
                <Scissors className="w-6 h-6 text-elegant-600" />
              </div>
              <div>
                <h3 className="font-playfair font-semibold text-lg text-foreground">Couture Sur Mesure & Prêt-à-porter</h3>
                <p className="text-sm text-muted-foreground">Dame, Homme, Enfants — Robes, costumes, tenues de cérémonie, mode africaine contemporaine</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-elegant-100 rounded-xl flex items-center justify-center shrink-0">
                <Users className="w-6 h-6 text-elegant-600" />
              </div>
              <div>
                <h3 className="font-playfair font-semibold text-lg text-foreground">Stylisme & Modélisme</h3>
                <p className="text-sm text-muted-foreground">Création de modèles, habillement de Miss, défilés de mode, tenues d'événements</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-elegant-100 rounded-xl flex items-center justify-center shrink-0">
                <Clock className="w-6 h-6 text-elegant-600" />
              </div>
              <div>
                <h3 className="font-playfair font-semibold text-lg text-foreground">Livraison Rapide & Garantie</h3>
                <p className="text-sm text-muted-foreground">7 jours max de livraison — 100% satisfait ou remboursé</p>
              </div>
            </div>

            <Link to="/atelier">
              <Button size="lg" className="bg-elegant-600 hover:bg-elegant-700 text-white mt-4">
                Découvrir l'atelier <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AtelierPreview;
