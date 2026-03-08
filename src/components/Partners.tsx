import React from "react";
import { Handshake } from "lucide-react";
import partnerUniwax from "@/assets/partner-uniwax.png";
import partnerMissCi from "@/assets/partner-miss-ci.png";
import partnerAk from "@/assets/partner-ak-confection.png";
import partnerWoodin from "@/assets/partner-woodin.png";
import partnerVlisco from "@/assets/partner-vlisco.png";
import partnerFapda from "@/assets/partner-fapda.png";

const partners = [
  { name: "UNIWAX", logo: partnerUniwax, desc: "Fabricant de tissus wax premium" },
  { name: "Miss Côte d'Ivoire", logo: partnerMissCi, desc: "Concours de beauté national" },
  { name: "AK Confection", logo: partnerAk, desc: "Maison de confection partenaire" },
  { name: "Woodin", logo: partnerWoodin, desc: "Marque de mode africaine" },
  { name: "Vlisco", logo: partnerVlisco, desc: "Tissus hollandais premium" },
  { name: "FAPDA", logo: partnerFapda, desc: "Fédération des professionnels de la mode" },
];

const Partners = () => (
  <section className="py-20 bg-muted">
    <div className="container mx-auto px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-14">
          <Handshake className="w-10 h-10 mx-auto mb-4 text-elegant-500" />
          <h2 className="text-4xl md:text-5xl font-playfair font-bold text-elegant-800 mb-4">
            Nos Partenaires
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-elegant-400 to-rose-400 mx-auto mb-6" />
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Des collaborations prestigieuses avec les plus grandes marques de tissus et maisons de mode d'Afrique
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 items-center">
          {partners.map((p) => (
            <div
              key={p.name}
              className="group flex flex-col items-center text-center p-4 rounded-xl hover:bg-white hover:shadow-lg transition-all duration-300"
            >
              <div className="w-24 h-24 mb-3 flex items-center justify-center group-hover:scale-110 transition-all duration-300">
                <img src={p.logo} alt={p.name} className="max-w-full max-h-full object-contain" />
              </div>
              <h3 className="font-semibold text-sm text-foreground">{p.name}</h3>
              <p className="text-xs text-muted-foreground mt-1">{p.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  </section>
);

export default Partners;
