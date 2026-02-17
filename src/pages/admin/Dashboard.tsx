import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, MessageSquare, Briefcase, Users, Calendar, TrendingUp, Eye } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

const StatCard = ({ title, value, icon: Icon, color }: { title: string; value: string | number; icon: any; color: string }) => (
  <Card>
    <CardContent className="p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-muted-foreground">{title}</p>
          <p className="text-3xl font-bold text-foreground mt-1">{value}</p>
        </div>
        <div className={`w-12 h-12 rounded-full flex items-center justify-center ${color}`}>
          <Icon className="w-6 h-6 text-white" />
        </div>
      </div>
    </CardContent>
  </Card>
);

const Dashboard = () => {
  const [stats, setStats] = useState({
    articles: 0,
    published: 0,
    messages: 0,
    unread: 0,
    services: 0,
    bookings: 0,
    subscribers: 0,
  });

  useEffect(() => {
    const fetchStats = async () => {
      const [articles, published, messages, unread, services, bookings, subscribers] = await Promise.all([
        supabase.from("articles").select("id", { count: "exact", head: true }),
        supabase.from("articles").select("id", { count: "exact", head: true }).eq("status", "published"),
        supabase.from("contact_messages").select("id", { count: "exact", head: true }),
        supabase.from("contact_messages").select("id", { count: "exact", head: true }).eq("is_read", false),
        supabase.from("services").select("id", { count: "exact", head: true }),
        supabase.from("bookings").select("id", { count: "exact", head: true }),
        supabase.from("newsletter_subscribers").select("id", { count: "exact", head: true }),
      ]);

      setStats({
        articles: articles.count || 0,
        published: published.count || 0,
        messages: messages.count || 0,
        unread: unread.count || 0,
        services: services.count || 0,
        bookings: bookings.count || 0,
        subscribers: subscribers.count || 0,
      });
    };
    fetchStats();
  }, []);

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-playfair font-bold text-foreground">Tableau de bord</h1>
        <p className="text-muted-foreground mt-1">Bienvenue dans votre espace d'administration</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard title="Articles" value={stats.articles} icon={FileText} color="bg-blue-500" />
        <StatCard title="Publiés" value={stats.published} icon={Eye} color="bg-green-500" />
        <StatCard title="Messages" value={stats.messages} icon={MessageSquare} color="bg-elegant-600" />
        <StatCard title="Non lus" value={stats.unread} icon={TrendingUp} color="bg-rose-500" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <StatCard title="Services" value={stats.services} icon={Briefcase} color="bg-purple-500" />
        <StatCard title="Réservations" value={stats.bookings} icon={Calendar} color="bg-orange-500" />
        <StatCard title="Abonnés newsletter" value={stats.subscribers} icon={Users} color="bg-teal-500" />
      </div>

      {/* Quick actions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Actions rapides</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <a href="/admin/articles/new" className="flex items-center space-x-3 p-3 rounded-lg hover:bg-muted transition-colors">
              <FileText className="w-5 h-5 text-elegant-600" />
              <span className="text-sm font-medium">Nouvel article</span>
            </a>
            <a href="/admin/services" className="flex items-center space-x-3 p-3 rounded-lg hover:bg-muted transition-colors">
              <Briefcase className="w-5 h-5 text-elegant-600" />
              <span className="text-sm font-medium">Gérer les services</span>
            </a>
            <a href="/admin/messages" className="flex items-center space-x-3 p-3 rounded-lg hover:bg-muted transition-colors">
              <MessageSquare className="w-5 h-5 text-elegant-600" />
              <span className="text-sm font-medium">Voir les messages</span>
            </a>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Activité récente</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Les statistiques et l'activité s'afficheront ici au fur et à mesure que vous utiliserez le site.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
