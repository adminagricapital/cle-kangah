import React, { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Mail, Check } from "lucide-react";

interface Message {
  id: string;
  name: string;
  email: string;
  subject: string | null;
  message: string;
  is_read: boolean;
  created_at: string;
}

const AdminMessages = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const fetchMessages = async () => {
    const { data } = await supabase
      .from("contact_messages")
      .select("*")
      .order("created_at", { ascending: false });
    setMessages(data || []);
    setLoading(false);
  };

  useEffect(() => { fetchMessages(); }, []);

  const markAsRead = async (id: string) => {
    await supabase.from("contact_messages").update({ is_read: true }).eq("id", id);
    fetchMessages();
  };

  return (
    <div className="p-8">
      <h1 className="text-3xl font-playfair font-bold text-foreground mb-8">Messages</h1>
      {loading ? (
        <div className="flex justify-center py-12">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-elegant-600"></div>
        </div>
      ) : messages.length === 0 ? (
        <Card><CardContent className="p-12 text-center text-muted-foreground">Aucun message</CardContent></Card>
      ) : (
        <div className="space-y-3">
          {messages.map((msg) => (
            <Card key={msg.id} className={msg.is_read ? "opacity-70" : "border-elegant-300"}>
              <CardContent className="p-4">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-semibold">{msg.name}</span>
                      {!msg.is_read && <Badge className="bg-rose-500 text-white text-xs">Nouveau</Badge>}
                    </div>
                    <p className="text-sm text-muted-foreground">{msg.email}</p>
                    {msg.subject && <p className="text-sm font-medium mt-2">{msg.subject}</p>}
                    <p className="text-sm mt-1">{msg.message}</p>
                    <p className="text-xs text-muted-foreground mt-2">{new Date(msg.created_at).toLocaleString("fr-FR")}</p>
                  </div>
                  <div className="flex gap-2">
                    {!msg.is_read && (
                      <Button variant="ghost" size="icon" onClick={() => markAsRead(msg.id)}>
                        <Check className="w-4 h-4" />
                      </Button>
                    )}
                    <a href={`mailto:${msg.email}`}>
                      <Button variant="ghost" size="icon"><Mail className="w-4 h-4" /></Button>
                    </a>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminMessages;
