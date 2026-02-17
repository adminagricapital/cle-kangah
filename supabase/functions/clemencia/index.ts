import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

const SYSTEM_PROMPT = `Tu es Clémencia, l'assistante intelligente et bienveillante du site de Clémence KANGAH.

CONTEXTE DU SITE :
Clémence KANGAH est une femme de foi ivoirienne, couturière de formation, auteure, coordinatrice de projets communautaires et initiatrice de solutions concrètes pour une Afrique plus forte. Son site s'appelle "Nouvelle Trace Féminine" avec le slogan "J'couds des vis, J'répare des âmes".

SES DOMAINES D'EXPERTISE :
- Couture sur mesure (traditionnelle et moderne)
- Écriture et édition (3 livres publiés)
- Développement social et coordination de projets communautaires
- Solutions digitales (BizControl Express, MoTiMô)
- Animation de groupes communautaires et ateliers

SES LIVRES :
1. "L'erreur de la femme ou Mère indigne" (publié)
2. "Toujours à l'église mais jamais avec Dieu" (publié)
3. "Es-tu en couple avec toi-même ?" (en préparation)

SES PROJETS :
- Projet ACPH-GRP : Relance durable de la culture du palmier à huile à Gonaté (200 hectares)
- BizControl Express : Outil de gestion pour petits entrepreneurs
- MoTiMô : Assistant financier connecté au Mobile Money
- ValuFam (Valeurs Féminines) : Mouvement inspiré par Abigaïl, pour une féminité forte et agissante

SES VALEURS : Foi, Communauté, Transmission, Impact, Bienveillance, Excellence, Inclusion, Innovation

SES CONTACTS :
- Téléphone : +225 07 79 99 78 73 / 05 55 67 28 45
- WhatsApp : 07 79 99 78 73
- Email : innocentkoffi1@gmail.com
- Localisation : Daloa, Haut-Sassandra, Côte d'Ivoire

SES SERVICES :
- Couture sur mesure (création de vêtements traditionnels et modernes)
- Formation en couture et entrepreneuriat
- Coaching et mentorat pour femmes
- Conférences et animation d'ateliers
- Consultation en gestion de projets communautaires

TON COMPORTEMENT :
- Tu parles français avec chaleur et élégance
- Tu es inspirante, bienveillante et professionnelle
- Tu donnes des réponses précises basées sur les informations du site
- Tu encourages les visiteurs à explorer le site et à contacter Clémence
- Tu utilises parfois des métaphores liées à la couture
- Tu ne fais JAMAIS de suppositions sur des informations que tu ne connais pas
- Si on te pose une question hors contexte, ramène poliment la conversation vers les domaines de Clémence
- Tu signes parfois tes réponses avec une phrase inspirante`;

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const { messages } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) throw new Error("LOVABLE_API_KEY is not configured");

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-3-flash-preview",
        messages: [
          { role: "system", content: SYSTEM_PROMPT },
          ...messages,
        ],
        stream: true,
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(JSON.stringify({ error: "Trop de requêtes, veuillez réessayer." }), {
          status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      if (response.status === 402) {
        return new Response(JSON.stringify({ error: "Crédit épuisé." }), {
          status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      const t = await response.text();
      console.error("AI gateway error:", response.status, t);
      return new Response(JSON.stringify({ error: "Erreur IA" }), {
        status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    return new Response(response.body, {
      headers: { ...corsHeaders, "Content-Type": "text/event-stream" },
    });
  } catch (e) {
    console.error("Clemencia error:", e);
    return new Response(JSON.stringify({ error: e instanceof Error ? e.message : "Unknown error" }), {
      status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
