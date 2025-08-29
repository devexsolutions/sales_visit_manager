
'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { formatDateTime } from '@/lib/utils';
import { Search, Plus, Calendar, MapPin, Clock, CheckCircle, AlertCircle } from 'lucide-react';

const mockVisits = [
  {
    id: '1',
    customerName: 'Nestlé Suisse SA',
    scheduledDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
    visitType: 'PRESENTATION',
    objective: 'Présentation solution CRM Enterprise',
    status: 'PLANNED',
    duration: 120,
    location: 'Vevey, VD',
    notes: 'Rendez-vous avec directeur IT et équipe de vente'
  },
  {
    id: '2',
    customerName: 'UBS Genève',
    scheduledDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000),
    visitType: 'NEGOTIATION',
    objective: 'Négociation contrat consulting digital',
    status: 'PLANNED',
    duration: 90,
    location: 'Genève, GE',
    notes: 'Préparer proposition finale avec conditions spéciales'
  },
  {
    id: '3',
    customerName: 'Roche Pharmaceuticals',
    scheduledDate: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
    visitType: 'FOLLOW_UP',
    objective: 'Suivi implémentation Phase 1',
    status: 'COMPLETED',
    duration: 60,
    location: 'Bâle, BS',
    notes: 'Client satisfait, planifier Phase 2'
  },
  {
    id: '4',
    customerName: 'Swiss Re',
    scheduledDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    visitType: 'DEMO',
    objective: 'Démonstration solution analytics',
    status: 'PLANNED',
    duration: 180,
    location: 'Zurich, ZH',
    notes: 'Prévoir matériel de démonstration complet'
  },
  {
    id: '5',
    customerName: 'Credit Suisse',
    scheduledDate: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
    visitType: 'PRESENTATION',
    objective: 'Présentation initiale services',
    status: 'CANCELLED',
    duration: 90,
    location: 'Zurich, ZH',
    notes: 'Reporté à la semaine prochaine'
  }
];

export default function VisitsPage() {
  const [visits] = useState(mockVisits);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const filteredVisits = visits.filter(visit => {
    const matchesSearch = visit.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      visit.objective.toLowerCase().includes(searchTerm.toLowerCase()) ||
      visit.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || visit.status === statusFilter.toUpperCase();
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'PLANNED': return 'bg-brand-sky/50 text-brand-navy border border-brand-blue/30';
      case 'COMPLETED': return 'bg-green-50 text-green-800 border border-green-200';
      case 'CANCELLED': return 'bg-red-50 text-red-800 border border-red-200';
      case 'IN_PROGRESS': return 'bg-yellow-50 text-yellow-800 border border-yellow-200';
      default: return 'bg-brand-sky/30 text-brand-navy border border-brand-sky/50';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'PLANNED': return 'Planifiée';
      case 'COMPLETED': return 'Terminée';
      case 'CANCELLED': return 'Annulée';
      case 'IN_PROGRESS': return 'En cours';
      default: return status;
    }
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'PRESENTATION': return 'Présentation';
      case 'DEMO': return 'Démonstration';
      case 'FOLLOW_UP': return 'Suivi';
      case 'NEGOTIATION': return 'Négociation';
      case 'CLOSING': return 'Finalisation';
      default: return type;
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'PLANNED': return <Clock className="h-4 w-4 text-blue-500" />;
      case 'COMPLETED': return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'CANCELLED': return <AlertCircle className="h-4 w-4 text-red-500" />;
      default: return <Calendar className="h-4 w-4 text-gray-500" />;
    }
  };

  const plannedVisits = visits.filter(v => v.status === 'PLANNED').length;
  const completedVisits = visits.filter(v => v.status === 'COMPLETED').length;
  const thisWeekVisits = visits.filter(v => {
    const visitDate = new Date(v.scheduledDate);
    const now = new Date();
    const weekStart = new Date(now.setDate(now.getDate() - now.getDay()));
    const weekEnd = new Date(weekStart.getTime() + 7 * 24 * 60 * 60 * 1000);
    return visitDate >= weekStart && visitDate <= weekEnd && v.status === 'PLANNED';
  }).length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center bg-white/80 backdrop-blur-sm p-6 rounded-2xl shadow-lg border border-brand-sky/30">
        <div>
          <h1 className="text-4xl font-bold text-brand-navy bg-gradient-to-r from-brand-navy to-brand-blue bg-clip-text text-transparent">
            Visites Clients
          </h1>
          <p className="text-brand-navy/70 mt-2 text-lg">Planifiez et gérez vos visites commerciales</p>
        </div>
        <Button className="bg-brand-navy hover:bg-brand-blue text-white shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-200">
          <Plus className="h-4 w-4 mr-2" />
          Nouvelle Visite
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="bg-white/80 backdrop-blur-sm border border-brand-sky/30 shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-3xl font-bold text-brand-navy">{plannedVisits}</div>
                <div className="text-sm text-brand-navy/70 font-medium">Planifiées</div>
              </div>
              <Clock className="h-8 w-8 text-brand-navy" />
            </div>
          </CardContent>
        </Card>
        <Card className="bg-white/80 backdrop-blur-sm border border-brand-sky/30 shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-3xl font-bold text-green-600">{completedVisits}</div>
                <div className="text-sm text-brand-navy/70 font-medium">Terminées</div>
              </div>
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
        <Card className="bg-white/80 backdrop-blur-sm border border-brand-sky/30 shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 hexagon-decoration">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-3xl font-bold text-brand-light-blue">{thisWeekVisits}</div>
                <div className="text-sm text-brand-navy/70 font-medium">Cette Semaine</div>
              </div>
              <Calendar className="h-8 w-8 text-brand-light-blue" />
            </div>
          </CardContent>
        </Card>
        <Card className="bg-white/80 backdrop-blur-sm border border-brand-sky/30 shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-3xl font-bold text-brand-blue">{visits.length}</div>
                <div className="text-sm text-brand-navy/70 font-medium">Total</div>
              </div>
              <MapPin className="h-8 w-8 text-brand-blue" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <div className="flex items-center space-x-4">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-brand-blue h-5 w-5" />
          <Input
            placeholder="Rechercher des visites..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-12 h-12 border-brand-sky bg-white/80 backdrop-blur-sm shadow-md focus:ring-brand-blue focus:border-brand-blue"
          />
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-48 h-12 border-brand-sky bg-white/80 backdrop-blur-sm shadow-md focus:ring-brand-blue focus:border-brand-blue">
            <SelectValue placeholder="Filtrer par statut" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Tous les statuts</SelectItem>
            <SelectItem value="planned">Planifiées</SelectItem>
            <SelectItem value="completed">Terminées</SelectItem>
            <SelectItem value="cancelled">Annulées</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Visits List */}
      <div className="space-y-4">
        {filteredVisits.map((visit) => (
          <Card key={visit.id} className="bg-white/80 backdrop-blur-sm border border-brand-sky/30 shadow-xl hover:shadow-2xl hover:scale-[1.02] transition-all duration-300 bg-logo-watermark">
            <CardContent className="p-6 relative z-10">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-4 mb-3">
                    <h3 className="font-bold text-xl text-brand-navy">{visit.customerName}</h3>
                    <Badge variant="outline" className="border-brand-blue text-brand-blue bg-brand-sky/20">
                      {getTypeLabel(visit.visitType)}
                    </Badge>
                    <div className="flex items-center space-x-2">
                      {getStatusIcon(visit.status)}
                      <Badge className={getStatusColor(visit.status)}>
                        {getStatusLabel(visit.status)}
                      </Badge>
                    </div>
                  </div>
                  
                  <div className="text-brand-navy/80 mb-4 text-lg font-medium">{visit.objective}</div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm mb-4">
                    <div className="flex items-center text-brand-navy bg-brand-sky/20 px-3 py-2 rounded-lg">
                      <Calendar className="h-4 w-4 mr-2 text-brand-blue" />
                      {formatDateTime(visit.scheduledDate)}
                    </div>
                    <div className="flex items-center text-brand-navy bg-brand-sky/20 px-3 py-2 rounded-lg">
                      <MapPin className="h-4 w-4 mr-2 text-brand-blue" />
                      {visit.location}
                    </div>
                    <div className="flex items-center text-brand-navy bg-brand-sky/20 px-3 py-2 rounded-lg">
                      <Clock className="h-4 w-4 mr-2 text-brand-blue" />
                      {visit.duration} minutes
                    </div>
                  </div>
                  
                  {visit.notes && (
                    <div className="text-sm text-brand-navy bg-white/60 p-3 rounded-xl border border-brand-sky/30">
                      <strong>Notes:</strong> {visit.notes}
                    </div>
                  )}
                </div>
                
                <div className="flex flex-col space-y-3 ml-6">
                  {visit.status === 'PLANNED' && (
                    <>
                      <Button size="sm" className="bg-brand-navy hover:bg-brand-blue hover:scale-105 transition-all duration-200">
                        <MapPin className="h-4 w-4 mr-1" />
                        Itinéraire
                      </Button>
                      <Button size="sm" variant="outline" className="border-brand-blue text-brand-blue hover:bg-brand-sky hover:scale-105 transition-all duration-200">
                        Modifier
                      </Button>
                      <Button size="sm" variant="outline" className="border-red-500 text-red-600 hover:bg-red-50 hover:scale-105 transition-all duration-200">
                        Annuler
                      </Button>
                    </>
                  )}
                  {visit.status === 'COMPLETED' && (
                    <Button size="sm" variant="outline" className="border-green-500 text-green-600 hover:bg-green-50 hover:scale-105 transition-all duration-200">
                      Rapport visite
                    </Button>
                  )}
                  {visit.status === 'CANCELLED' && (
                    <Button size="sm" variant="outline" className="border-brand-blue text-brand-blue hover:bg-brand-sky hover:scale-105 transition-all duration-200">
                      Reprogrammer
                    </Button>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
