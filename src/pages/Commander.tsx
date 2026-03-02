import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Scissors, CheckCircle, Loader2, Ruler } from "lucide-react";

const genderOptions = ["Femme", "Homme", "Enfant"];

const garmentCategories: Record<string, string[]> = {
  Femme: [
    "Robe longue", "Robe courte", "Robe de soirée", "Robe de mariée",
    "Jupe maxi", "Jupe midi", "Jupe crayon", "Jupe patineuse", "Jupe droite",
    "Ensemble tailleur", "Blouse", "Chemisier", "Pantalon", "Combinaison",
    "Boubou", "Caftan", "Pagne noué", "Corsage", "Tunique",
    "Tenue de cérémonie", "Tenue de Miss", "Tenue de choriste",
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

const fabricTypes = [
  "Wax (pagne imprimé)", "Bazin riche", "Bazin getzner", "Kita (coton tissé)",
  "Soie", "Satin", "Dentelle", "Mousseline", "Lin", "Coton uni",
  "Velours", "Brocart", "Organza", "Taffetas", "Crêpe",
  "Gabardine", "Jean/Denim", "Tissu kente", "Bogolan",
];

const ethnicFabrics = [
  "Pagne Baoulé (Kita)", "Pagne Sénoufo", "Pagne Dan / Yacouba",
  "Pagne Gouro", "Pagne Bété", "Pagne Dida", "Pagne Agni",
  "Pagne Dioula (Korhogo)", "Pagne Wê / Guéré", "Pagne Malinké",
  "Pagne Adjoukrou", "Pagne Abbey", "Pagne Lobi",
  "Faso Dan Fani (Burkina)", "Kente (Ghana/Akan)", "Aucun / Autre",
];

const occasionOptions = [
  "Mariage", "Baptême", "Anniversaire", "Saint-Valentin", "8 Mars",
  "Cérémonie officielle", "Défilé de mode", "Concours de beauté",
  "Fête religieuse", "Événement professionnel", "Sortie/Soirée",
  "Tenue quotidienne", "Autre",
];

const Commander = () => {
  const { toast } = useToast();
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [form, setForm] = useState({
    client_name: "", client_email: "", client_phone: "",
    gender: "", garment_type: "", garment_category: "",
    fabric_type: "", ethnic_fabric: "", quantity: "1",
    occasion: "", delivery_date: "", notes: "",
    tour_poitrine: "", tour_taille: "", tour_hanches: "",
    longueur: "", tour_bras: "", epaules: "",
  });

  const update = (key: string, val: string) => setForm(f => ({ ...f, [key]: val }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    const measurements = {
      tour_poitrine: form.tour_poitrine,
      tour_taille: form.tour_taille,
      tour_hanches: form.tour_hanches,
      longueur: form.longueur,
      tour_bras: form.tour_bras,
      epaules: form.epaules,
    };

    const { error } = await supabase.from("custom_orders").insert({
      client_name: form.client_name,
      client_email: form.client_email,
      client_phone: form.client_phone,
      gender: form.gender.toLowerCase(),
      garment_type: form.garment_type,
      garment_category: form.garment_category,
      fabric_type: form.fabric_type,
      ethnic_fabric: form.ethnic_fabric || null,
      quantity: parseInt(form.quantity) || 1,
      measurements,
      occasion: form.occasion || null,
      delivery_date: form.delivery_date || null,
      notes: form.notes || null,
    });

    setSubmitting(false);
    if (error) {
      toast({ title: "Erreur", description: "Impossible d'envoyer la commande. Réessayez.", variant: "destructive" });
      return;
    }
    setSuccess(true);
    toast({ title: "Commande envoyée !", description: "Nous vous contacterons sous 24h." });
  };

  if (success) {
    return (
      <div className="min-h-screen">
        <Navbar />
        <div className="pt-24 pb-20 container mx-auto px-4 text-center">
          <div className="max-w-lg mx-auto">
            <CheckCircle className="w-20 h-20 text-green-500 mx-auto mb-6" />
            <h1 className="text-3xl font-playfair font-bold text-elegant-800 mb-4">Commande envoyée !</h1>
            <p className="text-muted-foreground mb-8">
              Merci pour votre confiance. Notre équipe vous contactera dans les 24h 
              pour confirmer les détails et planifier votre rendez-vous de prise de mesures.
            </p>
            <Button onClick={() => setSuccess(false)} className="bg-elegant-600 hover:bg-elegant-700">
              Nouvelle commande
            </Button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  const currentGarments = garmentCategories[form.gender] || [];

  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="pt-20 pb-16">
        <div className="bg-gradient-elegant py-12 mb-8">
          <div className="container mx-auto px-4 text-center">
            <Scissors className="w-10 h-10 text-elegant-600 mx-auto mb-3" />
            <h1 className="text-3xl md:text-5xl font-playfair font-bold text-elegant-800 mb-3">
              Commander en Ligne
            </h1>
            <div className="w-24 h-1 bg-gradient-to-r from-elegant-400 to-rose-400 mx-auto mb-3" />
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Remplissez le formulaire ci-dessous pour passer votre commande de couture sur mesure. 
              Nous vous recontacterons sous 24h.
            </p>
          </div>
        </div>

        <div className="container mx-auto px-4">
          <form onSubmit={handleSubmit} className="max-w-4xl mx-auto space-y-8">
            {/* Informations personnelles */}
            <Card>
              <CardHeader>
                <CardTitle className="font-playfair text-elegant-800">Vos Informations</CardTitle>
              </CardHeader>
              <CardContent className="grid sm:grid-cols-2 gap-4">
                <div>
                  <Label>Nom complet *</Label>
                  <Input required value={form.client_name} onChange={e => update("client_name", e.target.value)} placeholder="Votre nom complet" />
                </div>
                <div>
                  <Label>Email *</Label>
                  <Input type="email" required value={form.client_email} onChange={e => update("client_email", e.target.value)} placeholder="votre@email.com" />
                </div>
                <div>
                  <Label>Téléphone *</Label>
                  <Input type="tel" required value={form.client_phone} onChange={e => update("client_phone", e.target.value)} placeholder="+225 XX XX XX XX XX" />
                </div>
                <div>
                  <Label>Date de livraison souhaitée</Label>
                  <Input type="date" value={form.delivery_date} onChange={e => update("delivery_date", e.target.value)} />
                </div>
              </CardContent>
            </Card>

            {/* Type de vêtement */}
            <Card>
              <CardHeader>
                <CardTitle className="font-playfair text-elegant-800">Le Vêtement</CardTitle>
              </CardHeader>
              <CardContent className="grid sm:grid-cols-2 gap-4">
                <div>
                  <Label>Genre *</Label>
                  <Select value={form.gender} onValueChange={v => { update("gender", v); update("garment_category", ""); }}>
                    <SelectTrigger><SelectValue placeholder="Sélectionner" /></SelectTrigger>
                    <SelectContent>
                      {genderOptions.map(g => <SelectItem key={g} value={g}>{g}</SelectItem>)}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Type de vêtement *</Label>
                  <Select value={form.garment_category} onValueChange={v => update("garment_category", v)} disabled={!form.gender}>
                    <SelectTrigger><SelectValue placeholder={form.gender ? "Choisir le type" : "Sélectionnez d'abord le genre"} /></SelectTrigger>
                    <SelectContent>
                      {currentGarments.map(g => <SelectItem key={g} value={g}>{g}</SelectItem>)}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Catégorie *</Label>
                  <Input required value={form.garment_type} onChange={e => update("garment_type", e.target.value)} placeholder="Ex: Tenue de mariage, casual..." />
                </div>
                <div>
                  <Label>Quantité</Label>
                  <Input type="number" min={1} value={form.quantity} onChange={e => update("quantity", e.target.value)} />
                </div>
                <div>
                  <Label>Occasion</Label>
                  <Select value={form.occasion} onValueChange={v => update("occasion", v)}>
                    <SelectTrigger><SelectValue placeholder="Sélectionner l'occasion" /></SelectTrigger>
                    <SelectContent>
                      {occasionOptions.map(o => <SelectItem key={o} value={o}>{o}</SelectItem>)}
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            {/* Tissus */}
            <Card>
              <CardHeader>
                <CardTitle className="font-playfair text-elegant-800">Choix du Tissu</CardTitle>
              </CardHeader>
              <CardContent className="grid sm:grid-cols-2 gap-4">
                <div>
                  <Label>Type de tissu *</Label>
                  <Select value={form.fabric_type} onValueChange={v => update("fabric_type", v)}>
                    <SelectTrigger><SelectValue placeholder="Choisir le tissu" /></SelectTrigger>
                    <SelectContent>
                      {fabricTypes.map(f => <SelectItem key={f} value={f}>{f}</SelectItem>)}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Pagne traditionnel (optionnel)</Label>
                  <Select value={form.ethnic_fabric} onValueChange={v => update("ethnic_fabric", v)}>
                    <SelectTrigger><SelectValue placeholder="Tissu ethnique" /></SelectTrigger>
                    <SelectContent>
                      {ethnicFabrics.map(f => <SelectItem key={f} value={f}>{f}</SelectItem>)}
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            {/* Mesures */}
            <Card>
              <CardHeader>
                <CardTitle className="font-playfair text-elegant-800 flex items-center gap-2">
                  <Ruler className="w-5 h-5" /> Vos Mesures (en cm) — Optionnel
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Si vous ne connaissez pas vos mesures, nous organiserons un rendez-vous de prise de mesures.
                </p>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                  <div>
                    <Label>Tour de poitrine</Label>
                    <Input type="number" value={form.tour_poitrine} onChange={e => update("tour_poitrine", e.target.value)} placeholder="cm" />
                  </div>
                  <div>
                    <Label>Tour de taille</Label>
                    <Input type="number" value={form.tour_taille} onChange={e => update("tour_taille", e.target.value)} placeholder="cm" />
                  </div>
                  <div>
                    <Label>Tour de hanches</Label>
                    <Input type="number" value={form.tour_hanches} onChange={e => update("tour_hanches", e.target.value)} placeholder="cm" />
                  </div>
                  <div>
                    <Label>Longueur</Label>
                    <Input type="number" value={form.longueur} onChange={e => update("longueur", e.target.value)} placeholder="cm" />
                  </div>
                  <div>
                    <Label>Tour de bras</Label>
                    <Input type="number" value={form.tour_bras} onChange={e => update("tour_bras", e.target.value)} placeholder="cm" />
                  </div>
                  <div>
                    <Label>Épaules</Label>
                    <Input type="number" value={form.epaules} onChange={e => update("epaules", e.target.value)} placeholder="cm" />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Notes */}
            <Card>
              <CardHeader>
                <CardTitle className="font-playfair text-elegant-800">Notes & Précisions</CardTitle>
              </CardHeader>
              <CardContent>
                <Textarea
                  rows={4}
                  value={form.notes}
                  onChange={e => update("notes", e.target.value)}
                  placeholder="Décrivez vos souhaits : couleurs, motifs, style, références d'images..."
                />
              </CardContent>
            </Card>

            <Button type="submit" size="lg" className="w-full bg-elegant-600 hover:bg-elegant-700 text-white py-4 text-lg" disabled={submitting}>
              {submitting ? <Loader2 className="w-5 h-5 animate-spin mr-2" /> : <CheckCircle className="w-5 h-5 mr-2" />}
              Envoyer ma commande
            </Button>
          </form>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Commander;
