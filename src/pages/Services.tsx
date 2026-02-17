import React, { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { Scissors, BookOpen, Users, Palette, MessageCircle, ArrowRight } from "lucide-react";

const iconMap: Record<string, any> = {
  couture: Scissors, formation: BookOpen, coaching: Users,
  consulting: Palette, conference: MessageCircle, edition: BookOpen,
};

const Services = () => {
  const [services, setServices] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase
      .from("services")
      .select("*")
      .eq("is_active", true)
      .order("sort_order")
      .then(({ data }) => { setServices(data || []); setLoading(false); });
  }, []);

  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="pt-20 pb-16">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-5xl font-playfair font-bold text-elegant-800 mb-4">
                Mes Services
              </h1>
              <div className="w-24 h-1 bg-gradient-to-r from-elegant-400 to-rose-400 mx-auto mb-4"></div>
              <p className="text-lg text-muted-foreground">Des prestations sur mesure pour vous accompagner</p>
            </div>

            {loading ? (
              <div className="flex justify-center py-12">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-elegant-600"></div>
              </div>
            ) : services.length === 0 ? (
              <div className="text-center py-16">
                <p className="text-lg text-muted-foreground">Les services seront bientôt disponibles.</p>
              </div>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {services.map((service) => {
                  const Icon = iconMap[service.category] || Scissors;
                  return (
                    <Card key={service.id} className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
                      <CardContent className="p-6 text-center">
                        <div className="w-16 h-16 bg-elegant-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-elegant-200 transition-colors">
                          <Icon className="w-8 h-8 text-elegant-600" />
                        </div>
                        <h3 className="font-playfair font-semibold text-lg mb-2">{service.title}</h3>
                        {service.description && (
                          <p className="text-sm text-muted-foreground mb-4">{service.description}</p>
                        )}
                        <Badge variant="outline" className="mb-4">
                          {service.price ? `${service.price.toLocaleString()} FCFA` : "Sur devis"}
                        </Badge>
                        <div>
                          <Button
                            variant="outline"
                            size="sm"
                            className="border-elegant-300 text-elegant-600"
                            onClick={() => { const el = document.getElementById("contact"); if (el) { el.scrollIntoView({ behavior: "smooth" }); } else { window.location.assign("/#contact"); } }}
                          >
                            Demander <ArrowRight className="w-3 h-3 ml-1" />
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
      <Footer />
    </div>
  );
};

export default Services;
