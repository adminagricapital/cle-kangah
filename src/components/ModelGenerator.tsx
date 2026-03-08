import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Sparkles, Loader2, ImagePlus, Eye } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface GeneratedModel {
  id: string;
  description: string;
  style: string;
  gender: string;
  image_url: string;
  created_at: string;
}

const styles = [
  { value: "africain", label: "Style Africain (Wax, Ankara)" },
  { value: "ivoirien", label: "Style Ivoirien (Baoulé, Kita)" },
  { value: "europeen", label: "Style Européen" },
  { value: "oriental", label: "Style Oriental" },
  { value: "moderne", label: "Style Moderne / Urbain" },
  { value: "traditionnel", label: "Style Traditionnel" },
];

const genders = [
  { value: "femme", label: "Femme" },
  { value: "homme", label: "Homme" },
  { value: "enfant", label: "Enfant" },
];

interface Props {
  onSelectModel?: (imageUrl: string, description: string) => void;
}

const ModelGenerator = ({ onSelectModel }: Props) => {
  const { toast } = useToast();
  const [description, setDescription] = useState("");
  const [style, setStyle] = useState("africain");
  const [gender, setGender] = useState("femme");
  const [generating, setGenerating] = useState(false);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [catalog, setCatalog] = useState<GeneratedModel[]>([]);
  const [showCatalog, setShowCatalog] = useState(false);
  const [loadingCatalog, setLoadingCatalog] = useState(false);

  const loadCatalog = async () => {
    setLoadingCatalog(true);
    const { data } = await supabase
      .from("generated_models")
      .select("*")
      .eq("is_public", true)
      .order("created_at", { ascending: false })
      .limit(30) as any;
    setCatalog(data || []);
    setLoadingCatalog(false);
  };

  useEffect(() => {
    loadCatalog();
  }, []);

  const handleGenerate = async () => {
    if (!description.trim()) {
      toast({ title: "Description requise", description: "Décrivez le modèle que vous souhaitez.", variant: "destructive" });
      return;
    }
    setGenerating(true);
    setGeneratedImage(null);

    try {
      const { data, error } = await supabase.functions.invoke("generate-model", {
        body: { description, style, gender },
      });

      if (error) throw error;

      if (data?.error) {
        toast({ title: "Erreur", description: data.error, variant: "destructive" });
      } else if (data?.image_url) {
        setGeneratedImage(data.image_url);
        toast({ title: "Modèle généré !", description: "Votre modèle a été ajouté au catalogue." });
        loadCatalog();
      }
    } catch (err: any) {
      toast({ title: "Erreur", description: err.message || "Erreur lors de la génération.", variant: "destructive" });
    } finally {
      setGenerating(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Generator */}
      <Card className="border-elegant-200 border-2">
        <CardHeader>
          <CardTitle className="font-playfair text-elegant-800 flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-elegant-500" />
            Générer un Modèle par IA
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground">
            Décrivez votre tenue idéale et notre IA créera un modèle unique. Chaque modèle généré est ajouté au catalogue public.
          </p>

          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <Label>Style vestimentaire</Label>
              <Select value={style} onValueChange={setStyle}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  {styles.map(s => (
                    <SelectItem key={s.value} value={s.value}>{s.label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Genre</Label>
              <Select value={gender} onValueChange={setGender}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  {genders.map(g => (
                    <SelectItem key={g.value} value={g.value}>{g.label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div>
            <Label>Description de votre modèle *</Label>
            <Input
              value={description}
              onChange={e => setDescription(e.target.value)}
              placeholder="Ex: Robe longue en wax rouge et or avec manches évasées et ceinture dorée..."
              className="mt-1"
            />
          </div>

          <Button
            type="button"
            onClick={handleGenerate}
            disabled={generating}
            className="w-full bg-gradient-to-r from-elegant-600 to-rose-600 hover:from-elegant-700 hover:to-rose-700 text-white"
          >
            {generating ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Génération en cours... (30-60s)
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4 mr-2" />
                Générer mon modèle
              </>
            )}
          </Button>

          {generatedImage && (
            <div className="mt-4 space-y-3">
              <p className="text-sm font-medium text-foreground">Votre modèle généré :</p>
              <div className="relative rounded-xl overflow-hidden border-2 border-elegant-300 shadow-lg max-w-sm mx-auto">
                <img src={generatedImage} alt="Modèle généré" className="w-full aspect-[3/4] object-cover" />
              </div>
              {onSelectModel && (
                <Button
                  type="button"
                  onClick={() => onSelectModel(generatedImage, description)}
                  className="w-full bg-elegant-600 hover:bg-elegant-700 text-white"
                >
                  <ImagePlus className="w-4 h-4 mr-2" /> Utiliser ce modèle pour ma commande
                </Button>
              )}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Catalog Toggle */}
      <Button
        type="button"
        variant="outline"
        onClick={() => setShowCatalog(!showCatalog)}
        className="w-full"
      >
        <Eye className="w-4 h-4 mr-2" />
        {showCatalog ? "Masquer" : "Voir"} le catalogue des modèles ({catalog.length})
      </Button>

      {/* Catalog */}
      {showCatalog && (
        <div className="space-y-4">
          <h3 className="font-playfair font-semibold text-lg text-foreground">
            Catalogue des Modèles Générés
          </h3>
          {loadingCatalog ? (
            <div className="flex justify-center py-8">
              <Loader2 className="w-6 h-6 animate-spin text-elegant-500" />
            </div>
          ) : catalog.length === 0 ? (
            <p className="text-center text-muted-foreground py-8">
              Aucun modèle dans le catalogue. Soyez le premier à en créer un !
            </p>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {catalog.map(model => (
                <button
                  key={model.id}
                  type="button"
                  onClick={() => onSelectModel?.(model.image_url, model.description)}
                  className="group relative rounded-xl overflow-hidden border-2 border-border hover:border-elegant-400 transition-all hover:shadow-lg"
                >
                  <img
                    src={model.image_url}
                    alt={model.description}
                    className="w-full aspect-[3/4] object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-2">
                    <p className="text-white text-xs line-clamp-2">{model.description}</p>
                    <span className="text-white/70 text-[10px] capitalize">{model.style} • {model.gender}</span>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ModelGenerator;
