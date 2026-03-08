import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Star, Send } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

const ReviewForm = ({ trigger }: { trigger: React.ReactNode }) => {
  const { toast } = useToast();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [rating, setRating] = useState(5);
  const [hoverRating, setHoverRating] = useState(0);
  const [form, setForm] = useState({ client_name: "", client_email: "", title: "", comment: "", service_type: "couture" });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const { error } = await supabase.from("reviews").insert({
      ...form,
      rating,
    } as any);
    setLoading(false);
    if (error) {
      toast({ title: "Erreur", description: "Impossible d'envoyer votre avis.", variant: "destructive" });
    } else {
      toast({ title: "Merci !", description: "Votre avis a été soumis et sera publié après validation." });
      setForm({ client_name: "", client_email: "", title: "", comment: "", service_type: "couture" });
      setRating(5);
      setOpen(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle className="font-playfair text-2xl text-elegant-800">Laisser votre avis</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <Input placeholder="Votre nom *" required value={form.client_name} onChange={e => setForm(f => ({ ...f, client_name: e.target.value }))} />
            <Input type="email" placeholder="Votre email *" required value={form.client_email} onChange={e => setForm(f => ({ ...f, client_email: e.target.value }))} />
          </div>

          <div>
            <label className="text-sm font-medium text-foreground mb-2 block">Votre note</label>
            <div className="flex gap-1">
              {[1, 2, 3, 4, 5].map(s => (
                <button key={s} type="button" onMouseEnter={() => setHoverRating(s)} onMouseLeave={() => setHoverRating(0)} onClick={() => setRating(s)}>
                  <Star className={`w-7 h-7 transition-colors ${s <= (hoverRating || rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`} />
                </button>
              ))}
            </div>
          </div>

          <Select value={form.service_type} onValueChange={v => setForm(f => ({ ...f, service_type: v }))}>
            <SelectTrigger><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="couture">Couture sur mesure</SelectItem>
              <SelectItem value="robe-mariee">Robe de mariée</SelectItem>
              <SelectItem value="evenementiel">Habillement événementiel</SelectItem>
              <SelectItem value="formation">Formation couture</SelectItem>
              <SelectItem value="boutique">Achat boutique</SelectItem>
              <SelectItem value="autre">Autre</SelectItem>
            </SelectContent>
          </Select>

          <Input placeholder="Titre de votre avis" value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value }))} />
          <Textarea placeholder="Décrivez votre expérience... *" required rows={4} value={form.comment} onChange={e => setForm(f => ({ ...f, comment: e.target.value }))} />

          <Button type="submit" disabled={loading} className="w-full bg-elegant-600 hover:bg-elegant-700 text-white">
            <Send className="w-4 h-4 mr-2" /> {loading ? "Envoi..." : "Envoyer mon avis"}
          </Button>
          <p className="text-xs text-muted-foreground text-center">Votre avis sera publié après validation par notre équipe.</p>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ReviewForm;
