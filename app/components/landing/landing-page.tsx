
'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { 
  Building2, 
  TrendingUp, 
  Users, 
  Calendar, 
  MapPin, 
  BarChart3,
  Clock,
  Target,
  ArrowRight,
  CheckCircle
} from 'lucide-react';

export function LandingPage() {
  return (
    <div className="min-h-screen bg-brand-gradient-soft">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="relative w-12 h-12 rounded-xl overflow-hidden bg-white shadow-md">
                <Image
                  src="/birdlogyc-logo.png"
                  alt="birdlogyc logo"
                  fill
                  className="object-contain p-1"
                  priority
                />
              </div>
              <h1 className="text-2xl font-bold text-brand-navy">birdlogyc</h1>
            </div>
            <nav className="hidden md:flex items-center space-x-6">
              <a href="#features" className="text-brand-blue hover:text-brand-navy transition-colors font-medium">Fonctionnalités</a>
              <a href="#benefits" className="text-brand-blue hover:text-brand-navy transition-colors font-medium">Avantages</a>
              <div className="flex items-center space-x-3">
                <Link href="/dashboard">
                  <Button className="bg-brand-navy hover:bg-brand-blue text-white shadow-lg hover:shadow-xl transition-all duration-200">
                    Accéder au Dashboard
                  </Button>
                </Link>
              </div>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4 bg-logo-large relative overflow-hidden">
        <div className="container mx-auto max-w-6xl text-center relative z-10">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-5xl md:text-6xl font-bold text-brand-navy mb-6">
              Bienvenue sur <span className="text-brand-blue bg-gradient-to-r from-brand-blue to-brand-light-blue bg-clip-text text-transparent">birdlogyc</span>
            </h2>
            <p className="text-xl text-brand-navy/80 mb-8 leading-relaxed">
              Système professionnel de gestion des visites commerciales - Optimisez vos visites commerciales avec une planification intelligente, 
              une priorisation automatique et des insights basés sur les données. Spécialement développé pour les entreprises suisses.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/dashboard">
                <Button size="lg" className="bg-brand-navy hover:bg-brand-blue text-white text-lg px-8 py-3 shadow-xl hover:shadow-2xl transition-all duration-200 transform hover:scale-105">
                  Accéder au Dashboard Demo
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <a href="#features">
                <Button size="lg" variant="outline" className="text-lg px-8 py-3 border-brand-blue text-brand-blue hover:bg-brand-sky hover:border-brand-navy transition-all duration-200">
                  En savoir plus
                </Button>
              </a>
            </div>
          </div>
        </div>
        {/* Hexagonal decorations */}
        <div className="absolute top-20 left-10 w-16 h-14 bg-brand-sky/30 clip-path-hexagon animate-brand-pulse"></div>
        <div className="absolute bottom-20 right-10 w-12 h-10 bg-brand-light-blue/20 clip-path-hexagon animate-float"></div>
        <div className="absolute top-1/2 right-1/4 w-8 h-7 bg-brand-blue/10 clip-path-hexagon animate-brand-pulse" style={{animationDelay: '2s'}}></div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-4 bg-brand-sky/30 backdrop-blur-sm">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center bg-white/60 backdrop-blur rounded-2xl p-6 shadow-lg border border-brand-sky/50 hover:shadow-xl transition-all duration-200">
              <div className="text-4xl font-bold text-brand-navy mb-2">+25%</div>
              <div className="text-brand-navy/80 font-medium">Plus de Closes</div>
            </div>
            <div className="text-center bg-white/60 backdrop-blur rounded-2xl p-6 shadow-lg border border-brand-sky/50 hover:shadow-xl transition-all duration-200">
              <div className="text-4xl font-bold text-brand-navy mb-2">-40%</div>
              <div className="text-brand-navy/80 font-medium">Moins de Temps de Voyage</div>
            </div>
            <div className="text-center bg-white/60 backdrop-blur rounded-2xl p-6 shadow-lg border border-brand-sky/50 hover:shadow-xl transition-all duration-200">
              <div className="text-4xl font-bold text-brand-navy mb-2">3x</div>
              <div className="text-brand-navy/80 font-medium">Meilleure Planification</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-4 bg-logo-watermark">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h3 className="text-4xl font-bold text-brand-navy mb-4">
              Tout ce dont vous avez besoin pour une gestion commerciale réussie
            </h3>
            <p className="text-xl text-brand-navy/80 max-w-3xl mx-auto">
              Une plateforme complète pour la gestion de vos relations clients et activités de vente
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105 bg-white/80 backdrop-blur-sm border border-brand-sky/30 hexagon-decoration">
              <CardContent className="p-6">
                <div className="w-14 h-14 bg-brand-sky/40 rounded-xl flex items-center justify-center mb-4">
                  <Users className="h-7 w-7 text-brand-navy" />
                </div>
                <h4 className="text-xl font-semibold mb-3 text-brand-navy">Gestion des Clients</h4>
                <p className="text-brand-navy/70">
                  Vue complète de votre base clients avec profils détaillés et historique des ventes
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105 bg-white/80 backdrop-blur-sm border border-brand-sky/30">
              <CardContent className="p-6">
                <div className="w-14 h-14 bg-brand-light-blue/40 rounded-xl flex items-center justify-center mb-4">
                  <Target className="h-7 w-7 text-brand-navy" />
                </div>
                <h4 className="text-xl font-semibold mb-3 text-brand-navy">Priorisation Intelligente</h4>
                <p className="text-brand-navy/70">
                  Génération automatique de listes d'appels quotidiennes basées sur le potentiel de vente
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105 bg-white/80 backdrop-blur-sm border border-brand-sky/30">
              <CardContent className="p-6">
                <div className="w-14 h-14 bg-brand-blue/40 rounded-xl flex items-center justify-center mb-4">
                  <MapPin className="h-7 w-7 text-brand-navy" />
                </div>
                <h4 className="text-xl font-semibold mb-3 text-brand-navy">Optimisation des Itinéraires</h4>
                <p className="text-brand-navy/70">
                  Itinéraires de visite géographiquement optimisés pour des visites client efficaces en Suisse
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105 bg-white/80 backdrop-blur-sm border border-brand-sky/30">
              <CardContent className="p-6">
                <div className="w-14 h-14 bg-brand-sky/40 rounded-xl flex items-center justify-center mb-4">
                  <Calendar className="h-7 w-7 text-brand-navy" />
                </div>
                <h4 className="text-xl font-semibold mb-3 text-brand-navy">Planification des RDV</h4>
                <p className="text-brand-navy/70">
                  Planification et gestion efficaces des visites clients et rendez-vous de suivi
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105 bg-white/80 backdrop-blur-sm border border-brand-sky/30">
              <CardContent className="p-6">
                <div className="w-14 h-14 bg-brand-light-blue/40 rounded-xl flex items-center justify-center mb-4">
                  <BarChart3 className="h-7 w-7 text-brand-navy" />
                </div>
                <h4 className="text-xl font-semibold mb-3 text-brand-navy">Analytics & Rapports</h4>
                <p className="text-brand-navy/70">
                  Rapports détaillés et suivi des KPI pour des décisions de vente basées sur les données
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105 bg-white/80 backdrop-blur-sm border border-brand-sky/30">
              <CardContent className="p-6">
                <div className="w-14 h-14 bg-brand-blue/40 rounded-xl flex items-center justify-center mb-4">
                  <Clock className="h-7 w-7 text-brand-navy" />
                </div>
                <h4 className="text-xl font-semibold mb-3 text-brand-navy">Gestion des Offres</h4>
                <p className="text-brand-navy/70">
                  Gestion centralisée de toutes les offres avec rappels automatiques de suivi
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section id="benefits" className="py-20 px-4 bg-brand-gradient">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-4xl font-bold text-brand-navy mb-6">
                Pourquoi birdlogyc?
              </h3>
              <div className="space-y-6">
                <div className="flex items-start space-x-4 bg-white/60 backdrop-blur-sm p-4 rounded-xl shadow-sm">
                  <CheckCircle className="h-6 w-6 text-brand-blue mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="text-lg font-semibold mb-2 text-brand-navy">Spécialement développé pour la Suisse</h4>
                    <p className="text-brand-navy/80">Considère la géographie suisse, les heures d'ouverture et les coutumes locales</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4 bg-white/60 backdrop-blur-sm p-4 rounded-xl shadow-sm">
                  <CheckCircle className="h-6 w-6 text-brand-blue mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="text-lg font-semibold mb-2 text-brand-navy">Design Mobile-First</h4>
                    <p className="text-brand-navy/80">Optimisé pour utilisation sur le terrain - aussi disponible hors ligne</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4 bg-white/60 backdrop-blur-sm p-4 rounded-xl shadow-sm">
                  <CheckCircle className="h-6 w-6 text-brand-blue mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="text-lg font-semibold mb-2 text-brand-navy">Priorisation assistée par IA</h4>
                    <p className="text-brand-navy/80">Algorithmes intelligents pour une efficacité maximale des ventes</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4 bg-white/60 backdrop-blur-sm p-4 rounded-xl shadow-sm">
                  <CheckCircle className="h-6 w-6 text-brand-blue mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="text-lg font-semibold mb-2 text-brand-navy">Prêt à utiliser immédiatement</h4>
                    <p className="text-brand-navy/80">Pas de configuration longue - productif en 5 minutes</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="lg:text-center">
              <div className="bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-xl border border-brand-sky/50 bg-logo-corner">
                <div className="relative w-20 h-20 mx-auto mb-6 rounded-full bg-brand-sky/30 p-4">
                  <Image
                    src="/birdlogyc-logo.png"
                    alt="birdlogyc logo"
                    fill
                    className="object-contain"
                  />
                </div>
                <h4 className="text-2xl font-bold text-brand-navy mb-4">
                  Qualité Suisse
                </h4>
                <p className="text-brand-navy/80 mb-6">
                  Développé en Suisse, pour les entreprises suisses. Les plus hauts standards de sécurité et de confidentialité des données.
                </p>
                <div className="bg-brand-sky/30 p-4 rounded-lg border border-brand-blue/20">
                  <p className="text-sm text-brand-navy font-medium">
                    Conforme RGPD • Serveurs en Suisse • Chiffrement SSL
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-brand-gradient-dark relative overflow-hidden">
        <div className="container mx-auto max-w-4xl text-center relative z-10">
          <h3 className="text-4xl font-bold text-white mb-6">
            Prêt pour une gestion commerciale plus réussie?
          </h3>
          <p className="text-xl text-brand-sky mb-8">
            Découvrez dès maintenant notre dashboard de démonstration
          </p>
          <Link href="/dashboard">
            <Button size="lg" className="bg-white text-brand-navy hover:bg-brand-sky hover:text-brand-navy text-lg px-8 py-3 shadow-xl hover:shadow-2xl transition-all duration-200 transform hover:scale-105">
              Accéder au Dashboard Demo
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
          <p className="text-brand-sky/80 text-sm mt-4">
            Demo complète disponible • Toutes les fonctionnalités
          </p>
        </div>
        {/* Logo Background for CTA */}
        <div className="absolute top-0 right-0 w-96 h-96 opacity-10">
          <Image
            src="/birdlogyc-logo.png"
            alt="birdlogyc background"
            fill
            className="object-contain"
          />
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t bg-brand-gradient py-12 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-3 mb-6 md:mb-0">
              <div className="relative w-8 h-8 rounded-lg bg-white p-1">
                <Image
                  src="/birdlogyc-logo.png"
                  alt="birdlogyc logo"
                  fill
                  className="object-contain"
                />
              </div>
              <span className="text-xl font-bold text-brand-navy">birdlogyc</span>
            </div>
            <div className="text-center md:text-right">
              <p className="text-brand-navy/80 text-sm">
                © 2025 birdlogyc. Développé pour les entreprises suisses.
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
