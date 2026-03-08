// Boutique product data extracted from Boutique page
import boutiqueRobeSoiree from "@/assets/boutique-robe-soiree-rouge.jpg";
import boutiqueCostumeHomme from "@/assets/boutique-costume-homme.jpg";
import boutiqueEnsembleEnfants from "@/assets/boutique-ensemble-enfants.jpg";
import boutiqueDefileFashion from "@/assets/boutique-defile-fashion.jpg";
import boutiqueRobeChoriste from "@/assets/boutique-robe-choriste.jpg";
import boutiqueTailleurPro from "@/assets/boutique-tailleur-pro.jpg";
import boutique8Mars from "@/assets/boutique-8mars.jpg";
import boutiqueSaintValentin from "@/assets/boutique-saint-valentin.jpg";
import boutiqueTissusWax from "@/assets/boutique-tissus-wax.jpg";
import boutiqueTenueGroupe from "@/assets/boutique-tenue-groupe.jpg";
import boutiqueRobeMariee from "@/assets/boutique-robe-mariee.jpg";
import boutiqueAgbadaRoyal from "@/assets/boutique-agbada-royal.jpg";
import boutiqueBoubouFemme from "@/assets/boutique-boubou-femme.jpg";
import boutiqueCaftanHomme from "@/assets/boutique-caftan-homme.jpg";
import boutiqueTenueBapteme from "@/assets/boutique-tenue-bapteme.jpg";
import boutiqueCombinaisonWax from "@/assets/boutique-combinaison-wax.jpg";
import boutiqueJupeCrayon from "@/assets/boutique-jupe-crayon.jpg";
import boutiqueDashikiModerne from "@/assets/boutique-dashiki-moderne.jpg";
import boutiqueTissuKente from "@/assets/boutique-tissu-kente.jpg";
import boutiqueRobeGala from "@/assets/boutique-robe-gala.jpg";
import boutiqueUniformeScolaire from "@/assets/boutique-uniforme-scolaire.jpg";
import boutiquePagneNoue from "@/assets/boutique-pagne-noue.jpg";
import boutiqueTissuBazin from "@/assets/boutique-tissu-bazin.jpg";
import boutiqueBlazerAfricain from "@/assets/boutique-blazer-africain.jpg";
import boutiqueSacWax from "@/assets/boutique-sac-wax.jpg";
import boutiqueBijouxOr from "@/assets/boutique-bijoux-or.jpg";
import boutiquePochetteKente from "@/assets/boutique-pochette-kente.jpg";
import boutiqueChaussuresHomme from "@/assets/boutique-chaussures-homme.jpg";
import boutiqueRobeFeteRouge from "@/assets/boutique-robe-fete-rouge.jpg";
import boutiqueRobeBalEmeraude from "@/assets/boutique-robe-bal-emeraude.jpg";
import boutiqueBraceletPerles from "@/assets/boutique-bracelet-perles.jpg";
import boutiqueCombinaisonFete from "@/assets/boutique-combinaison-fete.jpg";
import boutiqueSacBazin from "@/assets/boutique-sac-bazin.jpg";
import boutiqueBoubouFeteHomme from "@/assets/boutique-boubou-fete-homme.jpg";
import boutiqueFoulardGele from "@/assets/boutique-foulard-gele.jpg";
import boutiqueRobeFeteEnfant from "@/assets/boutique-robe-fete-enfant.jpg";
import boutiqueRobeSoireeBleue from "@/assets/boutique-robe-soiree-bleue.jpg";

export interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  priceLabel: string;
  image: string;
  badge?: string;
  rating: number;
}

export const products: Product[] = [
  // Femme
  { id: "1", name: "Robe de Soirée Élégante", category: "femme", price: 45000, priceLabel: "45 000 FCFA", image: boutiqueRobeSoiree, badge: "Populaire", rating: 5 },
  { id: "4", name: "Tenue de Défilé Haute Couture", category: "femme", price: 85000, priceLabel: "85 000 FCFA", image: boutiqueDefileFashion, badge: "Exclusif", rating: 5 },
  { id: "5", name: "Robe de Choriste Bordeaux & Or", category: "femme", price: 35000, priceLabel: "35 000 FCFA", image: boutiqueRobeChoriste, rating: 4 },
  { id: "6", name: "Tailleur Professionnel Femme", category: "femme", price: 55000, priceLabel: "55 000 FCFA", image: boutiqueTailleurPro, rating: 5 },
  { id: "7", name: "Collection 8 Mars — Femme Forte", category: "femme", price: 50000, priceLabel: "50 000 FCFA", image: boutique8Mars, badge: "Tendance", rating: 5 },
  { id: "8", name: "Duo Saint-Valentin Couple", category: "femme", price: 95000, priceLabel: "95 000 FCFA", image: boutiqueSaintValentin, badge: "Promo", rating: 5 },
  { id: "11", name: "Robe de Mariée Dentelle", category: "femme", price: 150000, priceLabel: "150 000 FCFA", image: boutiqueRobeMariee, badge: "Premium", rating: 5 },
  { id: "13", name: "Grand Boubou Femme Émeraude", category: "femme", price: 60000, priceLabel: "60 000 FCFA", image: boutiqueBoubouFemme, rating: 5 },
  { id: "16", name: "Combinaison Wax Moderne", category: "femme", price: 42000, priceLabel: "42 000 FCFA", image: boutiqueCombinaisonWax, rating: 4 },
  { id: "17", name: "Jupe Crayon & Blouse Imprimée", category: "femme", price: 38000, priceLabel: "38 000 FCFA", image: boutiqueJupeCrayon, rating: 4 },
  { id: "20", name: "Robe de Gala Violet Royal", category: "femme", price: 70000, priceLabel: "70 000 FCFA", image: boutiqueRobeGala, badge: "Tendance", rating: 5 },
  { id: "22", name: "Pagne Noué Traditionnel", category: "femme", price: 35000, priceLabel: "35 000 FCFA", image: boutiquePagneNoue, rating: 5 },
  { id: "25", name: "Robe de Fête Rouge Pailletée", category: "femme", price: 68000, priceLabel: "68 000 FCFA", image: boutiqueRobeFeteRouge, badge: "Nouveau", rating: 5 },
  { id: "27", name: "Robe de Bal Émeraude Brodée", category: "femme", price: 78000, priceLabel: "78 000 FCFA", image: boutiqueRobeBalEmeraude, badge: "Exclusif", rating: 5 },
  { id: "29", name: "Combinaison de Fête Blanc & Or", category: "femme", price: 58000, priceLabel: "58 000 FCFA", image: boutiqueCombinaisonFete, badge: "Tendance", rating: 5 },
  { id: "35", name: "Robe de Soirée Bleu Nuit Cape", category: "femme", price: 72000, priceLabel: "72 000 FCFA", image: boutiqueRobeSoireeBleue, badge: "Premium", rating: 5 },
  // Homme
  { id: "2", name: "Costume Homme Premium", category: "homme", price: 65000, priceLabel: "65 000 FCFA", image: boutiqueCostumeHomme, badge: "Nouveau", rating: 5 },
  { id: "10", name: "Tenue de Groupe Assortie", category: "homme", price: 40000, priceLabel: "40 000 FCFA", image: boutiqueTenueGroupe, rating: 4 },
  { id: "12", name: "Agbada Royal Bleu & Or", category: "homme", price: 75000, priceLabel: "75 000 FCFA", image: boutiqueAgbadaRoyal, badge: "Exclusif", rating: 5 },
  { id: "14", name: "Caftan Homme Blanc Brodé", category: "homme", price: 55000, priceLabel: "55 000 FCFA", image: boutiqueCaftanHomme, rating: 5 },
  { id: "18", name: "Dashiki Moderne Homme", category: "homme", price: 30000, priceLabel: "30 000 FCFA", image: boutiqueDashikiModerne, rating: 4 },
  { id: "24", name: "Blazer Africain Moderne", category: "homme", price: 48000, priceLabel: "48 000 FCFA", image: boutiqueBlazerAfricain, badge: "Nouveau", rating: 5 },
  { id: "31", name: "Grand Boubou Fête Or", category: "homme", price: 80000, priceLabel: "80 000 FCFA", image: boutiqueBoubouFeteHomme, badge: "Premium", rating: 5 },
  // Enfants
  { id: "3", name: "Ensemble Enfants Festif", category: "enfants", price: 25000, priceLabel: "25 000 FCFA", image: boutiqueEnsembleEnfants, rating: 4 },
  { id: "15", name: "Tenue de Baptême Bébé", category: "enfants", price: 20000, priceLabel: "20 000 FCFA", image: boutiqueTenueBapteme, badge: "Nouveau", rating: 5 },
  { id: "21", name: "Uniformes Scolaires (lot)", category: "enfants", price: 18000, priceLabel: "18 000 FCFA", image: boutiqueUniformeScolaire, rating: 4 },
  { id: "34", name: "Robe de Fête Princesse Rose", category: "enfants", price: 28000, priceLabel: "28 000 FCFA", image: boutiqueRobeFeteEnfant, badge: "Nouveau", rating: 5 },
  // Tissus
  { id: "9", name: "Tissus Wax Premium (6 yards)", category: "tissus", price: 15000, priceLabel: "15 000 FCFA", image: boutiqueTissusWax, rating: 4 },
  { id: "19", name: "Tissu Kenté Authentique (3 yards)", category: "tissus", price: 25000, priceLabel: "25 000 FCFA", image: boutiqueTissuKente, rating: 5 },
  { id: "23", name: "Bazin Riche Ivoire & Or (6 yards)", category: "tissus", price: 30000, priceLabel: "30 000 FCFA", image: boutiqueTissuBazin, rating: 5 },
  // Accessoires
  { id: "26", name: "Sac à Main Wax Artisanal", category: "accessoires", price: 22000, priceLabel: "22 000 FCFA", image: boutiqueSacWax, badge: "Nouveau", rating: 5 },
  { id: "28", name: "Parure Bijoux Or Tradition", category: "accessoires", price: 35000, priceLabel: "35 000 FCFA", image: boutiqueBijouxOr, badge: "Exclusif", rating: 5 },
  { id: "30", name: "Pochette Kenté Chaîne Dorée", category: "accessoires", price: 18000, priceLabel: "18 000 FCFA", image: boutiquePochetteKente, rating: 5 },
  { id: "32", name: "Sac Cabas Bazin Bleu Royal", category: "accessoires", price: 25000, priceLabel: "25 000 FCFA", image: boutiqueSacBazin, rating: 5 },
  { id: "33", name: "Foulard Gélé Aso-Oke", category: "accessoires", price: 12000, priceLabel: "12 000 FCFA", image: boutiqueFoulardGele, rating: 4 },
  { id: "36", name: "Bracelets Perles Tradition", category: "accessoires", price: 8000, priceLabel: "8 000 FCFA", image: boutiqueBraceletPerles, rating: 4 },
  { id: "37", name: "Mocassins Homme Wax & Cuir", category: "accessoires", price: 32000, priceLabel: "32 000 FCFA", image: boutiqueChaussuresHomme, badge: "Nouveau", rating: 5 },
];
