
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Phone, Mail, MapPin, MessageCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const { toast } = useToast();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const { error } = await supabase.from('contact_messages').insert({
      name: formData.name,
      email: formData.email,
      subject: formData.subject || null,
      message: formData.message,
    });

    if (error) {
      toast({ title: "Erreur", description: "Impossible d'envoyer le message.", variant: "destructive" });
      return;
    }

    toast({
      title: "Message envoyé !",
      description: "Merci pour votre message. Je vous répondrai dans les plus brefs délais.",
    });
    
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  const contactInfo = [
    {
      icon: Phone,
      label: "Téléphone",
      value: "+225 07 79 99 78 73 / 05 55 67 28 45",
      color: "text-elegant-600"
    },
    {
      icon: MessageCircle,
      label: "WhatsApp",
      value: "07 79 99 78 73",
      color: "text-green-600"
    },
    {
      icon: Mail,
      label: "Email",
      value: "innocentkoffi1@gmail.com",
      color: "text-rose-600"
    },
    {
      icon: MapPin,
      label: "Localisation",
      value: "Daloa, Haut-Sassandra, Côte d'Ivoire",
      color: "text-coral-600"
    }
  ];

  return (
    <section id="contact" className="py-20 bg-gradient-coral">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-playfair font-bold text-elegant-800 mb-6">
              Contact
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-elegant-400 to-rose-400 mx-auto mb-6"></div>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto">
              N'hésitez pas à me contacter pour échanger, collaborer ou en savoir plus sur mes projets
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Information */}
            <div className="space-y-8">
              <div>
                <h3 className="text-2xl font-playfair font-semibold text-elegant-800 mb-8">
                  Clémence KANGAH
                </h3>
                
                <div className="space-y-6">
                  {contactInfo.map((info, index) => {
                    const IconComponent = info.icon;
                    return (
                      <div key={index} className="flex items-start space-x-4">
                        <IconComponent className={`w-6 h-6 ${info.color} mt-1 flex-shrink-0`} />
                        <div>
                          <h4 className="font-semibold text-gray-800 mb-1">{info.label}</h4>
                          <p className="text-gray-700">{info.value}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Quote */}
              <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-lg">
                <CardContent className="p-8">
                  <blockquote className="text-lg font-playfair font-medium text-elegant-800 italic leading-relaxed">
                    "Chaque échange est une occasion de tisser un nouveau lien, 
                    de partager une vision, de construire ensemble."
                  </blockquote>
                </CardContent>
              </Card>
            </div>

            {/* Contact Form */}
            <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-lg">
              <CardContent className="p-8">
                <h3 className="text-2xl font-playfair font-semibold text-elegant-800 mb-6">
                  Envoyez-moi un message
                </h3>
                
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Input
                        name="name"
                        placeholder="Votre nom"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        className="border-elegant-300 focus:border-elegant-500"
                      />
                    </div>
                    <div>
                      <Input
                        name="email"
                        type="email"
                        placeholder="Votre email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        className="border-elegant-300 focus:border-elegant-500"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <Input
                      name="subject"
                      placeholder="Sujet"
                      value={formData.subject}
                      onChange={handleInputChange}
                      required
                      className="border-elegant-300 focus:border-elegant-500"
                    />
                  </div>
                  
                  <div>
                    <Textarea
                      name="message"
                      placeholder="Votre message"
                      value={formData.message}
                      onChange={handleInputChange}
                      required
                      rows={5}
                      className="border-elegant-300 focus:border-elegant-500 resize-none"
                    />
                  </div>
                  
                  <Button 
                    type="submit" 
                    className="w-full bg-elegant-600 hover:bg-elegant-700 text-white py-3 text-lg"
                  >
                    Envoyer le message
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
