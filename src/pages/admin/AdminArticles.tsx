import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { supabase } from "@/integrations/supabase/client";
import { Plus, Edit, Trash2, Eye } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Article {
  id: string;
  title: string;
  category: string;
  status: string;
  created_at: string;
  published_at: string | null;
}

const AdminArticles = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const fetchArticles = async () => {
    const { data, error } = await supabase
      .from("articles")
      .select("id, title, category, status, created_at, published_at")
      .order("created_at", { ascending: false });

    if (error) {
      toast({ title: "Erreur", description: error.message, variant: "destructive" });
    } else {
      setArticles(data || []);
    }
    setLoading(false);
  };

  useEffect(() => { fetchArticles(); }, []);

  const deleteArticle = async (id: string) => {
    if (!confirm("Supprimer cet article ?")) return;
    const { error } = await supabase.from("articles").delete().eq("id", id);
    if (error) {
      toast({ title: "Erreur", description: error.message, variant: "destructive" });
    } else {
      toast({ title: "Article supprimé" });
      fetchArticles();
    }
  };

  const statusColors: Record<string, string> = {
    draft: "bg-yellow-100 text-yellow-800",
    published: "bg-green-100 text-green-800",
    archived: "bg-gray-100 text-gray-800",
  };

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-playfair font-bold text-foreground">Articles</h1>
          <p className="text-muted-foreground mt-1">Gérez vos articles et actualités</p>
        </div>
        <Link to="/admin/articles/new">
          <Button className="bg-elegant-600 hover:bg-elegant-700">
            <Plus className="w-4 h-4 mr-2" /> Nouvel article
          </Button>
        </Link>
      </div>

      {loading ? (
        <div className="flex justify-center py-12">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-elegant-600"></div>
        </div>
      ) : articles.length === 0 ? (
        <Card>
          <CardContent className="p-12 text-center">
            <p className="text-muted-foreground mb-4">Aucun article pour le moment</p>
            <Link to="/admin/articles/new">
              <Button className="bg-elegant-600 hover:bg-elegant-700">
                <Plus className="w-4 h-4 mr-2" /> Créer votre premier article
              </Button>
            </Link>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-3">
          {articles.map((article) => (
            <Card key={article.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-4 flex items-center justify-between">
                <div className="flex-1">
                  <h3 className="font-semibold text-foreground">{article.title}</h3>
                  <div className="flex items-center gap-2 mt-1">
                    <Badge variant="outline" className="text-xs">{article.category}</Badge>
                    <Badge className={`text-xs ${statusColors[article.status] || ""}`}>
                      {article.status === "draft" ? "Brouillon" : article.status === "published" ? "Publié" : "Archivé"}
                    </Badge>
                    <span className="text-xs text-muted-foreground">
                      {new Date(article.created_at).toLocaleDateString("fr-FR")}
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Link to={`/admin/articles/${article.id}`}>
                    <Button variant="ghost" size="icon"><Edit className="w-4 h-4" /></Button>
                  </Link>
                  <Button variant="ghost" size="icon" onClick={() => deleteArticle(article.id)}>
                    <Trash2 className="w-4 h-4 text-destructive" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminArticles;
