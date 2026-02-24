import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Save, Loader2 } from "lucide-react";

const AdminSettings = () => {
  const [settings, setSettings] = useState({
    site_title: "Clémence KANGAH",
    site_description: "Nouvelle Trace Féminine – À la couture de l'être et à l'ouvrage du monde",
    contact_email: "innocentkoffi1@gmail.com",
    contact_phone: "+225 07 79 99 78 73",
    contact_address: "Daloa, Haut-Sassandra, Côte d'Ivoire",
    social_facebook: "",
    social_instagram: "",
    social_whatsapp: "2250779997873",
  });
  const [saving, setSaving] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    supabase.from("site_settings").select("*").then(({ data }) => {
      if (data) {
        const merged = { ...settings };
        data.forEach((row) => {
          if (row.key in merged) {
            (merged as any)[row.key] = typeof row.value === "string" ? row.value : JSON.stringify(row.value) || "";
          }
        });
        setSettings(merged);
      }
    });
  }, []);

  const handleSave = async () => {
    setSaving(true);
    for (const [key, value] of Object.entries(settings)) {
      await supabase.from("site_settings").upsert(
        { key, value: value as any },
        { onConflict: "key" }
      );
    }
    setSaving(false);
    toast({ title: "Paramètres enregistrés" });
  };

  const update = (key: string, value: string) => setSettings((s) => ({ ...s, [key]: value }));

  return (
    <div className="p-6 md:p-8 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl md:text-3xl font-playfair font-bold text-foreground">Paramètres</h1>
          <p className="text-sm text-muted-foreground mt-1">Configuration générale du site</p>
        </div>
        <Button onClick={handleSave} disabled={saving} className="bg-elegant-600 hover:bg-elegant-700">
          {saving ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : <Save className="w-4 h-4 mr-2" />}
          Enregistrer
        </Button>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader><CardTitle className="text-base">Informations du site</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            <div><Label>Titre du site</Label><Input value={settings.site_title} onChange={(e) => update("site_title", e.target.value)} /></div>
            <div><Label>Description</Label><Textarea value={settings.site_description} onChange={(e) => update("site_description", e.target.value)} rows={3} /></div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle className="text-base">Contact</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            <div><Label>Email</Label><Input type="email" value={settings.contact_email} onChange={(e) => update("contact_email", e.target.value)} /></div>
            <div><Label>Téléphone</Label><Input value={settings.contact_phone} onChange={(e) => update("contact_phone", e.target.value)} /></div>
            <div><Label>Adresse</Label><Input value={settings.contact_address} onChange={(e) => update("contact_address", e.target.value)} /></div>
          </CardContent>
        </Card>

        <Card className="lg:col-span-2">
          <CardHeader><CardTitle className="text-base">Réseaux sociaux</CardTitle></CardHeader>
          <CardContent className="grid sm:grid-cols-3 gap-4">
            <div><Label>Facebook</Label><Input placeholder="URL Facebook" value={settings.social_facebook} onChange={(e) => update("social_facebook", e.target.value)} /></div>
            <div><Label>Instagram</Label><Input placeholder="URL Instagram" value={settings.social_instagram} onChange={(e) => update("social_instagram", e.target.value)} /></div>
            <div><Label>WhatsApp</Label><Input placeholder="Numéro WhatsApp" value={settings.social_whatsapp} onChange={(e) => update("social_whatsapp", e.target.value)} /></div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminSettings;
