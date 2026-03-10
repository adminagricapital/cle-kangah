import React, { useEffect, useState } from "react";
import SEOHead from "@/components/SEOHead";
import StructuredData from "@/components/StructuredData";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { supabase } from "@/integrations/supabase/client";
import { Scissors, BookOpen, Users, Palette, MessageCircle, ArrowRight, Calendar, CheckCircle, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

const iconMap: Record<string, any> = {
  couture: Scissors, formation: BookOpen, coaching: Users,
  consulting: Palette, conference: MessageCircle, edition: BookOpen,
};

const categoryLabels: Record<string, string> = {
  couture: "Couture", formation: "Formation", coaching: "Coaching",
  consulting: "Consulting", conference: "Conférence", edition: "Édition",
};

const Services = () => {
  const [services, setServices] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [bookingService, setBookingService] = useState<any>(null);
  const [bookingForm, setBookingForm] = useState({ client_name: "", client_email: "", client_phone: "", booking_date: "", notes: "" });
  const [submitting, setSubmitting] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    supabase
      .from("services")
      .select("*")
      .eq("is_active", true)
      .order("sort_order")
      .then(({ data }) => { setServices(data || []); setLoading(false); });
  }, []);

  const categories = ["all", ...Array.from(new Set(services.map((s) => s.category)))];
  const filtered = activeCategory === "all" ? services : services.filter((s) => s.category === activeCategory);

  const handleBooking = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    const { error } = await supabase.from("bookings").insert({
      ...bookingForm,
      service_id: bookingService?.id,
      booking_date: new Date(bookingForm.booking_date).toISOString(),
    });
    setSubmitting(false);
    if (error) {
      toast({ title: "Erreur", description: "Impossible d'envoyer la demande.", variant: "destructive" });
      return;
    }
    toast({ title: "Demande envoyée !", description: "Nous reviendrons vers vous très bientôt." });
    setBookingService(null);
    setBookingForm({ client_name: "", client_email: "", client_phone: "", booking_date: "", notes: "" });
  };

  return (
    <div className="min-h-screen">
      <SEOHead
        title="Nos Services – Couture, Formation, Coaching & Événementiel | CK Couture"
        description="Services professionnels de Clémence KANGAH : couture sur mesure, formation en couture, coaching entrepreneurial, consulting mode, conférences et édition. Réservez en ligne."
        path="/services"
      />
      <Navbar />
      {services.length > 0 && (
        <StructuredData data={{
          "@context": "https://schema.org",
          "@type": "ItemList",
          "name": "Services CK Couture",
          "itemListElement": services.map((s, i) => ({
            "@type": "ListItem",
            "position": i + 1,
            "item": {
              "@type": "Service",
              "name": s.title,
              "description": s.description,
              "provider": { "@type": "Person", "name": "Clémence KANGAH" },
              ...(s.price ? { "offers": { "@type": "Offer", "price": s.price, "priceCurrency": "XOF" } } : {})
            }
          }))
        }} />
      )}
      <main className="pt-20 pb-16">
        {/* Hero section */}
        <div className="bg-gradient-elegant py-16 mb-12">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-playfair font-bold text-elegant-800 mb-4">
              Mes Services
            </h1>
            <div className="w-24 h-1 bg-gradient-to-r from-elegant-400 to-rose-400 mx-auto mb-4"></div>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Des prestations sur mesure pour vous accompagner dans votre transformation
            </p>
          </div>
        </div>

        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            {/* Category filters */}
            <div className="flex flex-wrap justify-center gap-2 mb-10">
              {categories.map((cat) => (
                <Button
                  key={cat}
                  variant={activeCategory === cat ? "default" : "outline"}
                  size="sm"
                  className={activeCategory === cat ? "bg-elegant-600 hover:bg-elegant-700 text-white" : "border-elegant-300 text-elegant-600 hover:bg-elegant-50"}
                  onClick={() => setActiveCategory(cat)}
                >
                  {cat === "all" ? "Tous" : categoryLabels[cat] || cat}
                </Button>
              ))}
            </div>

            {loading ? (
              <div className="flex justify-center py-12">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-elegant-600"></div>
              </div>
            ) : filtered.length === 0 ? (
              <div className="text-center py-16">
                <p className="text-lg text-muted-foreground">Aucun service dans cette catégorie.</p>
              </div>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filtered.map((service) => {
                  const Icon = iconMap[service.category] || Scissors;
                  return (
                    <Card key={service.id} className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border-0 bg-card">
                      <CardContent className="p-6">
                        <div className="flex items-center gap-3 mb-4">
                          <div className="w-12 h-12 bg-elegant-100 rounded-xl flex items-center justify-center group-hover:bg-elegant-200 transition-colors">
                            <Icon className="w-6 h-6 text-elegant-600" />
                          </div>
                          <Badge variant="outline" className="text-xs">
                            {categoryLabels[service.category] || service.category}
                          </Badge>
                        </div>
                        <h3 className="font-playfair font-semibold text-lg mb-2 text-foreground">{service.title}</h3>
                        {service.description && (
                          <p className="text-sm text-muted-foreground mb-4 line-clamp-3">{service.description}</p>
                        )}
                        <div className="flex items-center justify-between mt-auto pt-4 border-t border-border">
                          <span className="font-semibold text-elegant-700">
                            {service.price ? `${service.price.toLocaleString()} FCFA` : "Sur devis"}
                          </span>
                          <Button
                            size="sm"
                            className="bg-elegant-600 hover:bg-elegant-700 text-white"
                            onClick={() => setBookingService(service)}
                          >
                            Réserver <Calendar className="w-3 h-3 ml-1" />
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Booking dialog */}
      <Dialog open={!!bookingService} onOpenChange={() => setBookingService(null)}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="font-playfair">Réserver : {bookingService?.title}</DialogTitle>
            <DialogDescription>Remplissez le formulaire pour demander ce service</DialogDescription>
          </DialogHeader>
          <form onSubmit={handleBooking} className="space-y-4 mt-2">
            <Input placeholder="Votre nom *" required value={bookingForm.client_name} onChange={(e) => setBookingForm((f) => ({ ...f, client_name: e.target.value }))} />
            <Input type="email" placeholder="Votre email *" required value={bookingForm.client_email} onChange={(e) => setBookingForm((f) => ({ ...f, client_email: e.target.value }))} />
            <Input type="tel" placeholder="Téléphone" value={bookingForm.client_phone} onChange={(e) => setBookingForm((f) => ({ ...f, client_phone: e.target.value }))} />
            <Input type="datetime-local" required value={bookingForm.booking_date} onChange={(e) => setBookingForm((f) => ({ ...f, booking_date: e.target.value }))} />
            <Textarea placeholder="Notes ou précisions" rows={3} value={bookingForm.notes} onChange={(e) => setBookingForm((f) => ({ ...f, notes: e.target.value }))} />
            <Button type="submit" className="w-full bg-elegant-600 hover:bg-elegant-700" disabled={submitting}>
              {submitting ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : <CheckCircle className="w-4 h-4 mr-2" />}
              Envoyer la demande
            </Button>
          </form>
        </DialogContent>
      </Dialog>

      <Footer />
    </div>
  );
};

export default Services;
