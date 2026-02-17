import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

const CONTENT_SYSTEM_PROMPT = `Tu es un rédacteur éditorial professionnel de haut niveau. Tu travailles pour le site de Clémence KANGAH, couturière, auteure et coordinatrice de projets communautaires en Côte d'Ivoire.

RÈGLES STRICTES :
1. Tu reçois un texte brut (même un simple mot) et tu génères un article complet et structuré
2. Tu remplis TOUS les champs demandés dans le JSON de sortie
3. Le titre doit être EN MAJUSCULES, impactant et professionnel
4. Le résumé doit être court, engageant et en italique (marqué comme tel)
5. Le contenu doit être structuré avec : introduction, chapitres, sous-titres, paragraphes aérés
6. Tu ne dois JAMAIS inclure de balisage HTML visible - utilise du Markdown propre
7. Le contenu doit être fluide, aéré, professionnel, immédiatement publiable
8. Pas d'effet "contenu IA" - écris comme un journaliste professionnel
9. Détecte automatiquement la catégorie appropriée
10. Génère des hashtags et tags pertinents
11. Crée une meta description optimisée SEO
12. Génère un slug URL convivial

CATÉGORIES POSSIBLES : actualite, blog, evenement, annonce, communique, editorial, formation, projet

FORMAT DE SORTIE (JSON strict) :
{
  "title": "TITRE EN MAJUSCULES",
  "summary": "Phrase d'accroche courte et engageante",
  "content": "Contenu structuré en Markdown...",
  "category": "categorie_detectee",
  "tags": ["tag1", "tag2"],
  "hashtags": ["#hashtag1", "#hashtag2"],
  "meta_description": "Description SEO de 155 caractères max",
  "slug": "slug-url-convivial",
  "image_prompt": "Description détaillée pour génération d'image réaliste et sobre"
}`;

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const { text, withImage } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) throw new Error("LOVABLE_API_KEY is not configured");

    // Generate content
    const contentResponse = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-3-flash-preview",
        messages: [
          { role: "system", content: CONTENT_SYSTEM_PROMPT },
          { role: "user", content: `Génère un article complet à partir de ce texte : "${text}"` },
        ],
        tools: [{
          type: "function",
          function: {
            name: "generate_article",
            description: "Génère un article structuré complet",
            parameters: {
              type: "object",
              properties: {
                title: { type: "string", description: "Titre en majuscules" },
                summary: { type: "string", description: "Résumé accrocheur" },
                content: { type: "string", description: "Contenu structuré en Markdown" },
                category: { type: "string", enum: ["actualite", "blog", "evenement", "annonce", "communique", "editorial", "formation", "projet"] },
                tags: { type: "array", items: { type: "string" } },
                hashtags: { type: "array", items: { type: "string" } },
                meta_description: { type: "string" },
                slug: { type: "string" },
                image_prompt: { type: "string", description: "Prompt for realistic image generation" },
              },
              required: ["title", "summary", "content", "category", "tags", "hashtags", "meta_description", "slug", "image_prompt"],
              additionalProperties: false,
            },
          },
        }],
        tool_choice: { type: "function", function: { name: "generate_article" } },
      }),
    });

    if (!contentResponse.ok) {
      if (contentResponse.status === 429) {
        return new Response(JSON.stringify({ error: "Trop de requêtes, réessayez." }), {
          status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      if (contentResponse.status === 402) {
        return new Response(JSON.stringify({ error: "Crédit épuisé." }), {
          status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      throw new Error(`AI error: ${contentResponse.status}`);
    }

    const contentData = await contentResponse.json();
    const toolCall = contentData.choices?.[0]?.message?.tool_calls?.[0];
    let article;
    
    if (toolCall) {
      article = JSON.parse(toolCall.function.arguments);
    } else {
      // Fallback: try to parse from content
      const raw = contentData.choices?.[0]?.message?.content || "";
      const jsonMatch = raw.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        article = JSON.parse(jsonMatch[0]);
      } else {
        throw new Error("Failed to parse AI response");
      }
    }

    // Generate image if requested
    let imageUrl = null;
    if (withImage && article.image_prompt) {
      try {
        const imageResponse = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${LOVABLE_API_KEY}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            model: "google/gemini-2.5-flash-image",
            messages: [
              { role: "user", content: `Generate a professional, realistic, sober photograph-style image. No watermarks, no text overlay, no caricature. Subject: ${article.image_prompt}. Style: editorial photography, clean composition, natural lighting.` },
            ],
            modalities: ["image", "text"],
          }),
        });

        if (imageResponse.ok) {
          const imageData = await imageResponse.json();
          imageUrl = imageData.choices?.[0]?.message?.images?.[0]?.image_url?.url || null;
        }
      } catch (imgErr) {
        console.error("Image generation error:", imgErr);
      }
    }

    return new Response(JSON.stringify({ ...article, generated_image: imageUrl }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e) {
    console.error("Generate content error:", e);
    return new Response(JSON.stringify({ error: e instanceof Error ? e.message : "Unknown error" }), {
      status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
