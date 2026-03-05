// Gender images
import journeeFemme from "@/assets/journee-femme.jpg";
import collectionHomme from "@/assets/collection-homme.jpg";
import collectionEnfants from "@/assets/collection-enfants.jpg";

// Garment images
import robeSoiree from "@/assets/robe-soiree-rouge.jpg";
import fashionShow from "@/assets/fashion-show.jpg";
import choristes from "@/assets/choristes.jpg";
import tenuePro from "@/assets/tenue-professionnelle.jpg";
import robeLongue from "@/assets/garment-robe-longue.jpg";
import robeMariee from "@/assets/garment-robe-mariee.jpg";
import jupeMaxi from "@/assets/garment-jupe-maxi.jpg";
import jupeCrayon from "@/assets/garment-jupe-crayon.jpg";
import jupePatineuse from "@/assets/garment-jupe-patineuse.jpg";
import jupeMidi from "@/assets/garment-jupe-midi.jpg";
import tailleur from "@/assets/garment-tailleur.jpg";
import blouse from "@/assets/garment-blouse.jpg";
import chemisier from "@/assets/garment-chemisier.jpg";
import combinaison from "@/assets/garment-combinaison.jpg";
import boubou from "@/assets/garment-boubou.jpg";
import caftan from "@/assets/garment-caftan.jpg";
import pagneNoue from "@/assets/garment-pagne-noue.jpg";
import corsage from "@/assets/garment-corsage.jpg";
import tunique from "@/assets/garment-tunique.jpg";
import dashiki from "@/assets/garment-dashiki.jpg";
import agbada from "@/assets/garment-agbada.jpg";
import chemise from "@/assets/garment-chemise.jpg";
import polo from "@/assets/garment-polo.jpg";
import gilet from "@/assets/garment-gilet.jpg";
import ensembleGarcon from "@/assets/garment-ensemble-garcon.jpg";
import bapteme from "@/assets/garment-bapteme.jpg";
import tenueFete from "@/assets/garment-tenue-fete.jpg";
import miniBoubou from "@/assets/garment-mini-boubou.jpg";
import casualEnfant from "@/assets/garment-casual-enfant.jpg";
import scolaire from "@/assets/garment-scolaire.jpg";

// Fabric images
import fabricWax from "@/assets/fabric-wax.jpg";
import fabricBazin from "@/assets/fabric-bazin.jpg";
import fabricSoie from "@/assets/fabric-soie.jpg";
import fabricSatin from "@/assets/fabric-satin.jpg";
import fabricDentelle from "@/assets/fabric-dentelle.jpg";
import fabricMousseline from "@/assets/fabric-mousseline.jpg";
import fabricLin from "@/assets/fabric-lin.jpg";
import fabricCoton from "@/assets/fabric-coton.jpg";
import fabricVelours from "@/assets/fabric-velours.jpg";
import fabricBrocart from "@/assets/fabric-brocart.jpg";
import fabricOrganza from "@/assets/fabric-organza.jpg";
import fabricCrepe from "@/assets/fabric-crepe.jpg";
import fabricGabardine from "@/assets/fabric-gabardine.jpg";
import fabricDenim from "@/assets/fabric-denim.jpg";
import fabricKente from "@/assets/fabric-kente.jpg";
import fabricBogolan from "@/assets/fabric-bogolan.jpg";
import tissus from "@/assets/tissus-varietes.jpg";

// Occasion images
import occasionMariage from "@/assets/occasion-mariage.jpg";
import occasionBapteme from "@/assets/occasion-bapteme.jpg";
import occasionAnniversaire from "@/assets/occasion-anniversaire.jpg";
import occasionStValentin from "@/assets/occasion-saint-valentin.jpg";
import occasion8Mars from "@/assets/occasion-8mars.jpg";
import occasionCeremonie from "@/assets/occasion-ceremonie.jpg";
import occasionDefile from "@/assets/occasion-defile.jpg";
import occasionConcours from "@/assets/occasion-concours.jpg";
import occasionReligieuse from "@/assets/occasion-religieuse.jpg";
import occasionProfessionnel from "@/assets/occasion-professionnel.jpg";
import occasionSoiree from "@/assets/occasion-soiree.jpg";
import occasionQuotidien from "@/assets/occasion-quotidien.jpg";
import saintValentin from "@/assets/saint-valentin.jpg";

export const genderOptions = [
  { value: "Femme", label: "Femme", image: journeeFemme },
  { value: "Homme", label: "Homme", image: collectionHomme },
  { value: "Enfant", label: "Enfant", image: collectionEnfants },
];

export const garmentImages: Record<string, string> = {
  "Robe de soirée": robeSoiree,
  "Robe longue": robeLongue,
  "Robe courte": journeeFemme,
  "Robe de mariée": robeMariee,
  "Jupe maxi": jupeMaxi,
  "Jupe midi": jupeMidi,
  "Jupe crayon": jupeCrayon,
  "Jupe patineuse": jupePatineuse,
  "Ensemble tailleur": tailleur,
  "Blouse": blouse,
  "Chemisier": chemisier,
  "Pantalon": collectionHomme,
  "Combinaison": combinaison,
  "Boubou": boubou,
  "Caftan": caftan,
  "Pagne noué": pagneNoue,
  "Corsage": corsage,
  "Tunique": tunique,
  "Tenue de cérémonie": fashionShow,
  "Tenue de choriste": choristes,
  "Costume complet": collectionHomme,
  "Veste": tenuePro,
  "Chemise": chemise,
  "Polo": polo,
  "Gilet": gilet,
  "Dashiki": dashiki,
  "Agbada": agbada,
  "Tenue traditionnelle": boubou,
  "Tenue professionnelle": tenuePro,
  "Robe fille": collectionEnfants,
  "Ensemble garçon": ensembleGarcon,
  "Tenue de baptême": bapteme,
  "Tenue scolaire": scolaire,
  "Tenue de fête": tenueFete,
  "Mini boubou": miniBoubou,
  "Ensemble casual": casualEnfant,
};

export const garmentCategories: Record<string, string[]> = {
  Femme: [
    "Robe longue", "Robe courte", "Robe de soirée", "Robe de mariée",
    "Jupe maxi", "Jupe midi", "Jupe crayon", "Jupe patineuse",
    "Ensemble tailleur", "Blouse", "Chemisier", "Pantalon", "Combinaison",
    "Boubou", "Caftan", "Pagne noué", "Corsage", "Tunique",
    "Tenue de cérémonie", "Tenue de choriste",
  ],
  Homme: [
    "Costume complet", "Veste", "Pantalon", "Chemise", "Polo",
    "Gilet", "Boubou", "Caftan", "Dashiki", "Agbada",
    "Tenue traditionnelle", "Tenue de cérémonie", "Tenue professionnelle",
  ],
  Enfant: [
    "Robe fille", "Ensemble garçon", "Tenue de baptême", "Tenue scolaire",
    "Tenue de fête", "Mini boubou", "Ensemble casual",
  ],
};

export const fabricOptions = [
  { value: "Wax (pagne imprimé)", label: "Wax", image: fabricWax },
  { value: "Bazin riche", label: "Bazin riche", image: fabricBazin },
  { value: "Soie", label: "Soie", image: fabricSoie },
  { value: "Satin", label: "Satin", image: fabricSatin },
  { value: "Dentelle", label: "Dentelle", image: fabricDentelle },
  { value: "Mousseline", label: "Mousseline", image: fabricMousseline },
  { value: "Lin", label: "Lin", image: fabricLin },
  { value: "Coton uni", label: "Coton", image: fabricCoton },
  { value: "Velours", label: "Velours", image: fabricVelours },
  { value: "Brocart", label: "Brocart", image: fabricBrocart },
  { value: "Organza", label: "Organza", image: fabricOrganza },
  { value: "Crêpe", label: "Crêpe", image: fabricCrepe },
  { value: "Gabardine", label: "Gabardine", image: fabricGabardine },
  { value: "Jean/Denim", label: "Denim", image: fabricDenim },
  { value: "Kente", label: "Kente", image: fabricKente },
  { value: "Bogolan", label: "Bogolan", image: fabricBogolan },
];

export const ethnicFabrics = [
  { value: "Pagne Baoulé (Kita)", label: "Baoulé (Kita)", image: fabricWax },
  { value: "Pagne Sénoufo", label: "Sénoufo", image: fabricBogolan },
  { value: "Pagne Dan / Yacouba", label: "Dan / Yacouba", image: tissus },
  { value: "Pagne Gouro", label: "Gouro", image: fabricKente },
  { value: "Pagne Bété", label: "Bété", image: tissus },
  { value: "Pagne Dida", label: "Dida", image: fabricWax },
  { value: "Pagne Agni", label: "Agni", image: fabricBazin },
  { value: "Pagne Dioula (Korhogo)", label: "Dioula (Korhogo)", image: fabricBogolan },
  { value: "Pagne Wê / Guéré", label: "Wê / Guéré", image: tissus },
  { value: "Pagne Malinké", label: "Malinké", image: fabricKente },
  { value: "Pagne Adjoukrou", label: "Adjoukrou", image: fabricWax },
  { value: "Pagne Abbey", label: "Abbey", image: tissus },
  { value: "Pagne Lobi", label: "Lobi", image: fabricBogolan },
  { value: "Faso Dan Fani (Burkina)", label: "Faso Dan Fani", image: fabricKente },
  { value: "Kente (Ghana/Akan)", label: "Kente (Ghana)", image: fabricKente },
  { value: "Aucun / Autre", label: "Aucun / Autre" },
];

export const occasionOptions = [
  { value: "Mariage", label: "Mariage", image: occasionMariage },
  { value: "Baptême", label: "Baptême", image: occasionBapteme },
  { value: "Anniversaire", label: "Anniversaire", image: occasionAnniversaire },
  { value: "Saint-Valentin", label: "Saint-Valentin", image: occasionStValentin },
  { value: "8 Mars", label: "8 Mars", image: occasion8Mars },
  { value: "Cérémonie officielle", label: "Cérémonie", image: occasionCeremonie },
  { value: "Défilé de mode", label: "Défilé", image: occasionDefile },
  { value: "Concours de beauté", label: "Concours", image: occasionConcours },
  { value: "Fête religieuse", label: "Fête religieuse", image: occasionReligieuse },
  { value: "Événement professionnel", label: "Professionnel", image: occasionProfessionnel },
  { value: "Sortie/Soirée", label: "Sortie/Soirée", image: occasionSoiree },
  { value: "Tenue quotidienne", label: "Quotidienne", image: occasionQuotidien },
  { value: "Autre", label: "Autre" },
];

export const paymentMethods = [
  { value: "orange_money", label: "Orange Money", color: "bg-orange-500" },
  { value: "wave", label: "Wave", color: "bg-blue-500" },
  { value: "mtn_money", label: "MTN Money", color: "bg-yellow-500" },
  { value: "sur_place", label: "Paiement sur place", color: "bg-elegant-500" },
];
