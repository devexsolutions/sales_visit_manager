
export const dynamic = "force-dynamic";

import { prisma } from '@/lib/db';
import { DashboardStats } from '@/lib/types';

// UserRole type for demo mode
type UserRole = 'SALES_REP' | 'MANAGER' | 'ADMIN';

export async function getDashboardStats(userId: string, userRole?: UserRole | string): Promise<DashboardStats> {
  try {
    const now = new Date();
    const weekStart = new Date(now);
    weekStart.setDate(now.getDate() - now.getDay());
    weekStart.setHours(0, 0, 0, 0);

    const weekEnd = new Date(weekStart);
    weekEnd.setDate(weekStart.getDate() + 6);
    weekEnd.setHours(23, 59, 59, 999);

    // Base query conditions based on role
    const baseCondition = userRole === 'MANAGER' ? {} : { assignedUserId: userId };

    // Total customers
    const totalCustomers = await prisma.customer.count({
      where: baseCondition
    });

    // Active customers
    const activeCustomers = await prisma.customer.count({
      where: {
        ...baseCondition,
        customerStatus: 'ACTIVE'
      }
    });

    // Total offers
    const totalOffers = await prisma.offer.count({
      where: baseCondition
    });

    // Total offers value
    const offersValue = await prisma.offer.aggregate({
      where: baseCondition,
      _sum: { amount: true }
    });

    // Win rate calculation
    const wonOffers = await prisma.offer.count({
      where: {
        ...baseCondition,
        status: 'WON'
      }
    });

    const winRate = totalOffers > 0 ? Math.round((wonOffers / totalOffers) * 100) : 0;

    // Pending calls
    const pendingCalls = await prisma.callPlan.count({
      where: {
        ...baseCondition,
        status: 'PENDING'
      }
    });

    // Visits this week
    const visitsThisWeek = await prisma.visit.count({
      where: {
        ...baseCondition,
        scheduledDate: {
          gte: weekStart,
          lte: weekEnd
        }
      }
    });

    // Top customers by sales history
    const topCustomersData = await prisma.customer.findMany({
      where: {
        ...baseCondition,
        salesHistory: { gt: 0 }
      },
      orderBy: { salesHistory: 'desc' },
      take: 5,
      select: {
        id: true,
        customerName: true,
        salesHistory: true,
        potentialGrowth: true
      }
    });

    const topCustomers = topCustomersData?.map((customer: any) => ({
      id: customer.id,
      name: customer.customerName,
      value: customer.salesHistory || 0,
      growth: customer.potentialGrowth || 0
    })) || [];

    // Offers needing attention (sent or in negotiation)
    const offersNeedingAttention = await prisma.offer.findMany({
      where: {
        ...baseCondition,
        status: { in: ['SENT', 'NEGOTIATION'] }
      },
      include: {
        customer: true,
        assignedUser: true
      },
      orderBy: { expectedClose: 'asc' },
      take: 5
    });

    // Upcoming visits
    const upcomingVisits = await prisma.visit.findMany({
      where: {
        ...baseCondition,
        scheduledDate: { gte: now },
        status: 'PLANNED'
      },
      include: {
        customer: true,
        assignedUser: true,
        offer: true
      },
      orderBy: { scheduledDate: 'asc' },
      take: 5
    });

    return {
      totalCustomers,
      activeCustomers,
      totalOffers,
      totalOffersValue: Number(offersValue._sum.amount || 0),
      winRate,
      pendingCalls,
      visitsThisWeek,
      topCustomers,
      offersNeedingAttention: (offersNeedingAttention || []) as any[],
      upcomingVisits: (upcomingVisits || []) as any[]
    };
  } catch (error) {
    console.error('Error fetching dashboard stats:', error);
    
    // Return default stats on error
    return {
      totalCustomers: 0,
      activeCustomers: 0,
      totalOffers: 0,
      totalOffersValue: 0,
      winRate: 0,
      pendingCalls: 0,
      visitsThisWeek: 0,
      topCustomers: [],
      offersNeedingAttention: [],
      upcomingVisits: []
    };
  }
}
