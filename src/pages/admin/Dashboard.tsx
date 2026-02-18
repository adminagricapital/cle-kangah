import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { FileText, MessageSquare, Briefcase, Users, Calendar, TrendingUp, Eye, ArrowUpRight, ArrowDownRight } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { BarChart, Bar, XAxis, YAxis, PieChart, Pie, Cell, AreaChart, Area, ResponsiveContainer } from "recharts";

const COLORS = ["#de6110", "#ec4899", "#3b82f6", "#10b981", "#f59e0b", "#8b5cf6"];

const StatCard = ({ title, value, icon: Icon, color, trend }: { title: string; value: string | number; icon: any; color: string; trend?: number }) => (
  <Card className="hover:shadow-lg transition-shadow">
    <CardContent className="p-5">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">{title}</p>
          <p className="text-2xl font-bold text-foreground">{value}</p>
          {trend !== undefined && (
            <div className={`flex items-center text-xs font-medium ${trend >= 0 ? "text-emerald-600" : "text-destructive"}`}>
              {trend >= 0 ? <ArrowUpRight className="w-3 h-3 mr-0.5" /> : <ArrowDownRight className="w-3 h-3 mr-0.5" />}
              {Math.abs(trend)}% ce mois
            </div>
          )}
        </div>
        <div className={`w-11 h-11 rounded-xl flex items-center justify-center ${color}`}>
          <Icon className="w-5 h-5 text-white" />
        </div>
      </div>
    </CardContent>
  </Card>
);

const Dashboard = () => {
  const [stats, setStats] = useState({
    articles: 0, published: 0, messages: 0, unread: 0,
    services: 0, bookings: 0, subscribers: 0,
  });
  const [servicesByCategory, setServicesByCategory] = useState<{ name: string; value: number }[]>([]);
  const [bookingsByStatus, setBookingsByStatus] = useState<{ name: string; value: number }[]>([]);
  const [recentMessages, setRecentMessages] = useState<any[]>([]);
  const [articlesOverTime, setArticlesOverTime] = useState<{ month: string; articles: number }[]>([]);

  useEffect(() => {
    const fetchAll = async () => {
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
        articles: articles.count || 0, published: published.count || 0,
        messages: messages.count || 0, unread: unread.count || 0,
        services: services.count || 0, bookings: bookings.count || 0,
        subscribers: subscribers.count || 0,
      });

      // Services by category
      const { data: svcData } = await supabase.from("services").select("category");
      if (svcData) {
        const catMap: Record<string, number> = {};
        const catLabels: Record<string, string> = {
          couture: "Couture", formation: "Formation", coaching: "Coaching",
          consulting: "Consulting", conference: "Conférence", edition: "Édition",
        };
        svcData.forEach((s) => { catMap[s.category] = (catMap[s.category] || 0) + 1; });
        setServicesByCategory(Object.entries(catMap).map(([k, v]) => ({ name: catLabels[k] || k, value: v })));
      }

      // Bookings by status
      const { data: bkData } = await supabase.from("bookings").select("status");
      if (bkData && bkData.length > 0) {
        const statusMap: Record<string, number> = {};
        const statusLabels: Record<string, string> = {
          pending: "En attente", confirmed: "Confirmé", cancelled: "Annulé", completed: "Terminé",
        };
        bkData.forEach((b) => { statusMap[b.status] = (statusMap[b.status] || 0) + 1; });
        setBookingsByStatus(Object.entries(statusMap).map(([k, v]) => ({ name: statusLabels[k] || k, value: v })));
      }

      // Recent messages
      const { data: msgData } = await supabase.from("contact_messages").select("*").order("created_at", { ascending: false }).limit(5);
      setRecentMessages(msgData || []);

      // Articles over time (last 6 months)
      const { data: artData } = await supabase.from("articles").select("created_at");
      if (artData) {
        const months: Record<string, number> = {};
        const now = new Date();
        for (let i = 5; i >= 0; i--) {
          const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
          const key = d.toLocaleDateString("fr-FR", { month: "short", year: "2-digit" });
          months[key] = 0;
        }
        artData.forEach((a) => {
          const d = new Date(a.created_at);
          const key = d.toLocaleDateString("fr-FR", { month: "short", year: "2-digit" });
          if (key in months) months[key]++;
        });
        setArticlesOverTime(Object.entries(months).map(([month, articles]) => ({ month, articles })));
      }
    };
    fetchAll();
  }, []);

  const chartConfigServices = servicesByCategory.reduce((acc, item, i) => {
    acc[item.name] = { label: item.name, color: COLORS[i % COLORS.length] };
    return acc;
  }, {} as Record<string, { label: string; color: string }>);

  const chartConfigArticles = { articles: { label: "Articles", color: "#de6110" } };

  return (
    <div className="p-6 md:p-8 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl md:text-3xl font-playfair font-bold text-foreground">Tableau de bord</h1>
        <p className="text-sm text-muted-foreground mt-1">Vue d'ensemble de votre activité</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="Articles" value={stats.articles} icon={FileText} color="bg-elegant-600" trend={12} />
        <StatCard title="Publiés" value={stats.published} icon={Eye} color="bg-emerald-600" />
        <StatCard title="Messages" value={stats.messages} icon={MessageSquare} color="bg-rose-500" trend={8} />
        <StatCard title="Non lus" value={stats.unread} icon={TrendingUp} color="bg-amber-500" />
      </div>
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
        <StatCard title="Services" value={stats.services} icon={Briefcase} color="bg-violet-500" />
        <StatCard title="Réservations" value={stats.bookings} icon={Calendar} color="bg-sky-500" />
        <StatCard title="Abonnés" value={stats.subscribers} icon={Users} color="bg-teal-500" trend={15} />
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Articles over time */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-semibold">Articles publiés</CardTitle>
            <p className="text-xs text-muted-foreground">6 derniers mois</p>
          </CardHeader>
          <CardContent>
            {articlesOverTime.length > 0 ? (
              <ChartContainer config={chartConfigArticles} className="h-[220px] w-full">
                <AreaChart data={articlesOverTime} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="fillArticles" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#de6110" stopOpacity={0.3} />
                      <stop offset="100%" stopColor="#de6110" stopOpacity={0.02} />
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="month" tickLine={false} axisLine={false} fontSize={11} />
                  <YAxis tickLine={false} axisLine={false} fontSize={11} allowDecimals={false} />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Area type="monotone" dataKey="articles" stroke="#de6110" strokeWidth={2} fill="url(#fillArticles)" />
                </AreaChart>
              </ChartContainer>
            ) : (
              <p className="text-sm text-muted-foreground text-center py-12">Pas encore de données</p>
            )}
          </CardContent>
        </Card>

        {/* Services by category */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-semibold">Services par catégorie</CardTitle>
            <p className="text-xs text-muted-foreground">Répartition actuelle</p>
          </CardHeader>
          <CardContent>
            {servicesByCategory.length > 0 ? (
              <div className="flex items-center gap-4">
                <ChartContainer config={chartConfigServices} className="h-[220px] w-[55%]">
                  <PieChart>
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Pie data={servicesByCategory} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius={45} outerRadius={80} strokeWidth={2}>
                      {servicesByCategory.map((_, i) => (
                        <Cell key={i} fill={COLORS[i % COLORS.length]} />
                      ))}
                    </Pie>
                  </PieChart>
                </ChartContainer>
                <div className="space-y-2 flex-1">
                  {servicesByCategory.map((item, i) => (
                    <div key={item.name} className="flex items-center gap-2 text-xs">
                      <div className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: COLORS[i % COLORS.length] }} />
                      <span className="text-muted-foreground">{item.name}</span>
                      <span className="ml-auto font-semibold text-foreground">{item.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <p className="text-sm text-muted-foreground text-center py-12">Aucun service</p>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Bottom row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent messages */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-semibold">Messages récents</CardTitle>
          </CardHeader>
          <CardContent>
            {recentMessages.length > 0 ? (
              <div className="space-y-3">
                {recentMessages.map((msg) => (
                  <div key={msg.id} className="flex items-start gap-3 p-2.5 rounded-lg hover:bg-muted/60 transition-colors">
                    <div className={`w-2 h-2 rounded-full mt-1.5 shrink-0 ${msg.is_read ? "bg-muted-foreground/30" : "bg-elegant-600"}`} />
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between gap-2">
                        <p className="text-sm font-medium truncate">{msg.name}</p>
                        <span className="text-[10px] text-muted-foreground whitespace-nowrap">
                          {new Date(msg.created_at).toLocaleDateString("fr-FR", { day: "numeric", month: "short" })}
                        </span>
                      </div>
                      <p className="text-xs text-muted-foreground truncate">{msg.subject || msg.message}</p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-muted-foreground text-center py-8">Aucun message</p>
            )}
          </CardContent>
        </Card>

        {/* Quick Actions + Bookings */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-semibold">Actions rapides</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <a href="/admin/articles/new" className="flex items-center gap-3 p-3 rounded-lg hover:bg-muted/60 transition-colors group">
              <div className="w-8 h-8 rounded-lg bg-elegant-100 flex items-center justify-center group-hover:bg-elegant-200 transition-colors">
                <FileText className="w-4 h-4 text-elegant-700" />
              </div>
              <div>
                <p className="text-sm font-medium">Nouvel article</p>
                <p className="text-[11px] text-muted-foreground">Rédiger avec l'aide de l'IA</p>
              </div>
            </a>
            <a href="/admin/services" className="flex items-center gap-3 p-3 rounded-lg hover:bg-muted/60 transition-colors group">
              <div className="w-8 h-8 rounded-lg bg-violet-100 flex items-center justify-center group-hover:bg-violet-200 transition-colors">
                <Briefcase className="w-4 h-4 text-violet-700" />
              </div>
              <div>
                <p className="text-sm font-medium">Gérer les services</p>
                <p className="text-[11px] text-muted-foreground">{stats.services} services actifs</p>
              </div>
            </a>
            <a href="/admin/messages" className="flex items-center gap-3 p-3 rounded-lg hover:bg-muted/60 transition-colors group">
              <div className="w-8 h-8 rounded-lg bg-rose-100 flex items-center justify-center group-hover:bg-rose-200 transition-colors">
                <MessageSquare className="w-4 h-4 text-rose-700" />
              </div>
              <div>
                <p className="text-sm font-medium">Messages</p>
                <p className="text-[11px] text-muted-foreground">{stats.unread} non lu{stats.unread > 1 ? "s" : ""}</p>
              </div>
            </a>
            <a href="/admin/bookings" className="flex items-center gap-3 p-3 rounded-lg hover:bg-muted/60 transition-colors group">
              <div className="w-8 h-8 rounded-lg bg-sky-100 flex items-center justify-center group-hover:bg-sky-200 transition-colors">
                <Calendar className="w-4 h-4 text-sky-700" />
              </div>
              <div>
                <p className="text-sm font-medium">Réservations</p>
                <p className="text-[11px] text-muted-foreground">{stats.bookings} réservation{stats.bookings > 1 ? "s" : ""}</p>
              </div>
            </a>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
