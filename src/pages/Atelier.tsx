import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Scissors, Users, Clock, Award, Shield, Star, Heart, 
  Sparkles, Ruler, ShirtIcon, Palette, Crown
} from "lucide-react";
import { Link } from "react-router-dom";
import atelierHero from "@/assets/atelier-hero.jpg";
import atelierMesures from "@/assets/atelier-mesures.jpg";
import atelierCouture from "@/assets/atelier-couture.jpg";
import atelierFashion from "@/assets/atelier-fashion.jpg";
import atelierBoutique from "@/assets/atelier-boutique.jpg";
import atelierEquipe from "@/assets/atelier-equipe-action.jpg";
import fashionShow from "@/assets/fashion-show.jpg";
import choristes from "@/assets/choristes.jpg";
import collectionHomme from "@/assets/collection-homme.jpg";
import collectionEnfants from "@/assets/collection-enfants.jpg";

const stats = [
  { icon: Users, value: "30+", label: "Employés & Apprenants" },
  { icon: Clock, value: "7 jours", label: "Délai max de livraison" },
  { icon: Award, value: "100%", label: "Satisfait ou remboursé" },
  { icon: Star, value: "5/5", label: "Satisfaction client" },
];

const specialites = [
  { icon: Scissors, title: "Couture Dame", desc: "Robes, jupes, ensembles, tenues de cérémonie" },
  { icon: ShirtIcon, title: "Couture Homme", desc: "Costumes, chemises, pantalons, boubous" },
  { icon: Heart, title: "Couture Enfants", desc: "Tenues scolaires, fêtes, baptêmes" },
  { icon: Crown, title: "Habillement de Miss", desc: "Robes de concours, tenues de gala" },
  { icon: Palette, title: "Stylisme & Modélisme", desc: "Création de modèles, design de motifs" },
  { icon: Sparkles, title: "Broderies & Motifs", desc: "Broderie traditionnelle et moderne" },
  { icon: Ruler, title: "Couture sur mesure", desc: "Prise de mesures, ajustements parfaits" },
  { icon: Star, title: "Prêt-à-porter", desc: "Collections prêtes, tendances actuelles" },
];

const occasions = [
  "Mariage", "Baptême", "Anniversaire", "Saint-Valentin", "8 Mars",
  "Fête des mères", "Défilé de mode", "Concours de beauté",
  "Cérémonie officielle", "Tenue professionnelle", "Chorales & Choristes",
  "Fashion Week", "Habillement surprise", "Événements culturels",
];

const services = [
  "Surfilage haute précision", "Tricotage", "Blanchisserie professionnelle",
  "Pressing haut de gamme", "Retouches & ajustements", "Création de motifs",
  "Design personnalisé", "Vente de tissus", "Conseil en image",
];

const Atelier = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      
      {/* Hero */}
      <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img src={atelierHero} alt="Atelier Clémence KANGAH" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70" />
        </div>
        <div className="relative z-10 container mx-auto px-4 text-center text-white py-32">
          <Badge className="bg-elegant-600 text-white mb-4 text-sm">Atelier de Haute Couture</Badge>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-playfair font-bold mb-6">
            CK Couture
          </h1>
          <p className="text-lg md:text-xl max-w-3xl mx-auto mb-8 text-white/90">
            Un espace créatif de 30 personnes dédié à l'excellence de la couture africaine — 
            Du sur-mesure au prêt-à-porter, de la tradition à la modernité.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/commander">
              <Button size="lg" className="bg-elegant-600 hover:bg-elegant-700 text-white px-8">
                <Scissors className="w-5 h-5 mr-2" /> Commander en ligne
              </Button>
            </Link>
            <Link to="/services">
              <Button size="lg" variant="outline" className="border-white/70 text-white hover:bg-white/20 bg-transparent px-8">
                Voir nos services
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-12 bg-elegant-800 text-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, i) => (
              <div key={i} className="text-center">
                <stat.icon className="w-8 h-8 mx-auto mb-3 text-elegant-300" />
                <div className="text-3xl md:text-4xl font-playfair font-bold mb-1">{stat.value}</div>
                <div className="text-sm text-elegant-300">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Spécialités */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-playfair font-bold text-elegant-800 mb-4">
              Nos Spécialités
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-elegant-400 to-rose-400 mx-auto mb-4" />
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Un savoir-faire complet pour répondre à toutes vos envies de couture
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {specialites.map((spec, i) => (
              <Card key={i} className="group hover:shadow-xl transition-all hover:-translate-y-1 border-0 bg-gradient-to-br from-elegant-50 to-white">
                <CardContent className="p-6 text-center">
                  <div className="w-14 h-14 mx-auto mb-4 bg-elegant-100 rounded-xl flex items-center justify-center group-hover:bg-elegant-200 transition-colors">
                    <spec.icon className="w-7 h-7 text-elegant-600" />
                  </div>
                  <h3 className="font-playfair font-semibold text-lg mb-2 text-foreground">{spec.title}</h3>
                  <p className="text-sm text-muted-foreground">{spec.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Images Grid */}
      <section className="py-20 bg-muted">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-playfair font-bold text-elegant-800 mb-4">
              L'Atelier en Images
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-elegant-400 to-rose-400 mx-auto" />
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {[
              { src: atelierEquipe, title: "Notre équipe en action", desc: "30+ artisans travaillant ensemble" },
              { src: atelierMesures, title: "Prise de mesures", desc: "Précision et attention aux détails" },
              { src: fashionShow, title: "Défilé de mode", desc: "Nos créations sur les podiums" },
              { src: collectionHomme, title: "Collection Homme", desc: "Costumes et tenues traditionnelles" },
              { src: choristes, title: "Habillement de choristes", desc: "Tenues de groupe assorties" },
              { src: collectionEnfants, title: "Collection Enfants", desc: "Tenues festives et colorées" },
            ].map((img, i) => (
              <div key={i} className={`group relative rounded-2xl overflow-hidden shadow-lg ${i === 0 ? 'lg:col-span-2 lg:row-span-2' : ''}`}>
                <img src={img.src} alt={img.title} className="w-full h-full object-cover min-h-[250px] group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent flex items-end p-6">
                  <div className="text-white">
                    <h3 className="font-playfair font-bold text-xl mb-1">{img.title}</h3>
                    <p className="text-sm text-white/80">{img.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Occasions */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-playfair font-bold text-elegant-800 mb-4">
              Pour Toutes les Occasions
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-elegant-400 to-rose-400 mx-auto mb-4" />
          </div>
          <div className="flex flex-wrap justify-center gap-3 max-w-4xl mx-auto mb-12">
            {occasions.map((occ, i) => (
              <Badge key={i} variant="outline" className="px-4 py-2 text-sm border-elegant-300 text-elegant-700 hover:bg-elegant-50 transition-colors">
                {occ}
              </Badge>
            ))}
          </div>
        </div>
      </section>

      {/* Services complémentaires */}
      <section className="py-20 bg-elegant-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-playfair font-bold text-elegant-800 mb-8">
              Services Complémentaires
            </h2>
            <div className="grid sm:grid-cols-3 gap-4 mb-12">
              {services.map((srv, i) => (
                <div key={i} className="bg-white rounded-xl p-4 shadow-sm border border-elegant-100 text-sm font-medium text-elegant-700">
                  {srv}
                </div>
              ))}
            </div>
            <div className="bg-gradient-to-r from-elegant-600 to-rose-600 rounded-2xl p-8 text-white">
              <Shield className="w-12 h-12 mx-auto mb-4" />
              <h3 className="text-2xl font-playfair font-bold mb-3">Garantie 100% Satisfait ou Remboursé</h3>
              <p className="text-white/90 mb-6 max-w-xl mx-auto">
                Nous nous engageons sur la qualité. Haute couture, durabilité, finitions impeccables. 
                Votre satisfaction est notre priorité absolue.
              </p>
              <Link to="/commander">
                <Button size="lg" className="bg-white text-elegant-800 hover:bg-white/90">
                  Commander maintenant
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Atelier;
