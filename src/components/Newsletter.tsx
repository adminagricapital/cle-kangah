import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Mail, Loader2 } from "lucide-react";

const Newsletter = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const { error } = await supabase.from("newsletter_subscribers").insert({ email });
    setLoading(false);
    if (error) {
      if (error.code === "23505") {
        toast({ title: "Déjà inscrit(e)", description: "Cet email est déjà dans notre liste." });
      } else {
        toast({ title: "Erreur", description: "Impossible de s'inscrire.", variant: "destructive" });
      }
      return;
    }
    toast({ title: "Merci !", description: "Vous êtes inscrit(e) à la newsletter." });
    setEmail("");
  };

  return (
    <section className="py-16 bg-elegant-800">
      <div className="container mx-auto px-4 text-center">
        <div className="max-w-xl mx-auto">
          <Mail className="w-10 h-10 text-elegant-300 mx-auto mb-4" />
          <h3 className="text-2xl font-playfair font-bold text-white mb-2">
            Restez connecté(e)
          </h3>
          <p className="text-elegant-300 mb-6">
            Recevez les dernières actualités et inspirations directement dans votre boîte mail
          </p>
          <form onSubmit={handleSubmit} className="flex gap-2 max-w-md mx-auto">
            <Input
              type="email"
              placeholder="Votre email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:border-elegant-400"
            />
            <Button type="submit" className="bg-elegant-500 hover:bg-elegant-400 text-white shrink-0" disabled={loading}>
              {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : "S'inscrire"}
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;
