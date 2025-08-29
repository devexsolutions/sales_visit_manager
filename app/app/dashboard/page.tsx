
import { DashboardContent } from '@/components/dashboard/dashboard-content';
import { demoUsers } from '@/lib/auth';

// Mock dashboard stats for demo mode
const mockStats = {
  totalCustomers: 156,
  activeCustomers: 134,
  totalOffers: 45,
  totalOffersValue: 2850000,
  winRate: 68,
  pendingCalls: 12,
  visitsThisWeek: 8,
  topCustomers: [
    {
      id: '1',
      name: 'Nestlé Suisse SA',
      value: 125000,
      growth: 15000
    },
    {
      id: '2', 
      name: 'UBS Genève',
      value: 98000,
      growth: 22000
    },
    {
      id: '3',
      name: 'Roche Pharmaceuticals',
      value: 87000,
      growth: 18000
    }
  ],
  offersNeedingAttention: [
    {
      id: '1',
      offerName: 'Solution CRM Enterprise',
      customerName: 'Nestlé Suisse SA',
      amount: 45000,
      status: 'SENT'
    },
    {
      id: '2',
      offerName: 'Consulting Digital',
      customerName: 'UBS Genève',
      amount: 32000,
      status: 'NEGOTIATION'
    }
  ],
  upcomingVisits: [
    {
      id: '1',
      customer: { customerName: 'Credit Suisse' },
      scheduledDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
      visitType: 'PRESENTATION',
      objective: 'Présentation solution CRM',
      duration: 120,
      location: 'Zurich, ZH'
    },
    {
      id: '2',
      customer: { customerName: 'Swiss Re' },
      scheduledDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
      visitType: 'FOLLOW_UP',
      objective: 'Suivi proposition analytics',
      duration: 90,
      location: 'Zurich, ZH'
    }
  ]
};

export default function DashboardPage() {
  // Use the first demo user as default
  const demoUser = demoUsers[0];
    
  return (
    <DashboardContent 
      stats={mockStats} 
      user={demoUser}
    />
  );
}
