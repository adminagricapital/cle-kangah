import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Scissors, CheckCircle, Loader2, Ruler, CreditCard, Smartphone } from "lucide-react";
import {
  genderOptions, garmentImages, garmentCategories, fabricOptions,
  ethnicFabrics, occasionOptions, paymentMethods
} from "@/data/commander-options";
import ModelGenerator from "@/components/ModelGenerator";
import {
  genderOptions, garmentImages, garmentCategories, fabricOptions,
  ethnicFabrics, occasionOptions, paymentMethods
} from "@/data/commander-options";

// Visual selector component
const VisualSelector = ({ label, options, value, onChange, required }: {
  label: string;
  options: { value: string; label: string; image?: string }[];
  value: string;
  onChange: (v: string) => void;
  required?: boolean;
}) => (
  <div>
    <Label>{label} {required && "*"}</Label>
    <div className="grid grid-cols-3 sm:grid-cols-4 gap-2 mt-2 max-h-64 overflow-y-auto">
      {options.map((opt) => (
        <button
          key={opt.value}
          type="button"
          onClick={() => onChange(opt.value)}
          className={`relative rounded-xl overflow-hidden border-2 transition-all text-left ${
            value === opt.value
              ? "border-elegant-600 ring-2 ring-elegant-300 shadow-lg"
              : "border-border hover:border-elegant-300"
          }`}
        >
          {opt.image && (
            <img src={opt.image} alt={opt.label} className="w-full h-16 object-cover" />
          )}
          <div className={`px-2 py-1.5 text-xs font-medium truncate ${opt.image ? '' : 'py-3 text-center'} ${
            value === opt.value ? "bg-elegant-50 text-elegant-700" : "text-foreground"
          }`}>
            {opt.label}
          </div>
          {value === opt.value && (
            <div className="absolute top-1 right-1 w-4 h-4 bg-elegant-600 rounded-full flex items-center justify-center">
              <CheckCircle className="w-3 h-3 text-white" />
            </div>
          )}
        </button>
      ))}
    </div>
  </div>
);

const Commander = () => {
  const { toast } = useToast();
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [form, setForm] = useState({
    client_name: "", client_email: "", client_phone: "",
    gender: "", garment_type: "", garment_category: "",
    fabric_type: "", ethnic_fabric: "", quantity: "1",
    occasion: "", delivery_date: "", notes: "", payment_method: "",
    tour_poitrine: "", tour_taille: "", tour_hanches: "",
    longueur: "", tour_bras: "", epaules: "",
  });

  const update = (key: string, val: string) => setForm(f => ({ ...f, [key]: val }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    const measurements = {
      tour_poitrine: form.tour_poitrine, tour_taille: form.tour_taille,
      tour_hanches: form.tour_hanches, longueur: form.longueur,
      tour_bras: form.tour_bras, epaules: form.epaules,
    };

    const { error } = await supabase.from("custom_orders").insert({
      client_name: form.client_name, client_email: form.client_email,
      client_phone: form.client_phone, gender: form.gender.toLowerCase(),
      garment_type: form.garment_type, garment_category: form.garment_category,
      fabric_type: form.fabric_type, ethnic_fabric: form.ethnic_fabric || null,
      quantity: parseInt(form.quantity) || 1, measurements,
      occasion: form.occasion || null, delivery_date: form.delivery_date || null,
      notes: form.notes ? `${form.notes}\n\nPaiement: ${form.payment_method}` : `Paiement: ${form.payment_method}`,
    });

    setSubmitting(false);
    if (error) {
      toast({ title: "Erreur", description: "Impossible d'envoyer la commande.", variant: "destructive" });
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
              Merci pour votre confiance. Notre équipe vous contactera dans les 24h.
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
  const garmentOpts = currentGarments.map(g => ({
    value: g, label: g, image: garmentImages[g],
  }));

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
              Choisissez visuellement vos options et passez votre commande de couture sur mesure.
            </p>
          </div>
        </div>

        <div className="container mx-auto px-4">
          <form onSubmit={handleSubmit} className="max-w-4xl mx-auto space-y-8">
            {/* Infos */}
            <Card>
              <CardHeader><CardTitle className="font-playfair text-elegant-800">Vos Informations</CardTitle></CardHeader>
              <CardContent className="grid sm:grid-cols-2 gap-4">
                <div>
                  <Label>Nom complet *</Label>
                  <Input required value={form.client_name} onChange={e => update("client_name", e.target.value)} placeholder="Votre nom" />
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

            {/* Genre - Visual */}
            <Card>
              <CardHeader><CardTitle className="font-playfair text-elegant-800">Genre & Vêtement</CardTitle></CardHeader>
              <CardContent className="space-y-6">
                <VisualSelector label="Genre" options={genderOptions} value={form.gender} onChange={v => { update("gender", v); update("garment_category", ""); }} required />
                
                {form.gender && (
                  <VisualSelector label="Type de vêtement" options={garmentOpts} value={form.garment_category} onChange={v => update("garment_category", v)} required />
                )}

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <Label>Catégorie / Description *</Label>
                    <Input required value={form.garment_type} onChange={e => update("garment_type", e.target.value)} placeholder="Ex: Tenue de mariage, casual..." />
                  </div>
                  <div>
                    <Label>Quantité</Label>
                    <Input type="number" min={1} value={form.quantity} onChange={e => update("quantity", e.target.value)} />
                  </div>
                </div>

                <VisualSelector
                  label="Occasion"
                  options={occasionOptions}
                  value={form.occasion}
                  onChange={v => update("occasion", v)}
                />
              </CardContent>
            </Card>

            {/* Tissus - Visual */}
            <Card>
              <CardHeader><CardTitle className="font-playfair text-elegant-800">Choix du Tissu</CardTitle></CardHeader>
              <CardContent className="space-y-6">
                <VisualSelector label="Type de tissu" options={fabricOptions} value={form.fabric_type} onChange={v => update("fabric_type", v)} required />
                <VisualSelector
                  label="Pagne traditionnel (optionnel)"
                  options={ethnicFabrics}
                  value={form.ethnic_fabric}
                  onChange={v => update("ethnic_fabric", v)}
                />
              </CardContent>
            </Card>

            {/* Mesures */}
            <Card>
              <CardHeader>
                <CardTitle className="font-playfair text-elegant-800 flex items-center gap-2">
                  <Ruler className="w-5 h-5" /> Vos Mesures (cm) — Optionnel
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Si vous ne connaissez pas vos mesures, nous organiserons un rendez-vous.
                </p>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                  {[
                    { key: "tour_poitrine", label: "Tour de poitrine" },
                    { key: "tour_taille", label: "Tour de taille" },
                    { key: "tour_hanches", label: "Tour de hanches" },
                    { key: "longueur", label: "Longueur" },
                    { key: "tour_bras", label: "Tour de bras" },
                    { key: "epaules", label: "Épaules" },
                  ].map(m => (
                    <div key={m.key}>
                      <Label>{m.label}</Label>
                      <Input type="number" value={(form as any)[m.key]} onChange={e => update(m.key, e.target.value)} placeholder="cm" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Paiement Mobile Money */}
            <Card>
              <CardHeader>
                <CardTitle className="font-playfair text-elegant-800 flex items-center gap-2">
                  <Smartphone className="w-5 h-5" /> Mode de Paiement
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {paymentMethods.map(pm => (
                    <button
                      key={pm.value}
                      type="button"
                      onClick={() => update("payment_method", pm.value)}
                      className={`rounded-xl border-2 p-4 text-center transition-all ${
                        form.payment_method === pm.value
                          ? "border-elegant-600 ring-2 ring-elegant-300 shadow-lg"
                          : "border-border hover:border-elegant-300"
                      }`}
                    >
                      <div className={`w-10 h-10 ${pm.color} rounded-full mx-auto mb-2 flex items-center justify-center`}>
                        {pm.value === "sur_place" ? (
                          <CreditCard className="w-5 h-5 text-white" />
                        ) : (
                          <Smartphone className="w-5 h-5 text-white" />
                        )}
                      </div>
                      <span className="text-xs font-medium text-foreground">{pm.label}</span>
                    </button>
                  ))}
                </div>
                {form.payment_method && form.payment_method !== "sur_place" && (
                  <p className="mt-4 text-sm text-muted-foreground bg-muted p-3 rounded-lg">
                    📱 Un lien de paiement {paymentMethods.find(p => p.value === form.payment_method)?.label} vous sera envoyé par SMS/WhatsApp après confirmation de votre commande.
                  </p>
                )}
              </CardContent>
            </Card>

            {/* Notes */}
            <Card>
              <CardHeader><CardTitle className="font-playfair text-elegant-800">Notes & Précisions</CardTitle></CardHeader>
              <CardContent>
                <Textarea rows={4} value={form.notes} onChange={e => update("notes", e.target.value)} placeholder="Décrivez vos souhaits : couleurs, motifs, style..." />
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
