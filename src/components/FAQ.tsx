import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { HelpCircle } from "lucide-react";

const faqs = [
  {
    question: "Quels types de tenues proposez-vous en couture sur mesure ?",
    answer:
      "Nous confectionnons tous types de tenues : robes de soirée, robes de mariée, costumes homme, tenues traditionnelles africaines (boubou, agbada, dashiki, caftan), uniformes, tenues de cérémonie, vêtements enfants et tenues professionnelles. Chaque création est réalisée selon vos mesures et vos goûts.",
  },
  {
    question: "Quel est le délai de confection d'une tenue sur mesure ?",
    answer:
      "Le délai varie selon la complexité de la tenue : 3 à 5 jours pour une tenue simple, 1 à 2 semaines pour une robe de soirée ou un costume, et 3 à 4 semaines pour une robe de mariée. Nous proposons aussi un service express avec supplément pour les urgences.",
  },
  {
    question: "Comment se déroule une commande sur mesure ?",
    answer:
      "1) Prise de contact et discussion du modèle souhaité. 2) Prise de mesures à l'atelier ou à distance. 3) Choix du tissu et validation du devis. 4) Confection avec essayage intermédiaire. 5) Livraison ou retrait de la tenue finie. Vous pouvez aussi envoyer une photo de référence.",
  },
  {
    question: "Quels sont vos tarifs pour la couture sur mesure ?",
    answer:
      "Nos tarifs varient selon le type de tenue et la complexité : à partir de 15 000 FCFA pour une tenue simple, 35 000 FCFA pour un ensemble complet, et à partir de 100 000 FCFA pour une robe de mariée. Un devis personnalisé est établi pour chaque commande.",
  },
  {
    question: "Proposez-vous des formations en couture ?",
    answer:
      "Oui, nous proposons des formations individuelles et en groupe, allant de l'initiation à la couture au perfectionnement. Les formations couvrent la prise de mesures, le patronage, la coupe et l'assemblage. Contactez-nous pour connaître les prochaines sessions.",
  },
  {
    question: "Livrez-vous en dehors de Daloa ?",
    answer:
      "Oui, nous livrons partout en Côte d'Ivoire (Abidjan, Yamoussoukro, Bouaké, etc.) par transporteur sécurisé. Pour l'international, nous étudions chaque demande au cas par cas. Les frais de livraison sont calculés selon la destination.",
  },
  {
    question: "Puis-je fournir mon propre tissu ?",
    answer:
      "Absolument ! Vous pouvez apporter votre propre tissu ou choisir parmi notre sélection de tissus de qualité (wax, bazin, kente, satin, dentelle, etc.). Nous vous conseillerons sur la quantité nécessaire selon le modèle choisi.",
  },
  {
    question: "Comment réserver un rendez-vous à l'atelier ?",
    answer:
      "Vous pouvez nous contacter par WhatsApp, par téléphone ou via le formulaire de contact sur le site. Nous vous proposerons un créneau à l'atelier CK Couture à Daloa, ou un échange à distance si nécessaire.",
  },
];

const FAQ = () => {
  return (
    <section id="faq" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <HelpCircle className="w-10 h-10 mx-auto mb-3 text-elegant-500" />
            <h2 className="text-3xl md:text-4xl font-playfair font-bold text-foreground mb-4">
              Questions Fréquentes
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-elegant-400 to-rose-400 mx-auto mb-4" />
            <p className="text-muted-foreground">
              Tout ce que vous devez savoir sur nos services de couture sur mesure
            </p>
          </div>

          <Accordion type="single" collapsible className="space-y-3">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="bg-background rounded-xl border border-border px-6 shadow-sm"
              >
                <AccordionTrigger className="text-left font-medium text-foreground hover:text-elegant-600 py-5">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-relaxed pb-5">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
