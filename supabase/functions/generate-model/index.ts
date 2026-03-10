import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { description, style, gender } = await req.json();

    if (!description) {
      return new Response(
        JSON.stringify({ error: "Description is required" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) {
      return new Response(
        JSON.stringify({ error: "AI service not configured" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const styleMap: Record<string, string> = {
      africain: "Authentic African wax print (Ankara/Vlisco), bold geometric patterns, vibrant contrasting colors, impeccable tailoring with structured silhouette, contemporary African haute couture",
      europeen: "European luxury haute couture, clean architectural lines, premium fabric draping, minimalist elegance, Parisian runway quality",
      ivoirien: "Authentic Ivorian fashion — traditional Baoulé kita cloth, handwoven Sénoufo or Gouro fabric, rich cultural heritage with modern sophistication, Côte d'Ivoire artisanal craftsmanship",
      oriental: "Luxurious Oriental-inspired fashion, intricate gold thread embroidery, rich brocade and silk fabrics, regal and opulent aesthetic, jewel-toned color palette",
      moderne: "Contemporary urban fashion-forward design, innovative asymmetric cuts, bold color blocking, street-style meets runway sophistication, trendsetting 2025 aesthetics",
      traditionnel: "Traditional West African ceremonial attire, hand-embroidered details, premium handwoven fabric, cultural authenticity with refined elegance, heritage-inspired luxury",
    };

    const genderMap: Record<string, string> = {
      femme: "a stunning elegant African woman model with flawless skin, natural hair or elegant headwrap, confident pose, wearing",
      homme: "a distinguished handsome African man model with sharp features, confident stance, wearing",
      enfant: "an adorable well-dressed African child with bright smile, natural charm, wearing",
    };

    const styleDesc = styleMap[style] || styleMap.africain;
    const genderDesc = genderMap[gender] || genderMap.femme;

    const prompt = `Create an ultra-realistic, high-fashion editorial photograph of ${genderDesc} ${description}. 

Style direction: ${styleDesc}.

CRITICAL QUALITY REQUIREMENTS:
- Professional studio photography with dramatic Rembrandt lighting and soft fill light
- Shot on medium format camera (Hasselblad quality), shallow depth of field
- Full body shot from head to toe, model centered in frame
- Clean studio backdrop (gradient cream to white)
- Fabric textures must be photorealistic with visible weave details
- Perfect anatomical proportions, natural hand positioning
- Garment must show impeccable construction: clean seams, proper draping, structured shoulders
- Colors must be vivid, rich and true-to-life
- The overall aesthetic should be worthy of Vogue Africa or Essence Magazine cover
- Modern, trendy, responsible fashion — 2025 runway ready
- NO distorted hands, NO extra fingers, NO unnatural poses`;

    console.log("Generating model with prompt:", prompt);

    const aiResponse = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-3-pro-image-preview",
        messages: [{ role: "user", content: prompt }],
        modalities: ["image", "text"],
      }),
    });

    if (!aiResponse.ok) {
      const errorText = await aiResponse.text();
      console.error("AI API error:", aiResponse.status, errorText);

      if (aiResponse.status === 429) {
        return new Response(
          JSON.stringify({ error: "Trop de requêtes, veuillez réessayer dans quelques instants." }),
          { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      if (aiResponse.status === 402) {
        return new Response(
          JSON.stringify({ error: "Crédits AI épuisés, veuillez réessayer plus tard." }),
          { status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }

      return new Response(
        JSON.stringify({ error: "Erreur de génération AI" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const aiData = await aiResponse.json();
    const imageBase64 = aiData.choices?.[0]?.message?.images?.[0]?.image_url?.url;

    if (!imageBase64) {
      console.error("No image in AI response:", JSON.stringify(aiData).substring(0, 500));
      return new Response(
        JSON.stringify({ error: "L'IA n'a pas pu générer d'image. Essayez une description plus détaillée." }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Upload to Supabase Storage
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    const base64Data = imageBase64.replace(/^data:image\/\w+;base64,/, "");
    const imageBytes = Uint8Array.from(atob(base64Data), (c) => c.charCodeAt(0));
    const fileName = `model-${Date.now()}-${Math.random().toString(36).substring(7)}.png`;

    const { error: uploadError } = await supabase.storage
      .from("generated-models")
      .upload(fileName, imageBytes, { contentType: "image/png", upsert: true });

    if (uploadError) {
      console.error("Upload error:", uploadError);
      return new Response(
        JSON.stringify({ error: "Erreur lors de l'enregistrement de l'image" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const { data: publicUrlData } = supabase.storage
      .from("generated-models")
      .getPublicUrl(fileName);

    const imageUrl = publicUrlData.publicUrl;

    // Save to catalog
    const { data: modelData, error: insertError } = await supabase
      .from("generated_models")
      .insert({
        description,
        style: style || "africain",
        gender: gender || "femme",
        image_url: imageUrl,
        is_public: true,
      })
      .select()
      .single();

    if (insertError) {
      console.error("Insert error:", insertError);
    }

    return new Response(
      JSON.stringify({
        success: true,
        image_url: imageUrl,
        model: modelData,
      }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (e) {
    console.error("generate-model error:", e);
    return new Response(
      JSON.stringify({ error: e instanceof Error ? e.message : "Erreur inconnue" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
