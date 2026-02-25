
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const MentionsLegales = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4 max-w-3xl">
          <h1 className="text-3xl md:text-4xl font-playfair font-bold text-elegant-800 mb-8">
            Mentions Légales
          </h1>

          <div className="space-y-8 text-muted-foreground leading-relaxed">
            <section>
              <h2 className="text-xl font-playfair font-semibold text-foreground mb-3">1. Éditeur du site</h2>
              <p>
                <strong>Nom :</strong> Clémence KANGAH<br />
                <strong>Activité :</strong> Couturière, auteure, coordinatrice de projets communautaires<br />
                <strong>Adresse :</strong> Daloa, Haut-Sassandra, Côte d&apos;Ivoire<br />
                <strong>Téléphone :</strong> +225 07 79 99 78 73<br />
                <strong>Email :</strong> innocentkoffi1@gmail.com
              </p>
            </section>

            <section>
              <h2 className="text-xl font-playfair font-semibold text-foreground mb-3">2. Hébergement</h2>
              <p>
                Ce site est hébergé par <strong>Lovable</strong>.<br />
                Site web : <a href="https://lovable.dev" className="text-elegant-600 hover:underline" target="_blank" rel="noopener noreferrer">lovable.dev</a>
              </p>
            </section>

            <section>
              <h2 className="text-xl font-playfair font-semibold text-foreground mb-3">3. Propriété intellectuelle</h2>
              <p>
                L&apos;ensemble des contenus de ce site (textes, images, graphismes, logo, icônes, etc.) 
                est la propriété exclusive de Clémence KANGAH, sauf mention contraire. Toute reproduction, 
                distribution, modification ou utilisation de ces contenus sans autorisation préalable est 
                strictement interdite.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-playfair font-semibold text-foreground mb-3">4. Protection des données personnelles</h2>
              <p>
                Les informations recueillies via les formulaires de contact et d&apos;inscription à la newsletter 
                sont destinées exclusivement à Clémence KANGAH. Conformément à la loi, vous disposez d&apos;un 
                droit d&apos;accès, de rectification et de suppression de vos données. Pour exercer ce droit, 
                contactez-nous à l&apos;adresse email ci-dessus.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-playfair font-semibold text-foreground mb-3">5. Cookies</h2>
              <p>
                Ce site peut utiliser des cookies pour améliorer l&apos;expérience utilisateur. En continuant 
                à naviguer sur ce site, vous acceptez l&apos;utilisation de cookies.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-playfair font-semibold text-foreground mb-3">6. Responsabilité</h2>
              <p>
                Clémence KANGAH ne saurait être tenue responsable des erreurs ou omissions dans le contenu 
                du site, ni des dommages directs ou indirects résultant de l&apos;utilisation du site.
              </p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default MentionsLegales;
