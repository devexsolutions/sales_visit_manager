
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { FadeIn } from '@/components/ui/micro-interactions';
import Image from 'next/image';
import { 
  Building2, 
  LayoutDashboard, 
  Users, 
  Phone, 
  Calendar, 
  MapPin, 
  FileText, 
  BarChart3,
  Settings,
  LogOut,
  Menu,
  Bell,
  Home,
  TrendingUp
} from 'lucide-react';
import Link from 'next/link';
import { useAuth } from '@/hooks/useAuth';

interface DashboardLayoutProps {
  children: React.ReactNode;
  user?: {
    id: string;
    email?: string | null;
    name?: string | null;
    firstName?: string | null;
    lastName?: string | null;
    role?: string;
    territory?: string | null;
  };
}

export function DashboardLayout({ children, user: propUser }: DashboardLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const router = useRouter();
  const { user: authUser, signOut } = useAuth();
  
  // Use auth user if available, fallback to prop user for compatibility
  const user = authUser || propUser;

  const handleGoHome = () => {
    router.push('/');
  };

  const handleSignOut = async () => {
    await signOut();
    router.push('/auth/signin');
  };

  const navigation = [
    { name: 'Tableau de Bord', href: '/dashboard', icon: LayoutDashboard },
    { name: 'Clients', href: '/dashboard/customers', icon: Users },
    { name: 'Agenda', href: '/dashboard/agenda', icon: Calendar },
    { name: 'Appels', href: '/dashboard/calls', icon: Phone },
    { name: 'Offres', href: '/dashboard/offers', icon: FileText },
    { name: 'Visites', href: '/dashboard/visits', icon: Building2 },
    { name: 'Itinéraires', href: '/dashboard/routes', icon: MapPin },
    ...(user?.role === 'MANAGER' ? [
      { name: 'Rapports', href: '/dashboard/reports', icon: BarChart3 },
      { name: 'Sales Manager', href: '/dashboard/sales-manager', icon: TrendingUp }
    ] : []),
  ];

  const Sidebar = () => (
    <div className="flex flex-col h-full bg-brand-gradient-dark text-white relative">
      {/* Background logo watermark */}
      <div className="absolute inset-0 bg-logo-watermark opacity-30"></div>
      
      {/* Logo */}
      <div className="flex items-center space-x-3 p-6 border-b border-brand-blue/30 relative z-10">
        <div className="relative w-10 h-10 rounded-xl overflow-hidden bg-white/10 backdrop-blur-sm p-1">
          <Image
            src="/birdlogyc-logo.png"
            alt="birdlogyc logo"
            fill
            className="object-contain"
          />
        </div>
        <span className="text-xl font-bold bg-gradient-to-r from-white to-brand-sky bg-clip-text text-transparent">birdlogyc</span>
      </div>

      {/* User Info */}
      <div className="p-4 border-b border-brand-blue/30 relative z-10">
        <div className="text-sm text-brand-sky/80">Mode Démonstration</div>
        <div className="font-medium text-white">{user?.name || `${user?.firstName} ${user?.lastName}`}</div>
        <div className="text-xs text-brand-sky/60">{user?.role === 'MANAGER' ? 'Manager' : 'Représentant Commercial'}</div>
        {user?.territory && (
          <div className="text-xs text-brand-sky/60 mt-1">Territoire: {user.territory}</div>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2 relative z-10">
        {navigation?.map((item) => (
          <Link
            key={item.name}
            href={item.href}
            className="flex items-center space-x-3 px-3 py-2 rounded-xl hover:bg-white/10 backdrop-blur-sm transition-all duration-200 group border border-transparent hover:border-brand-sky/20"
            onClick={() => setSidebarOpen(false)}
          >
            <item.icon className="h-5 w-5 text-brand-sky group-hover:text-white transition-colors" />
            <span className="text-brand-sky group-hover:text-white transition-colors">{item.name}</span>
          </Link>
        ))}
      </nav>

      {/* Bottom Actions */}
      <div className="p-4 border-t border-brand-blue/30 relative z-10">
        <Button
          variant="ghost"
          className="w-full justify-start text-brand-sky hover:text-white hover:bg-white/10 backdrop-blur-sm border border-transparent hover:border-brand-sky/20"
          onClick={() => {}}
        >
          <Settings className="mr-2 h-4 w-4" />
          Paramètres
        </Button>
        <Button
          variant="ghost"
          className="w-full justify-start text-brand-sky hover:text-white hover:bg-white/10 backdrop-blur-sm mt-2 border border-transparent hover:border-brand-sky/20"
          onClick={handleSignOut}
        >
          <LogOut className="mr-2 h-4 w-4" />
          Se déconnecter
        </Button>
        <Button
          variant="ghost"
          className="w-full justify-start text-brand-sky hover:text-white hover:bg-white/10 backdrop-blur-sm mt-2 border border-transparent hover:border-brand-sky/20"
          onClick={handleGoHome}
        >
          <Home className="mr-2 h-4 w-4" />
          Retour à l'accueil
        </Button>
      </div>
      
      {/* Hexagonal decoration */}
      <div className="absolute bottom-20 right-4 w-12 h-10 bg-brand-sky/20 clip-path-hexagon animate-brand-pulse"></div>
    </div>
  );

  return (
    <div className="h-screen flex bg-brand-gradient-soft">
      {/* Desktop Sidebar */}
      <div className="hidden lg:flex lg:w-64 lg:flex-col">
        <Sidebar />
      </div>

      {/* Mobile Sidebar */}
      <Sheet open={sidebarOpen} onOpenChange={setSidebarOpen}>
        <SheetContent side="left" className="p-0 w-64">
          <Sidebar />
        </SheetContent>
      </Sheet>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Header */}
        <header className="bg-white/80 backdrop-blur-sm border-b border-brand-sky/30 px-4 py-4 shadow-sm">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="sm" className="lg:hidden text-brand-navy hover:bg-brand-sky/20">
                    <Menu className="h-5 w-5" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="p-0 w-64">
                  <Sidebar />
                </SheetContent>
              </Sheet>
              <div className="hidden lg:block">
                <h1 className="text-2xl font-semibold text-brand-navy">
                  {user?.role === 'MANAGER' ? 'Tableau de Bord Manager' : 'Tableau de Bord Commercial'}
                </h1>
                <p className="text-sm text-brand-navy/70 mt-1">
                  Mode Démonstration - {user?.firstName || user?.name}
                </p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm" className="text-brand-navy hover:bg-brand-sky/20 relative">
                <Bell className="h-5 w-5" />
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-brand-blue rounded-full animate-pulse"></div>
              </Button>
              <Button variant="outline" size="sm" onClick={handleGoHome} className="border-brand-blue text-brand-blue hover:bg-brand-sky hover:border-brand-navy">
                <Home className="h-4 w-4 mr-2" />
                Accueil
              </Button>
            </div>
          </div>
        </header>

        {/* Main Content Area with logo background */}
        <main className="flex-1 overflow-y-auto p-6 bg-logo-watermark relative">
          <FadeIn>
            <div className="relative z-10">
              {children}
            </div>
          </FadeIn>
          {/* Floating hexagonal decorations */}
          <div className="absolute top-20 right-20 w-8 h-7 bg-brand-sky/20 clip-path-hexagon animate-float" style={{animationDelay: '1s'}}></div>
          <div className="absolute bottom-32 left-10 w-6 h-5 bg-brand-light-blue/15 clip-path-hexagon animate-brand-pulse" style={{animationDelay: '3s'}}></div>
        </main>
      </div>
    </div>
  );
}
