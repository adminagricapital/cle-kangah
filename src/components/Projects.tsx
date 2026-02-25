
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { BookOpen, ExternalLink } from 'lucide-react';

const books = [
  {
    title: "L'erreur de la femme ou Mère indigne",
    description: "Un regard sans concession sur les épreuves et les choix des femmes dans la société africaine contemporaine.",
    status: "Publié",
    statusColor: "bg-elegant-600",
    gradient: "from-elegant-50 to-elegant-100",
    borderColor: "border-elegant-200",
  },
  {
    title: "Toujours à l'église mais jamais avec Dieu",
    description: "Une réflexion spirituelle profonde sur la foi authentique face aux apparences religieuses.",
    status: "Publié",
    statusColor: "bg-rose-600",
    gradient: "from-rose-50 to-rose-100",
    borderColor: "border-rose-200",
  },
  {
    title: "Es-tu en couple avec toi-même ?",
    description: "Un guide introspectif pour apprendre à se connaître et s'aimer avant de construire une relation.",
    status: "En préparation",
    statusColor: "bg-coral-500",
    gradient: "from-coral-50 to-coral-100",
    borderColor: "border-coral-200",
    upcoming: true,
  },
];

const Projects = () => {
  return (
    <section id="ouvrages" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 mb-4">
              <BookOpen className="w-6 h-6 text-rose-600" />
              <span className="text-rose-600 font-medium uppercase tracking-wider text-sm">Littérature</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-playfair font-bold text-elegant-800 mb-6">
              Mes Ouvrages
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-elegant-400 to-rose-400 mx-auto mb-4"></div>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Des livres qui interrogent, inspirent et accompagnent les femmes dans leur cheminement personnel et spirituel.
            </p>
          </div>

          {/* Books Grid */}
          <div className="grid md:grid-cols-3 gap-8">
            {books.map((book, index) => (
              <div 
                key={index} 
                className={`group relative bg-gradient-to-br ${book.gradient} border ${book.borderColor} rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1`}
              >
                {/* Book spine accent */}
                <div className={`absolute left-0 top-0 bottom-0 w-1.5 ${book.statusColor}`}></div>
                
                <div className="p-6 md:p-8 pl-8">
                  {/* Status badge */}
                  <Badge className={`${book.statusColor} text-white mb-4 ${book.upcoming ? 'animate-pulse' : ''}`}>
                    {book.status}
                  </Badge>
                  
                  {/* Book icon */}
                  <div className="w-14 h-14 rounded-xl bg-white/70 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                    <BookOpen className="w-7 h-7 text-elegant-600" />
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-playfair font-bold text-elegant-800 mb-3 leading-snug">
                    {book.title}
                  </h3>

                  {/* Description */}
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {book.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Projects;
