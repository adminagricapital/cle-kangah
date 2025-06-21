
import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowDown, Heart, Sparkles } from 'lucide-react';

const Hero = () => {
  return (
    <section id="accueil" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-elegant">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmNmJiNzciIGZpbGwtb3BhY2l0eT0iMC4xIj48Y2lyY2xlIGN4PSIzMCIgY3k9IjMwIiByPSIyIi8+PC9nPjwvZz48L3N2Zz4=')] opacity-40"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 text-center">
        <div className="max-w-4xl mx-auto">
          {/* Main Title */}
          <h1 className="text-5xl md:text-7xl font-playfair font-bold text-elegant-800 mb-4 animate-fade-up">
            J&apos;couds des vis,
            <br />
            <span className="text-rose-600">J&apos;répare des âmes</span>
          </h1>

          {/* Subtitle */}
          <p className="text-xl md:text-2xl text-elegant-700 mb-8 animate-fade-up" style={{ animationDelay: '0.2s' }}>
            Nouvelle Trace Féminine – À la couture de l&apos;être et à l&apos;ouvrage du monde
          </p>

          {/* Description */}
          <div className="max-w-3xl mx-auto mb-12 animate-fade-up" style={{ animationDelay: '0.4s' }}>
            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              Bienvenue sur mon espace personnel. Je suis <strong>Clémence KANGAH</strong>, femme de foi, 
              couturière de formation, auteure, coordinatrice de projets communautaires et initiatrice 
              de solutions concrètes pour une Afrique plus forte.
            </p>
            <p className="text-lg text-gray-700 leading-relaxed">
              Ce site est le reflet de mon cheminement, de mes valeurs, de mes réalisations et de ma vision pour l&apos;avenir.
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-fade-up" style={{ animationDelay: '0.6s' }}>
            <Button 
              size="lg" 
              className="bg-elegant-600 hover:bg-elegant-700 text-white px-8 py-3 text-lg"
              onClick={() => document.getElementById('apropos')?.scrollIntoView({ behavior: 'smooth' })}
            >
              <Heart className="w-5 h-5 mr-2" />
              En savoir plus
            </Button>
            <Button 
              variant="outline" 
              size="lg" 
              className="border-elegant-600 text-elegant-600 hover:bg-elegant-50 px-8 py-3 text-lg"
              onClick={() => document.getElementById('projets')?.scrollIntoView({ behavior: 'smooth' })}
            >
              <Sparkles className="w-5 h-5 mr-2" />
              Mes projets
            </Button>
            <Button 
              variant="outline" 
              size="lg" 
              className="border-rose-600 text-rose-600 hover:bg-rose-50 px-8 py-3 text-lg"
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Me contacter
            </Button>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <ArrowDown className="w-6 h-6 text-elegant-600" />
        </div>
      </div>

      {/* Floating elements */}
      <div className="absolute top-20 left-10 w-20 h-20 bg-rose-200 rounded-full opacity-20 animate-float"></div>
      <div className="absolute top-40 right-20 w-16 h-16 bg-elegant-300 rounded-full opacity-30 animate-float" style={{ animationDelay: '1s' }}></div>
      <div className="absolute bottom-32 left-20 w-12 h-12 bg-coral-300 rounded-full opacity-25 animate-float" style={{ animationDelay: '2s' }}></div>
    </section>
  );
};

export default Hero;
