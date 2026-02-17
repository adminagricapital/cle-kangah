import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const AdminSettings = () => (
  <div className="p-8">
    <h1 className="text-3xl font-playfair font-bold text-foreground mb-8">Paramètres</h1>
    <Card>
      <CardHeader><CardTitle>Paramètres du site</CardTitle></CardHeader>
      <CardContent>
        <p className="text-muted-foreground">Les paramètres du site seront disponibles ici.</p>
      </CardContent>
    </Card>
  </div>
);

export default AdminSettings;
