
import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowDown, Heart, Sparkles } from 'lucide-react';
import clemencePhoto from '@/assets/clemence-kangah-photo.png';

const Hero = () => {
  return (
    <section id="accueil" className="relative min-h-screen flex items-center justify-center overflow-hidden py-16 md:py-20">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-elegant">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmNmJiNzciIGZpbGwtb3BhY2l0eT0iMC4xIj48Y2lyY2xlIGN4PSIzMCIgY3k9IjMwIiByPSIyIi8+PC9nPjwvZz48L3N2Zz4=')] opacity-40"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 text-center">
        <div className="max-w-4xl mx-auto">
          {/* Photo */}
          <div className="mb-8 animate-fade-up">
            <div className="w-36 h-36 md:w-44 md:h-44 mx-auto mb-6 rounded-full overflow-hidden border-4 border-white shadow-2xl">
              <img 
                src="/lovable-uploads/fac15059-22a8-44a1-8a93-e841d8edee86.png"
                alt="Clémence KANGAH"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Main Title */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-playfair font-bold text-elegant-800 mb-4 md:mb-6 animate-fade-up leading-tight">
            J&apos;couds des vis,
            <br />
            <span className="text-rose-600">J&apos;répare des âmes</span>
          </h1>

          {/* Subtitle */}
          <p className="text-lg md:text-xl lg:text-2xl text-elegant-700 mb-8 animate-fade-up px-4" style={{ animationDelay: '0.2s' }}>
            Nouvelle Trace Féminine – À la couture de l&apos;être et à l&apos;ouvrage du monde
          </p>

          {/* Citation */}
          <div className="max-w-3xl mx-auto mb-10 animate-fade-up px-4" style={{ animationDelay: '0.3s' }}>
            <blockquote className="text-lg md:text-xl font-playfair italic text-rose-700 border-l-4 border-rose-300 pl-6 py-4 bg-white/30 backdrop-blur-sm rounded-lg">
              &quot;Chaque point de couture est une prière, chaque création est un acte de foi vers un monde meilleur.&quot;
            </blockquote>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center items-center animate-fade-up px-4" style={{ animationDelay: '0.4s' }}>
            <Button 
              size="lg" 
              className="bg-elegant-600 hover:bg-elegant-700 text-white px-6 md:px-8 py-3 text-base md:text-lg w-full sm:w-auto"
              onClick={() => document.getElementById('apropos')?.scrollIntoView({ behavior: 'smooth' })}
            >
              <Heart className="w-4 h-4 md:w-5 md:h-5 mr-2" />
              En savoir plus
            </Button>
            <Button 
              variant="outline" 
              size="lg" 
              className="border-elegant-600 text-elegant-600 hover:bg-elegant-50 px-6 md:px-8 py-3 text-base md:text-lg w-full sm:w-auto"
              onClick={() => document.getElementById('ouvrages')?.scrollIntoView({ behavior: 'smooth' })}
            >
              <Sparkles className="w-4 h-4 md:w-5 md:h-5 mr-2" />
              Mes ouvrages
            </Button>
            <Button 
              variant="outline" 
              size="lg" 
              className="border-rose-600 text-rose-600 hover:bg-rose-50 px-6 md:px-8 py-3 text-base md:text-lg w-full sm:w-auto"
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Me contacter
            </Button>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-4 md:bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <ArrowDown className="w-5 h-5 md:w-6 md:h-6 text-elegant-600" />
        </div>
      </div>

      {/* Floating elements */}
      <div className="hidden md:block absolute top-20 left-10 w-16 h-16 lg:w-20 lg:h-20 bg-rose-200 rounded-full opacity-20 animate-float"></div>
      <div className="hidden md:block absolute top-40 right-20 w-12 h-12 lg:w-16 lg:h-16 bg-elegant-300 rounded-full opacity-30 animate-float" style={{ animationDelay: '1s' }}></div>
      <div className="hidden md:block absolute bottom-32 left-20 w-10 h-10 lg:w-12 lg:h-12 bg-coral-300 rounded-full opacity-25 animate-float" style={{ animationDelay: '2s' }}></div>
    </section>
  );
};

export default Hero;
