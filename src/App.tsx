import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Auth from "./pages/Auth";
import Blog from "./pages/Blog";
import BlogArticle from "./pages/BlogArticle";
import Services from "./pages/Services";
import Atelier from "./pages/Atelier";
import Commander from "./pages/Commander";
import Boutique from "./pages/Boutique";
import Temoignages from "./pages/Temoignages";
import AdminLayout from "./pages/admin/AdminLayout";
import Dashboard from "./pages/admin/Dashboard";
import AdminArticles from "./pages/admin/AdminArticles";
import ArticleEditor from "./pages/admin/ArticleEditor";
import AdminMessages from "./pages/admin/AdminMessages";
import AdminServicesPage from "./pages/admin/AdminServicesPage";
import AdminBookings from "./pages/admin/AdminBookings";
import AdminNewsletter from "./pages/admin/AdminNewsletter";
import AdminOrders from "./pages/admin/AdminOrders";
import AdminSettings from "./pages/admin/AdminSettings";
import NotFound from "./pages/NotFound";
import MentionsLegales from "./pages/MentionsLegales";
import Clemencia from "./components/Clemencia";
import WhatsAppButton from "./components/WhatsAppButton";
import ScrollToTop from "./components/ScrollToTop";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:slug" element={<BlogArticle />} />
          <Route path="/services" element={<Services />} />
          <Route path="/atelier" element={<Atelier />} />
          <Route path="/commander" element={<Commander />} />
          <Route path="/boutique" element={<Boutique />} />
          <Route path="/temoignages" element={<Temoignages />} />
          <Route path="/mentions-legales" element={<MentionsLegales />} />
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="articles" element={<AdminArticles />} />
            <Route path="articles/:id" element={<ArticleEditor />} />
            <Route path="articles/new" element={<ArticleEditor />} />
            <Route path="services" element={<AdminServicesPage />} />
            <Route path="bookings" element={<AdminBookings />} />
            <Route path="orders" element={<AdminOrders />} />
            <Route path="messages" element={<AdminMessages />} />
            <Route path="newsletter" element={<AdminNewsletter />} />
            <Route path="settings" element={<AdminSettings />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Clemencia />
        <WhatsAppButton />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
