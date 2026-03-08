import React, { useState, useMemo } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ShoppingBag, ShoppingCart, ArrowRight, Star, Plus, Search, SlidersHorizontal } from "lucide-react";
import { Link } from "react-router-dom";
import { useCart } from "@/hooks/useCart";
import CartDrawer from "@/components/CartDrawer";
import { products, type Product } from "@/data/boutique-products";

const Boutique = () => {
  const [activeTab, setActiveTab] = useState("tous");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("default");
  const cart = useCart();

  const filtered = useMemo(() => {
    let result = activeTab === "tous" ? products : products.filter(p => p.category === activeTab);
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(p => p.name.toLowerCase().includes(q) || p.category.toLowerCase().includes(q));
    }
    switch (sortBy) {
      case "price-asc": return [...result].sort((a, b) => a.price - b.price);
      case "price-desc": return [...result].sort((a, b) => b.price - a.price);
      case "name": return [...result].sort((a, b) => a.name.localeCompare(b.name));
      case "rating": return [...result].sort((a, b) => b.rating - a.rating);
      default: return result;
    }
  }, [activeTab, searchQuery, sortBy]);

  const handleAddToCart = (product: Product) => {
    cart.addItem({ id: product.id, name: product.name, price: product.price, priceLabel: product.priceLabel, image: product.image, category: product.category });
  };

  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="pt-20 pb-16">
        <div className="relative bg-elegant-800 py-16 mb-8">
          <div className="container mx-auto px-4 text-center text-white">
            <ShoppingBag className="w-10 h-10 mx-auto mb-3 text-elegant-300" />
            <h1 className="text-3xl md:text-5xl font-playfair font-bold mb-3">Boutique CK Couture</h1>
            <div className="w-24 h-1 bg-gradient-to-r from-elegant-400 to-rose-400 mx-auto mb-3" />
            <p className="text-elegant-200 max-w-2xl mx-auto">Découvrez nos collections prêt-à-porter et commandez vos tenues sur mesure.</p>
          </div>
        </div>

        <div className="container mx-auto px-4">
          {cart.totalItems > 0 && (
            <div className="fixed bottom-6 right-6 z-50">
              <Button onClick={() => cart.setIsOpen(true)} className="bg-elegant-600 hover:bg-elegant-700 text-white rounded-full h-14 w-14 shadow-lg relative" size="icon">
                <ShoppingCart className="w-6 h-6" />
                <span className="absolute -top-1 -right-1 bg-rose-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">{cart.totalItems}</span>
              </Button>
            </div>
          )}

          {/* Search & Sort */}
          <div className="max-w-6xl mx-auto mb-6 flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input placeholder="Rechercher un produit..." className="pl-10" value={searchQuery} onChange={e => setSearchQuery(e.target.value)} />
            </div>
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-full sm:w-56">
                <SlidersHorizontal className="w-4 h-4 mr-2" />
                <SelectValue placeholder="Trier par" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="default">Par défaut</SelectItem>
                <SelectItem value="price-asc">Prix croissant</SelectItem>
                <SelectItem value="price-desc">Prix décroissant</SelectItem>
                <SelectItem value="name">Nom A-Z</SelectItem>
                <SelectItem value="rating">Meilleures notes</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="max-w-6xl mx-auto">
            <div className="flex justify-center mb-8">
              <TabsList className="bg-elegant-50">
                <TabsTrigger value="tous">Tous</TabsTrigger>
                <TabsTrigger value="femme">Femme</TabsTrigger>
                <TabsTrigger value="homme">Homme</TabsTrigger>
                <TabsTrigger value="enfants">Enfants</TabsTrigger>
                <TabsTrigger value="accessoires">Accessoires</TabsTrigger>
                <TabsTrigger value="tissus">Tissus</TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value={activeTab}>
              {filtered.length === 0 ? (
                <div className="text-center py-16 text-muted-foreground">
                  <Search className="w-12 h-12 mx-auto mb-4 opacity-30" />
                  <p className="text-lg">Aucun produit trouvé pour « {searchQuery} »</p>
                </div>
              ) : (
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {filtered.map((product) => (
                    <Card key={product.id} className="group overflow-hidden hover:shadow-xl transition-all duration-300 border-0 shadow-md">
                      <div className="relative aspect-[4/5] overflow-hidden">
                        <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                        {product.badge && <Badge className="absolute top-3 left-3 bg-elegant-600 text-white">{product.badge}</Badge>}
                      </div>
                      <CardContent className="p-4">
                        <div className="flex items-center gap-1 mb-2">
                          {Array.from({ length: product.rating }).map((_, i) => (
                            <Star key={i} className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />
                          ))}
                        </div>
                        <h3 className="font-playfair font-semibold text-foreground mb-1 text-sm">{product.name}</h3>
                        <div className="flex items-center justify-between">
                          <span className="text-lg font-bold text-elegant-600">{product.priceLabel}</span>
                          <Button size="sm" className="bg-elegant-600 hover:bg-elegant-700 text-white" onClick={() => handleAddToCart(product)}>
                            <Plus className="w-3.5 h-3.5 mr-1" /> Ajouter
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
              <p className="text-center text-sm text-muted-foreground mt-6">{filtered.length} produit{filtered.length > 1 ? "s" : ""}</p>
            </TabsContent>
          </Tabs>

          <div className="max-w-4xl mx-auto mt-16 bg-gradient-to-r from-elegant-600 to-rose-600 rounded-2xl p-8 md:p-12 text-center text-white">
            <h2 className="text-2xl md:text-3xl font-playfair font-bold mb-4">Envie d'une Création Unique ?</h2>
            <p className="text-white/90 mb-6 max-w-xl mx-auto">Commandez une tenue sur mesure avec vos choix de tissu, couleurs et style.</p>
            <Link to="/commander">
              <Button size="lg" className="bg-white text-elegant-800 hover:bg-white/90">Commander sur mesure <ArrowRight className="w-5 h-5 ml-2" /></Button>
            </Link>
          </div>
        </div>
      </main>
      <Footer />
      <CartDrawer open={cart.isOpen} onOpenChange={cart.setIsOpen} items={cart.items} totalPrice={cart.totalPrice} onUpdateQuantity={cart.updateQuantity} onRemove={cart.removeItem} onClear={cart.clearCart} />
    </div>
  );
};

export default Boutique;
