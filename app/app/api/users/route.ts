
import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

export const dynamic = 'force-dynamic';

const prisma = new PrismaClient();

// GET /api/users - Récupérer la liste des utilisateurs
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const limit = searchParams.get('limit');
    const role = searchParams.get('role');

    const where: any = {};
    
    // Filtrer par rôle si spécifié
    if (role) {
      where.role = role;
    }

    const queryOptions: any = {
      where,
      select: {
        id: true,
        name: true,
        firstName: true,
        lastName: true,
        email: true,
        role: true,
        territory: true
      },
      orderBy: {
        createdAt: 'asc'
      }
    };

    // Limiter le nombre de résultats si spécifié
    if (limit) {
      queryOptions.take = parseInt(limit);
    }

    const users = await prisma.user.findMany(queryOptions);

    return NextResponse.json({
      users,
      count: users.length
    });
  } catch (error) {
    console.error('Erreur lors de la récupération des utilisateurs:', error);
    return NextResponse.json(
      { error: 'Erreur lors de la récupération des utilisateurs' },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}
