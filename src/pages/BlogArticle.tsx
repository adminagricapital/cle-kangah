import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import SEOHead from "@/components/SEOHead";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { supabase } from "@/integrations/supabase/client";
import { Badge } from "@/components/ui/badge";
import { Calendar, ArrowLeft } from "lucide-react";
import ReactMarkdown from "react-markdown";
import { Link } from "react-router-dom";
import ShareButtons from "@/components/ShareButtons";

const BlogArticle = () => {
  const { slug } = useParams();
  const [article, setArticle] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase
      .from("articles")
      .select("*")
      .eq("slug", slug)
      .eq("status", "published")
      .single()
      .then(({ data }) => {
        setArticle(data);
        setLoading(false);
      });
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen">
        <Navbar />
        <div className="flex justify-center items-center h-96">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-elegant-600"></div>
        </div>
      </div>
    );
  }

  if (!article) {
    return (
      <div className="min-h-screen">
        <Navbar />
        <div className="flex flex-col items-center justify-center h-96">
          <p className="text-lg text-muted-foreground mb-4">Article non trouvé</p>
          <Link to="/blog" className="text-elegant-600 hover:underline flex items-center gap-1">
            <ArrowLeft className="w-4 h-4" /> Retour au blog
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <SEOHead
        title={`${article.title} – Blog CK Couture | Clémence KANGAH`}
        description={article.meta_description || article.summary || `Lisez "${article.title}" sur le blog de CK Couture.`}
        path={`/blog/${article.slug}`}
        image={article.featured_image || undefined}
        type="article"
      />
      <Navbar />
      <main className="pt-20 pb-16">
        <article className="container mx-auto px-4 max-w-3xl">
          <Link to="/blog" className="text-elegant-600 hover:underline flex items-center gap-1 mb-6">
            <ArrowLeft className="w-4 h-4" /> Retour au blog
          </Link>

          <div className="flex items-center gap-2 mb-4">
            <Badge variant="outline">{article.category}</Badge>
            {article.published_at && (
              <span className="text-sm text-muted-foreground flex items-center gap-1">
                <Calendar className="w-3 h-3" />
                {new Date(article.published_at).toLocaleDateString("fr-FR")}
              </span>
            )}
          </div>

          <h1 className="text-3xl md:text-4xl font-playfair font-bold text-foreground mb-4 uppercase">
            {article.title}
          </h1>

          {article.summary && (
            <p className="text-lg italic text-muted-foreground mb-6">{article.summary}</p>
          )}

          {article.featured_image && (
            <img
              src={article.featured_image}
              alt={article.title}
              className="w-full rounded-lg mb-8 max-h-96 object-cover"
            />
          )}

          <div className="prose prose-lg max-w-none">
            <ReactMarkdown>{article.content}</ReactMarkdown>
          </div>

          {/* Share buttons */}
          <div className="mt-8 pt-6 border-t flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <ShareButtons title={article.title} />
            {article.hashtags && article.hashtags.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {article.hashtags.map((h: string, i: number) => (
                  <Badge key={i} variant="outline" className="text-elegant-600">{h}</Badge>
                ))}
              </div>
            )}
          </div>
        </article>
      </main>
      <Footer />
    </div>
  );
};

export default BlogArticle;
