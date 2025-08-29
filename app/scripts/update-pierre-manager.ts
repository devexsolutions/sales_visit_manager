
import { PrismaClient, UserRole } from '@prisma/client';

const prisma = new PrismaClient();

async function updatePierreToManager() {
  try {
    // Trouver Pierre Martin
    const pierre = await prisma.user.findUnique({
      where: { email: 'pierre@birdlogyc.com' }
    });

    if (pierre) {
      // Le mettre à jour comme MANAGER
      const updatedPierre = await prisma.user.update({
        where: { email: 'pierre@birdlogyc.com' },
        data: { 
          role: UserRole.MANAGER,
          territory: 'Suisse Romande' // Élargir son territoire
        }
      });

      console.log('✅ Pierre Martin mis à jour comme MANAGER:', updatedPierre);
    } else {
      console.log('❌ Pierre Martin non trouvé');
    }

    // Vérifier les utilisateurs finaux
    const users = await prisma.user.findMany({
      select: {
        email: true,
        name: true,
        role: true,
        territory: true
      }
    });

    console.log('\n=== UTILISATEURS DEMO FINAUX ===');
    console.log('📧 Connexions disponibles:');
    users.forEach(user => {
      console.log(`  - ${user.email} (${user.name}) - ${user.role}`);
      console.log(`    Territoire: ${user.territory}`);
    });

    console.log('\n🔐 Mot de passe pour tous: demo123');

  } catch (error) {
    console.error('❌ Erreur:', error);
  } finally {
    await prisma.$disconnect();
  }
}

updatePierreToManager();
