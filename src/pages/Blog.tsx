import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import SEOHead from "@/components/SEOHead";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { supabase } from "@/integrations/supabase/client";
import { Calendar, ArrowRight } from "lucide-react";

interface Article {
  id: string;
  title: string;
  summary: string | null;
  category: string;
  featured_image: string | null;
  published_at: string | null;
  slug: string;
  hashtags: string[];
}

const Blog = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase
      .from("articles")
      .select("id, title, summary, category, featured_image, published_at, slug, hashtags")
      .eq("status", "published")
      .order("published_at", { ascending: false })
      .then(({ data }) => {
        setArticles(data || []);
        setLoading(false);
      });
  }, []);

  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="pt-20 pb-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-5xl font-playfair font-bold text-elegant-800 mb-4">
                Actualités & Blog
              </h1>
              <div className="w-24 h-1 bg-gradient-to-r from-elegant-400 to-rose-400 mx-auto mb-4"></div>
              <p className="text-lg text-muted-foreground">Mes réflexions, actualités et partages</p>
            </div>

            {loading ? (
              <div className="flex justify-center py-12">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-elegant-600"></div>
              </div>
            ) : articles.length === 0 ? (
              <div className="text-center py-16 text-muted-foreground">
                <p className="text-lg">Aucun article publié pour le moment.</p>
                <p className="mt-2">Revenez bientôt !</p>
              </div>
            ) : (
              <div className="space-y-8">
                {articles.map((article) => (
                  <Link key={article.id} to={`/blog/${article.slug}`}>
                    <Card className="group hover:shadow-xl transition-all duration-300 overflow-hidden">
                      <div className="md:flex">
                        {article.featured_image && (
                          <div className="md:w-1/3">
                            <img
                              src={article.featured_image}
                              alt={article.title}
                              className="w-full h-48 md:h-full object-cover group-hover:scale-105 transition-transform duration-500"
                            />
                          </div>
                        )}
                        <CardContent className={`p-6 ${article.featured_image ? "md:w-2/3" : "w-full"}`}>
                          <div className="flex items-center gap-2 mb-3">
                            <Badge variant="outline">{article.category}</Badge>
                            {article.published_at && (
                              <span className="text-xs text-muted-foreground flex items-center gap-1">
                                <Calendar className="w-3 h-3" />
                                {new Date(article.published_at).toLocaleDateString("fr-FR")}
                              </span>
                            )}
                          </div>
                          <h2 className="text-xl font-playfair font-bold text-foreground mb-2 group-hover:text-elegant-600 transition-colors">
                            {article.title}
                          </h2>
                          {article.summary && (
                            <p className="text-muted-foreground mb-4 line-clamp-2">{article.summary}</p>
                          )}
                          <div className="flex items-center text-elegant-600 text-sm font-medium">
                            Lire la suite <ArrowRight className="w-4 h-4 ml-1" />
                          </div>
                        </CardContent>
                      </div>
                    </Card>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Blog;
