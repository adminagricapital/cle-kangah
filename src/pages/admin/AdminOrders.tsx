import React, { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { Package, Eye, Download, Loader2 } from "lucide-react";

const statusColors: Record<string, string> = {
  pending: "bg-yellow-100 text-yellow-800",
  confirmed: "bg-blue-100 text-blue-800",
  in_progress: "bg-purple-100 text-purple-800",
  completed: "bg-green-100 text-green-800",
  cancelled: "bg-red-100 text-red-800",
};

const statusLabels: Record<string, string> = {
  pending: "En attente",
  confirmed: "Confirmée",
  in_progress: "En cours",
  completed: "Terminée",
  cancelled: "Annulée",
};

const AdminOrders = () => {
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState<any>(null);
  const { toast } = useToast();

  const fetchOrders = async () => {
    const { data } = await supabase
      .from("custom_orders")
      .select("*")
      .order("created_at", { ascending: false });
    setOrders(data || []);
    setLoading(false);
  };

  useEffect(() => { fetchOrders(); }, []);

  const updateStatus = async (id: string, status: string) => {
    await supabase.from("custom_orders").update({ status }).eq("id", id);
    toast({ title: "Statut mis à jour" });
    fetchOrders();
  };

  const exportCSV = () => {
    const headers = ["Nom", "Email", "Téléphone", "Genre", "Type", "Catégorie", "Tissu", "Quantité", "Occasion", "Statut", "Date"];
    const rows = orders.map(o => [
      o.client_name, o.client_email, o.client_phone, o.gender,
      o.garment_type, o.garment_category, o.fabric_type, o.quantity,
      o.occasion || "", statusLabels[o.status] || o.status,
      new Date(o.created_at).toLocaleDateString("fr-FR"),
    ]);
    const csv = "\uFEFF" + [headers.join(";"), ...rows.map(r => r.join(";"))].join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a"); a.href = url; a.download = "commandes.csv"; a.click();
  };

  const measurements = selectedOrder?.measurements as Record<string, string> | null;

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-playfair font-bold text-foreground">Commandes</h1>
          <p className="text-muted-foreground">{orders.length} commande(s)</p>
        </div>
        <Button onClick={exportCSV} variant="outline" size="sm">
          <Download className="w-4 h-4 mr-2" /> Export CSV
        </Button>
      </div>

      {loading ? (
        <div className="flex justify-center py-12"><Loader2 className="w-8 h-8 animate-spin text-elegant-600" /></div>
      ) : orders.length === 0 ? (
        <div className="text-center py-16 text-muted-foreground">
          <Package className="w-12 h-12 mx-auto mb-4 opacity-50" />
          <p>Aucune commande pour le moment</p>
        </div>
      ) : (
        <div className="space-y-4">
          {orders.map(order => (
            <Card key={order.id}>
              <CardContent className="p-4 flex flex-col sm:flex-row sm:items-center gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-semibold">{order.client_name}</span>
                    <Badge className={statusColors[order.status]}>{statusLabels[order.status] || order.status}</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {order.garment_category} — {order.fabric_type} — Qté: {order.quantity}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    {new Date(order.created_at).toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" })}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <Select value={order.status} onValueChange={v => updateStatus(order.id, v)}>
                    <SelectTrigger className="w-36"><SelectValue /></SelectTrigger>
                    <SelectContent>
                      {Object.entries(statusLabels).map(([k, v]) => (
                        <SelectItem key={k} value={k}>{v}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Button variant="ghost" size="icon" onClick={() => setSelectedOrder(order)}>
                    <Eye className="w-4 h-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Order detail dialog */}
      <Dialog open={!!selectedOrder} onOpenChange={() => setSelectedOrder(null)}>
        <DialogContent className="sm:max-w-lg max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="font-playfair">Détails de la commande</DialogTitle>
          </DialogHeader>
          {selectedOrder && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div><span className="text-muted-foreground">Client :</span> <strong>{selectedOrder.client_name}</strong></div>
                <div><span className="text-muted-foreground">Email :</span> {selectedOrder.client_email}</div>
                <div><span className="text-muted-foreground">Tél :</span> {selectedOrder.client_phone}</div>
                <div><span className="text-muted-foreground">Genre :</span> {selectedOrder.gender}</div>
                <div><span className="text-muted-foreground">Type :</span> {selectedOrder.garment_type}</div>
                <div><span className="text-muted-foreground">Catégorie :</span> {selectedOrder.garment_category}</div>
                <div><span className="text-muted-foreground">Tissu :</span> {selectedOrder.fabric_type}</div>
                <div><span className="text-muted-foreground">Tissu ethnique :</span> {selectedOrder.ethnic_fabric || "—"}</div>
                <div><span className="text-muted-foreground">Quantité :</span> {selectedOrder.quantity}</div>
                <div><span className="text-muted-foreground">Occasion :</span> {selectedOrder.occasion || "—"}</div>
                <div><span className="text-muted-foreground">Livraison :</span> {selectedOrder.delivery_date || "—"}</div>
              </div>
              {measurements && Object.values(measurements).some(v => v) && (
                <div>
                  <h4 className="font-semibold mb-2">Mesures</h4>
                  <div className="grid grid-cols-3 gap-2 text-sm">
                    {Object.entries(measurements).map(([k, v]) => v ? (
                      <div key={k}><span className="text-muted-foreground">{k.replace(/_/g, " ")} :</span> {v} cm</div>
                    ) : null)}
                  </div>
                </div>
              )}
              {selectedOrder.notes && (
                <div>
                  <h4 className="font-semibold mb-1">Notes</h4>
                  <p className="text-sm text-muted-foreground">{selectedOrder.notes}</p>
                </div>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminOrders;
