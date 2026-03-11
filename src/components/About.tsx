
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Heart, Users, BookOpen, Target } from 'lucide-react';
import { motion } from 'framer-motion';
import clemencePhoto from '@/assets/clemence-kangah-photo.png';
import AnimatedPhoto from '@/components/AnimatedPhoto';

const About = () => {
  return (
    <section id="apropos" className="py-12 md:py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          {/* Section Header */}
          <motion.div
            className="text-center mb-10 md:mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-playfair font-bold text-elegant-800 mb-4 md:mb-6">
              À propos de moi
            </h2>
            <div className="w-20 md:w-24 h-1 bg-gradient-to-r from-elegant-400 to-rose-400 mx-auto"></div>
          </motion.div>

          {/* Main Content */}
          <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center mb-12 md:mb-16">
            {/* Text Content */}
            <motion.div
              className="space-y-4 md:space-y-6 order-2 md:order-1"
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <p className="text-base md:text-lg leading-relaxed text-muted-foreground">
                Passionnée par l'art textile depuis mon plus jeune âge, j'ai fait de la couture bien plus qu'un métier : une vocation. Formée au cœur de la tradition ivoirienne et nourrie par les défis de la vie, j'ai développé un savoir-faire unique qui allie créativité, rigueur et authenticité.
              </p>
              
              <p className="text-base md:text-lg leading-relaxed text-muted-foreground">
                Aiguille après aiguille, fil après fil, j'ai appris à transformer un simple tissu en création, mais aussi les défis de la vie en force et en vision. Ce métier, commencé très jeune, est devenu au fil du temps bien plus qu'un savoir-faire : un chemin de création, de transmission et d'engagement.
              </p>
              
              <p className="text-base md:text-lg leading-relaxed text-muted-foreground">
                Je m'appelle <span className="font-semibold text-elegant-700">Clémence KANGAH</span>. Mon parcours se situe au croisement de la couture, du leadership féminin, du partage du savoir et d'une foi profonde qui guide chacune de mes actions.
              </p>
              
              <p className="text-base md:text-lg leading-relaxed text-muted-foreground">
                Formée à la couture traditionnelle et contemporaine, j'ai progressivement élargi mon engagement vers la formation, l'accompagnement social, la gestion de projets communautaires et l'écriture.
              </p>

              <p className="text-base md:text-lg leading-relaxed text-muted-foreground">
                Chaque action que je mène est guidée par un fil invisible : celui de guérir, de construire et d'éveiller.
              </p>
              
              <p className="text-base md:text-lg leading-relaxed text-elegant-700 font-semibold">
                Aujourd'hui, ma mission est de tisser des ponts entre les femmes, les communautés et les générations, afin de laisser une empreinte utile, féminine et durable.
              </p>
            </motion.div>

            {/* Profile Image with animation */}
            <div className="relative order-1 md:order-2">
              <AnimatedPhoto
                src={clemencePhoto}
                alt="Clémence KANGAH – Couturière professionnelle"
                variant="about"
                containerClassName="relative"
                className="w-full h-72 sm:h-80 md:h-96 object-cover rounded-2xl shadow-2xl"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-elegant-900/20 to-transparent rounded-2xl pointer-events-none z-20"></div>
              
              {/* Floating elements */}
              <motion.div
                className="absolute -top-4 -right-4 w-8 h-8 bg-rose-400 rounded-full"
                animate={{ y: [0, -8, 0], opacity: [0.6, 1, 0.6] }}
                transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
              />
              <motion.div
                className="absolute -bottom-4 -left-4 w-6 h-6 bg-elegant-400 rounded-full"
                animate={{ y: [0, -6, 0], opacity: [0.5, 0.9, 0.5] }}
                transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
              />
            </div>
          </div>

          {/* Values Cards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6">
            {[
              { icon: Heart, color: 'text-rose-500', title: 'Foi', desc: 'Guidée par mes valeurs spirituelles' },
              { icon: Users, color: 'text-elegant-500', title: 'Communauté', desc: 'Tisser des liens et créer du lien social' },
              { icon: BookOpen, color: 'text-coral-500', title: 'Transmission', desc: 'Partager mes connaissances et expériences' },
              { icon: Target, color: 'text-rose-500', title: 'Impact', desc: 'Laisser une trace positive et durable' },
            ].map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <Card className="text-center hover:shadow-lg transition-shadow duration-300 border-elegant-200 h-full">
                  <CardContent className="p-4 md:p-6">
                    <item.icon className={`w-8 h-8 md:w-12 md:h-12 ${item.color} mx-auto mb-2 md:mb-4`} />
                    <h3 className="font-playfair font-semibold text-base md:text-xl text-foreground mb-1 md:mb-2">{item.title}</h3>
                    <p className="text-xs md:text-sm text-muted-foreground">{item.desc}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
