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

    // Build prompt based on style and gender
    const styleMap: Record<string, string> = {
      africain: "African wax print fabric, vibrant Ankara patterns, traditional African fashion",
      europeen: "European haute couture, clean lines, modern minimalist fashion",
      ivoirien: "Ivorian traditional style, Baoulé kita fabric, Côte d'Ivoire fashion",
      oriental: "Oriental inspired fashion, rich embroidery, luxurious silks and brocade",
      moderne: "Contemporary modern fashion, trendy urban style, innovative cuts",
      traditionnel: "Traditional African ceremonial attire, cultural heritage, handwoven fabrics",
    };

    const genderMap: Record<string, string> = {
      femme: "beautiful African woman wearing",
      homme: "handsome African man wearing",
      enfant: "cute African child wearing",
    };

    const styleDesc = styleMap[style] || styleMap.africain;
    const genderDesc = genderMap[gender] || genderMap.femme;

    const prompt = `Ultra-realistic professional fashion photography of ${genderDesc} ${description}. ${styleDesc}. Studio lighting, high-end editorial fashion shoot, full body shot on clean background, 8k quality, photorealistic.`;

    console.log("Generating model with prompt:", prompt);

    // Call Lovable AI with image generation model
    const aiResponse = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash-image",
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
