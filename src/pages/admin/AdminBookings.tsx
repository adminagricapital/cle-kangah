import React, { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Check, X, Calendar } from "lucide-react";

interface Booking {
  id: string;
  client_name: string;
  client_email: string;
  client_phone: string | null;
  booking_date: string;
  notes: string | null;
  status: string;
  created_at: string;
}

const AdminBookings = () => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const fetchBookings = async () => {
    const { data } = await supabase.from("bookings").select("*").order("booking_date", { ascending: false });
    setBookings(data || []);
    setLoading(false);
  };

  useEffect(() => { fetchBookings(); }, []);

  const updateStatus = async (id: string, status: string) => {
    await supabase.from("bookings").update({ status }).eq("id", id);
    toast({ title: `Réservation ${status === "confirmed" ? "confirmée" : "annulée"}` });
    fetchBookings();
  };

  const statusColors: Record<string, string> = {
    pending: "bg-yellow-100 text-yellow-800",
    confirmed: "bg-green-100 text-green-800",
    cancelled: "bg-red-100 text-red-800",
    completed: "bg-blue-100 text-blue-800",
  };

  return (
    <div className="p-8">
      <h1 className="text-3xl font-playfair font-bold text-foreground mb-8">Réservations</h1>
      {loading ? (
        <div className="flex justify-center py-12"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-elegant-600"></div></div>
      ) : bookings.length === 0 ? (
        <Card><CardContent className="p-12 text-center text-muted-foreground">Aucune réservation</CardContent></Card>
      ) : (
        <div className="space-y-3">
          {bookings.map((b) => (
            <Card key={b.id}>
              <CardContent className="p-4 flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-semibold">{b.client_name}</span>
                    <Badge className={statusColors[b.status]}>{b.status}</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">{b.client_email} {b.client_phone && `· ${b.client_phone}`}</p>
                  <div className="flex items-center gap-1 mt-1 text-sm"><Calendar className="w-3 h-3" />{new Date(b.booking_date).toLocaleString("fr-FR")}</div>
                  {b.notes && <p className="text-sm mt-1">{b.notes}</p>}
                </div>
                {b.status === "pending" && (
                  <div className="flex gap-1">
                    <Button variant="ghost" size="icon" onClick={() => updateStatus(b.id, "confirmed")}><Check className="w-4 h-4 text-green-600" /></Button>
                    <Button variant="ghost" size="icon" onClick={() => updateStatus(b.id, "cancelled")}><X className="w-4 h-4 text-destructive" /></Button>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminBookings;
