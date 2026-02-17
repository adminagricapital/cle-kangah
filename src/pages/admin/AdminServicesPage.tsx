import React, { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Plus, Edit, Trash2, Save, X } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

interface Service {
  id: string;
  title: string;
  description: string | null;
  price: number | null;
  price_type: string;
  category: string;
  is_active: boolean;
}

const AdminServices = () => {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [showDialog, setShowDialog] = useState(false);
  const [editing, setEditing] = useState<Service | null>(null);
  const [form, setForm] = useState({ title: "", description: "", price: "", price_type: "on_request", category: "couture" });
  const { toast } = useToast();

  const fetchServices = async () => {
    const { data } = await supabase.from("services").select("*").order("sort_order");
    setServices(data || []);
    setLoading(false);
  };

  useEffect(() => { fetchServices(); }, []);

  const openNew = () => {
    setEditing(null);
    setForm({ title: "", description: "", price: "", price_type: "on_request", category: "couture" });
    setShowDialog(true);
  };

  const openEdit = (s: Service) => {
    setEditing(s);
    setForm({
      title: s.title,
      description: s.description || "",
      price: s.price?.toString() || "",
      price_type: s.price_type,
      category: s.category,
    });
    setShowDialog(true);
  };

  const handleSave = async () => {
    const payload = {
      title: form.title,
      description: form.description || null,
      price: form.price ? parseFloat(form.price) : null,
      price_type: form.price_type,
      category: form.category,
    };

    if (editing) {
      await supabase.from("services").update(payload).eq("id", editing.id);
      toast({ title: "Service mis à jour" });
    } else {
      await supabase.from("services").insert(payload);
      toast({ title: "Service créé" });
    }
    setShowDialog(false);
    fetchServices();
  };

  const deleteService = async (id: string) => {
    if (!confirm("Supprimer ce service ?")) return;
    await supabase.from("services").delete().eq("id", id);
    toast({ title: "Service supprimé" });
    fetchServices();
  };

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-playfair font-bold text-foreground">Services</h1>
        <Button className="bg-elegant-600 hover:bg-elegant-700" onClick={openNew}>
          <Plus className="w-4 h-4 mr-2" /> Nouveau service
        </Button>
      </div>

      {loading ? (
        <div className="flex justify-center py-12">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-elegant-600"></div>
        </div>
      ) : services.length === 0 ? (
        <Card><CardContent className="p-12 text-center text-muted-foreground">Aucun service</CardContent></Card>
      ) : (
        <div className="grid md:grid-cols-2 gap-4">
          {services.map((s) => (
            <Card key={s.id}>
              <CardContent className="p-4">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-semibold">{s.title}</h3>
                    {s.description && <p className="text-sm text-muted-foreground mt-1">{s.description}</p>}
                    <p className="text-sm font-medium mt-2 text-elegant-600">
                      {s.price ? `${s.price.toLocaleString()} FCFA` : "Sur devis"}
                    </p>
                  </div>
                  <div className="flex gap-1">
                    <Button variant="ghost" size="icon" onClick={() => openEdit(s)}><Edit className="w-4 h-4" /></Button>
                    <Button variant="ghost" size="icon" onClick={() => deleteService(s.id)}><Trash2 className="w-4 h-4 text-destructive" /></Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      <Dialog open={showDialog} onOpenChange={setShowDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{editing ? "Modifier le service" : "Nouveau service"}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 pt-4">
            <Input placeholder="Nom du service" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />
            <Textarea placeholder="Description" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} rows={3} />
            <div className="grid grid-cols-2 gap-3">
              <Input placeholder="Prix (FCFA)" type="number" value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} />
              <select
                value={form.price_type}
                onChange={(e) => setForm({ ...form, price_type: e.target.value })}
                className="rounded-md border border-input bg-background px-3 py-2 text-sm"
              >
                <option value="fixed">Fixe</option>
                <option value="hourly">Par heure</option>
                <option value="monthly">Mensuel</option>
                <option value="on_request">Sur devis</option>
              </select>
            </div>
            <select
              value={form.category}
              onChange={(e) => setForm({ ...form, category: e.target.value })}
              className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
            >
              <option value="couture">Couture</option>
              <option value="formation">Formation</option>
              <option value="coaching">Coaching</option>
              <option value="consulting">Consulting</option>
              <option value="conference">Conférence</option>
              <option value="edition">Édition</option>
            </select>
            <Button className="w-full bg-elegant-600 hover:bg-elegant-700" onClick={handleSave}>
              <Save className="w-4 h-4 mr-2" /> Enregistrer
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminServices;
