import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import { Sparkles, Save, ArrowLeft, Image as ImageIcon, Images, FileText, Loader2, X } from "lucide-react";
import ReactMarkdown from "react-markdown";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription
} from "@/components/ui/dialog";

const categories = [
  { value: "actualite", label: "Actualité" },
  { value: "blog", label: "Blog" },
  { value: "evenement", label: "Événement" },
  { value: "annonce", label: "Annonce" },
  { value: "communique", label: "Communiqué" },
  { value: "editorial", label: "Éditorial" },
  { value: "formation", label: "Formation" },
  { value: "projet", label: "Projet" },
];

const ArticleEditor = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { toast } = useToast();
  const isNew = !id || id === "new";

  const [form, setForm] = useState({
    title: "", summary: "", content: "", category: "actualite",
    tags: [] as string[], hashtags: [] as string[],
    meta_description: "", slug: "", featured_image: "", status: "draft",
  });
  const [galleryImages, setGalleryImages] = useState<string[]>([]);
  const [rawInput, setRawInput] = useState("");
  const [generating, setGenerating] = useState(false);
  const [showGenDialog, setShowGenDialog] = useState(false);
  const [saving, setSaving] = useState(false);
  const [preview, setPreview] = useState(false);

  useEffect(() => {
    if (!isNew) {
      supabase.from("articles").select("*").eq("id", id).single().then(({ data }) => {
        if (data) {
          setForm({
            title: data.title || "",
            summary: data.summary || "",
            content: data.content || "",
            category: data.category || "actualite",
            tags: data.tags || [],
            hashtags: data.hashtags || [],
            meta_description: data.meta_description || "",
            slug: data.slug || "",
            featured_image: data.featured_image || "",
            status: data.status || "draft",
          });
        }
      });
    }
  }, [id, isNew]);

  const handleGenerate = async (mediaOption: string) => {
    setShowGenDialog(false);
    setGenerating(true);
    try {
      const text = rawInput || form.content || form.title;
      if (!text.trim()) {
        toast({ title: "Erreur", description: "Écrivez au moins un mot dans le champ contenu", variant: "destructive" });
        return;
      }

      const response = await fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/generate-content`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
          },
          body: JSON.stringify({ text, mediaOption }),
        }
      );

      if (!response.ok) {
        const err = await response.json();
        throw new Error(err.error || "Erreur de génération");
      }

      const data = await response.json();
      setForm({
        ...form,
        title: data.title || form.title,
        summary: data.summary || form.summary,
        content: data.content || form.content,
        category: data.category || form.category,
        tags: data.tags || form.tags,
        hashtags: data.hashtags || form.hashtags,
        meta_description: data.meta_description || form.meta_description,
        slug: data.slug || form.slug,
        featured_image: data.generated_image || form.featured_image,
      });

      if (data.generated_images?.length > 1) {
        setGalleryImages(data.generated_images.slice(1));
      }

      toast({ title: "✨ Contenu généré !", description: "L'IA a rempli tous les champs automatiquement" });
    } catch (e: any) {
      toast({ title: "Erreur", description: e.message, variant: "destructive" });
    } finally {
      setGenerating(false);
    }
  };

  const handleSave = async (publish = false) => {
    setSaving(true);
    try {
      const payload = {
        ...form,
        status: publish ? "published" : form.status,
        published_at: publish ? new Date().toISOString() : undefined,
        author_id: user?.id,
      };

      if (isNew) {
        const { error } = await supabase.from("articles").insert(payload);
        if (error) throw error;
        toast({ title: "Article créé !" });
      } else {
        const { error } = await supabase.from("articles").update(payload).eq("id", id);
        if (error) throw error;
        toast({ title: "Article mis à jour !" });
      }
      navigate("/admin/articles");
    } catch (e: any) {
      toast({ title: "Erreur", description: e.message, variant: "destructive" });
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="p-4 md:p-8 max-w-5xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon" onClick={() => navigate("/admin/articles")}>
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <h1 className="text-2xl font-playfair font-bold text-foreground">
            {isNew ? "Nouvel article" : "Modifier l'article"}
          </h1>
        </div>
        <div className="flex gap-2 flex-wrap">
          <Button variant="outline" onClick={() => setPreview(!preview)}>
            {preview ? "Éditer" : "Aperçu"}
          </Button>
          <Button variant="outline" onClick={() => handleSave(false)} disabled={saving}>
            <Save className="w-4 h-4 mr-2" /> Brouillon
          </Button>
          <Button className="bg-green-600 hover:bg-green-700 text-white" onClick={() => handleSave(true)} disabled={saving}>
            {saving ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : null}
            Publier
          </Button>
        </div>
      </div>

      {preview ? (
        <Card>
          <CardContent className="p-6 md:p-10">
            <article className="prose prose-lg max-w-none prose-headings:font-playfair prose-headings:text-foreground prose-p:text-muted-foreground prose-strong:text-foreground prose-table:border prose-th:bg-elegant-600 prose-th:text-white prose-th:p-3 prose-td:p-3 prose-td:border prose-tr:even:bg-muted/30">
              <h1 className="font-bold uppercase text-foreground">{form.title}</h1>
              {form.summary && <p className="italic text-muted-foreground text-lg border-l-4 border-elegant-400 pl-4">{form.summary}</p>}
              {form.featured_image && (
                <img src={form.featured_image} alt={form.title} className="w-full rounded-lg mb-6 max-h-[500px] object-cover" />
              )}
              <ReactMarkdown>{form.content}</ReactMarkdown>
              {galleryImages.length > 0 && (
                <div className="grid grid-cols-2 gap-4 mt-6">
                  {galleryImages.map((img, i) => (
                    <img key={i} src={img} alt={`Image ${i + 2}`} className="w-full rounded-lg object-cover h-48" />
                  ))}
                </div>
              )}
              {form.hashtags.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-6 not-prose">
                  {form.hashtags.map((h, i) => <Badge key={i} variant="outline">{h}</Badge>)}
                </div>
              )}
            </article>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-6">
          {/* AI Generate Section */}
          <Card className="border-elegant-300 bg-elegant-50/50">
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <Sparkles className="w-5 h-5 text-elegant-600" />
                <h3 className="font-semibold text-foreground">Génération par IA</h3>
                <Badge variant="outline" className="text-xs">Premium</Badge>
              </div>
              <p className="text-sm text-muted-foreground mb-3">
                Écrivez un mot, une phrase ou un paragraphe — l'IA génère un article complet, structuré et illustré.
              </p>
              <Textarea
                placeholder="Écrivez n'importe quoi : un mot, une idée, un thème... L'IA fera le reste !"
                value={rawInput}
                onChange={(e) => setRawInput(e.target.value)}
                rows={3}
                className="mb-3"
              />
              <Button
                onClick={() => setShowGenDialog(true)}
                disabled={generating}
                className="bg-elegant-600 hover:bg-elegant-700 text-white"
              >
                {generating ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : <Sparkles className="w-4 h-4 mr-2" />}
                {generating ? "Génération en cours..." : "Générer le contenu"}
              </Button>
            </CardContent>
          </Card>

          {/* Form */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-4">
              <div>
                <label className="text-sm font-medium mb-1.5 block">Titre</label>
                <Input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} placeholder="Titre de l'article" className="font-bold uppercase" />
              </div>
              <div>
                <label className="text-sm font-medium mb-1.5 block">Résumé</label>
                <Input value={form.summary} onChange={(e) => setForm({ ...form, summary: e.target.value })} placeholder="Phrase d'accroche" className="italic" />
              </div>
              <div>
                <label className="text-sm font-medium mb-1.5 block">Contenu (Markdown)</label>
                <Textarea
                  value={form.content}
                  onChange={(e) => setForm({ ...form, content: e.target.value })}
                  placeholder="Contenu de l'article..."
                  rows={20}
                  className="font-mono text-sm"
                />
              </div>
            </div>

            <div className="space-y-4">
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm">Métadonnées</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div>
                    <label className="text-xs font-medium mb-1 block">Catégorie</label>
                    <select
                      value={form.category}
                      onChange={(e) => setForm({ ...form, category: e.target.value })}
                      className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                    >
                      {categories.map((c) => (
                        <option key={c.value} value={c.value}>{c.label}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="text-xs font-medium mb-1 block">Slug URL</label>
                    <Input value={form.slug} onChange={(e) => setForm({ ...form, slug: e.target.value })} placeholder="slug-url" />
                  </div>
                  <div>
                    <label className="text-xs font-medium mb-1 block">Meta description</label>
                    <Textarea value={form.meta_description} onChange={(e) => setForm({ ...form, meta_description: e.target.value })} rows={2} />
                  </div>
                  <div>
                    <label className="text-xs font-medium mb-1 block">Tags (virgules)</label>
                    <Input
                      value={form.tags.join(", ")}
                      onChange={(e) => setForm({ ...form, tags: e.target.value.split(",").map(t => t.trim()).filter(Boolean) })}
                    />
                  </div>
                  <div>
                    <label className="text-xs font-medium mb-1 block">Hashtags</label>
                    <Input
                      value={form.hashtags.join(", ")}
                      onChange={(e) => setForm({ ...form, hashtags: e.target.value.split(",").map(t => t.trim()).filter(Boolean) })}
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Featured image */}
              {form.featured_image && (
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-sm">Image principale</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <img src={form.featured_image} alt="Featured" className="w-full rounded-lg" />
                    <Button variant="outline" size="sm" className="mt-2 w-full" onClick={() => setForm({ ...form, featured_image: "" })}>
                      Supprimer l'image
                    </Button>
                  </CardContent>
                </Card>
              )}

              {/* Gallery images */}
              {galleryImages.length > 0 && (
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-sm">Galerie ({galleryImages.length})</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    {galleryImages.map((img, i) => (
                      <div key={i} className="relative">
                        <img src={img} alt={`Gallery ${i + 1}`} className="w-full rounded-lg h-32 object-cover" />
                        <Button
                          variant="destructive"
                          size="icon"
                          className="absolute top-1 right-1 h-6 w-6"
                          onClick={() => setGalleryImages(galleryImages.filter((_, idx) => idx !== i))}
                        >
                          <X className="w-3 h-3" />
                        </Button>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Generation Dialog */}
      <Dialog open={showGenDialog} onOpenChange={setShowGenDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="font-playfair">Générer le contenu</DialogTitle>
            <DialogDescription>Choisissez le type de média à inclure</DialogDescription>
          </DialogHeader>
          <div className="space-y-3 pt-4">
            <Button className="w-full bg-elegant-600 hover:bg-elegant-700 text-white justify-start" onClick={() => handleGenerate("with-image")}>
              <ImageIcon className="w-4 h-4 mr-3" /> Avec une image IA
            </Button>
            <Button className="w-full bg-elegant-700 hover:bg-elegant-800 text-white justify-start" onClick={() => handleGenerate("with-multiple-images")}>
              <Images className="w-4 h-4 mr-3" /> Avec plusieurs images IA
            </Button>
            <Button variant="outline" className="w-full justify-start" onClick={() => handleGenerate("without-image")}>
              <FileText className="w-4 h-4 mr-3" /> Sans image
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ArticleEditor;
