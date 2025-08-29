
import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

export const dynamic = 'force-dynamic';

const prisma = new PrismaClient();

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const period = searchParams.get('period') || 'month';

    // Calculer les dates selon la période
    const now = new Date();
    let startDate: Date;

    switch (period) {
      case 'quarter':
        const quarter = Math.floor(now.getMonth() / 3);
        startDate = new Date(now.getFullYear(), quarter * 3, 1);
        break;
      case 'year':
        startDate = new Date(now.getFullYear(), 0, 1);
        break;
      default:
        startDate = new Date(now.getFullYear(), now.getMonth(), 1);
        break;
    }

    // Récupérer tous les commerciaux
    const salesReps = await prisma.user.findMany({
      where: {
        role: 'SALES_REP'
      },
      select: {
        id: true,
        name: true,
        firstName: true,
        lastName: true,
        offers: {
          where: {
            updatedAt: {
              gte: startDate,
              lte: now
            }
          },
          select: {
            amount: true,
            status: true,
            probability: true,
            updatedAt: true
          }
        },
        visits: {
          where: {
            actualDate: {
              gte: startDate,
              lte: now
            }
          },
          select: {
            id: true,
            outcome: true
          }
        }
      }
    });

    // Calculer les performances de chaque commercial
    const performances = salesReps.map((rep: any, index: number) => {
      const wonOffers = rep.offers.filter((offer: any) => offer.status === 'WON');
      const actualSales = wonOffers.reduce((sum: number, offer: any) => sum + offer.amount, 0);
      
      // Objectifs individuels basés sur la période
      const targetSales = period === 'month' ? 170000 : 
                         period === 'quarter' ? 500000 : 
                         2000000;
      
      const totalOffers = rep.offers.length;
      const conversionRate = totalOffers > 0 ? (wonOffers.length / totalOffers) * 100 : 0;
      
      // Simuler une tendance basée sur les performances récentes
      const recentOffers = rep.offers.filter((offer: any) => {
        const offerDate = new Date(offer.updatedAt);
        const twoWeeksAgo = new Date(now.getTime() - 14 * 24 * 60 * 60 * 1000);
        return offerDate >= twoWeeksAgo;
      });
      
      const trend = recentOffers.length > rep.offers.length * 0.3 ? 'up' : 
                   recentOffers.length < rep.offers.length * 0.1 ? 'down' : 'stable';

      return {
        id: rep.id,
        name: rep.name || `${rep.firstName} ${rep.lastName}`,
        actualSales,
        targetSales,
        deals: totalOffers,
        conversionRate,
        trend: trend as 'up' | 'down' | 'stable',
        performance: (actualSales / targetSales) * 100
      };
    });

    // Trier par ventes actuelles et assigner les rangs
    const sortedPerformances = performances
      .sort((a: any, b: any) => b.actualSales - a.actualSales)
      .map((perf: any, index: number) => ({
        ...perf,
        rank: index + 1
      }));

    return NextResponse.json({
      salesReps: sortedPerformances,
      period,
      lastUpdated: now.toISOString()
    });
  } catch (error) {
    console.error('Erreur lors de la récupération du classement:', error);
    return NextResponse.json(
      { error: 'Erreur lors de la récupération du classement' },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}
