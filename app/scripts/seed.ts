
import { 
  PrismaClient,
  UserRole, 
  CustomerSegment, 
  CustomerStatus, 
  OfferStatus, 
  VisitType, 
  VisitStatus,
  AppointmentType,
  AppointmentStatus,
  AppointmentPriority,
  AttendeeStatus
} from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  // Supprimer toutes les données existantes
  await prisma.visit.deleteMany({})
  await prisma.callPlan.deleteMany({})
  await prisma.route.deleteMany({})
  await prisma.offer.deleteMany({})
  await prisma.customer.deleteMany({})
  await prisma.session.deleteMany({})
  await prisma.account.deleteMany({})
  await prisma.user.deleteMany({})

  console.log('🧹 Base de données nettoyée')

  // Créer des utilisateurs de démonstration
  const hashedPassword = await bcrypt.hash('demo123', 12)
  
  const manager = await prisma.user.create({
    data: {
      email: 'manager@birdlogyc.com',
      firstName: 'Sarah',
      lastName: 'Johnson',
      name: 'Sarah Johnson',
      password: hashedPassword,
      role: UserRole.MANAGER,
      territory: 'Suisse Romande',
    },
  })

  const salesRep1 = await prisma.user.create({
    data: {
      email: 'pierre@birdlogyc.com',
      firstName: 'Pierre',
      lastName: 'Martin',
      name: 'Pierre Martin',
      password: hashedPassword,
      role: UserRole.SALES_REP,
      territory: 'Genève',
    },
  })

  const salesRep2 = await prisma.user.create({
    data: {
      email: 'marie@birdlogyc.com',
      firstName: 'Marie',
      lastName: 'Dubois',
      name: 'Marie Dubois',
      password: hashedPassword,
      role: UserRole.SALES_REP,
      territory: 'Lausanne',
    },
  })

  console.log('👥 Utilisateurs créés')

  // Créer des clients de démonstration
  const customers = await Promise.all([
    prisma.customer.create({
      data: {
        customerName: 'Nestlé SA',
        mainContact: 'Jean Dupont',
        contactEmail: 'jean.dupont@nestle.com',
        contactPhone: '+41 21 924 21 11',
        customerSegment: CustomerSegment.LARGE_ENTERPRISE,
        customerStatus: CustomerStatus.ACTIVE,
        salesHistory: 2500000,
        potentialGrowth: 15.5,
        lastVisit: new Date('2024-08-20'),
        lastPurchase: new Date('2024-08-15'),
        activeOfferings: 'Solutions ERP, Consultation stratégique',
        mainCompetitor: 'SAP',
        location: 'Vevey, Suisse',
        latitude: 46.4631,
        longitude: 6.8422,
        commercialNotes: 'Client premium avec un fort potentiel de croissance. Relation établie depuis 5 ans.',
        priority: 5,
        assignedUserId: salesRep1.id,
      },
    }),
    prisma.customer.create({
      data: {
        customerName: 'Rolex SA',
        mainContact: 'Catherine Lemoine',
        contactEmail: 'c.lemoine@rolex.com',
        contactPhone: '+41 22 302 22 00',
        customerSegment: CustomerSegment.LARGE_ENTERPRISE,
        customerStatus: CustomerStatus.ACTIVE,
        salesHistory: 1800000,
        potentialGrowth: 12.3,
        lastVisit: new Date('2024-08-25'),
        lastPurchase: new Date('2024-08-22'),
        activeOfferings: 'Système de gestion de production',
        mainCompetitor: 'Oracle',
        location: 'Genève, Suisse',
        latitude: 46.2044,
        longitude: 6.1432,
        commercialNotes: 'Entreprise de luxe exigeant des solutions haut de gamme.',
        priority: 5,
        assignedUserId: salesRep1.id,
      },
    }),
    prisma.customer.create({
      data: {
        customerName: 'Migros',
        mainContact: 'Marc Weber',
        contactEmail: 'marc.weber@migros.ch',
        contactPhone: '+41 44 277 20 11',
        customerSegment: CustomerSegment.LARGE_ENTERPRISE,
        customerStatus: CustomerStatus.POTENTIAL,
        salesHistory: 950000,
        potentialGrowth: 25.8,
        lastVisit: new Date('2024-08-18'),
        lastPurchase: new Date('2024-07-30'),
        activeOfferings: 'Solutions de logistique',
        mainCompetitor: 'Microsoft',
        location: 'Zurich, Suisse',
        latitude: 47.3769,
        longitude: 8.5417,
        commercialNotes: 'Opportunité majeure dans le secteur retail. Négociations en cours.',
        priority: 4,
        assignedUserId: salesRep2.id,
      },
    }),
    prisma.customer.create({
      data: {
        customerName: 'UBS AG',
        mainContact: 'Alexandra Schmidt',
        contactEmail: 'alexandra.schmidt@ubs.com',
        contactPhone: '+41 44 234 11 11',
        customerSegment: CustomerSegment.LARGE_ENTERPRISE,
        customerStatus: CustomerStatus.ACTIVE,
        salesHistory: 3200000,
        potentialGrowth: 8.7,
        lastVisit: new Date('2024-08-22'),
        lastPurchase: new Date('2024-08-10'),
        activeOfferings: 'Solutions fintech, Sécurité informatique',
        mainCompetitor: 'IBM',
        location: 'Zurich, Suisse',
        latitude: 47.3769,
        longitude: 8.5417,
        commercialNotes: 'Client stratégique dans le secteur financier. Très satisfait de nos services.',
        priority: 5,
        assignedUserId: salesRep2.id,
      },
    }),
    prisma.customer.create({
      data: {
        customerName: 'Swatch Group',
        mainContact: 'Philippe Rousseau',
        contactEmail: 'p.rousseau@swatchgroup.com',
        contactPhone: '+41 32 343 68 11',
        customerSegment: CustomerSegment.LARGE_ENTERPRISE,
        customerStatus: CustomerStatus.LEAD,
        salesHistory: 0,
        potentialGrowth: 45.2,
        lastVisit: null,
        lastPurchase: null,
        activeOfferings: 'En cours d\'évaluation',
        mainCompetitor: 'Salesforce',
        location: 'Bienne, Suisse',
        latitude: 47.1368,
        longitude: 7.2476,
        commercialNotes: 'Nouveau prospect très prometteur. Premier contact établi.',
        priority: 3,
        assignedUserId: salesRep1.id,
      },
    }),
    prisma.customer.create({
      data: {
        customerName: 'Novartis AG',
        mainContact: 'Dr. Elena Vasquez',
        contactEmail: 'elena.vasquez@novartis.com',
        contactPhone: '+41 61 324 11 11',
        customerSegment: CustomerSegment.LARGE_ENTERPRISE,
        customerStatus: CustomerStatus.ACTIVE,
        salesHistory: 2800000,
        potentialGrowth: 18.9,
        lastVisit: new Date('2024-08-19'),
        lastPurchase: new Date('2024-08-05'),
        activeOfferings: 'Plateform R&D, Analytics avancés',
        mainCompetitor: 'Google Cloud',
        location: 'Bâle, Suisse',
        latitude: 47.5596,
        longitude: 7.5886,
        commercialNotes: 'Secteur pharmaceutique exigeant. Besoins spécifiques en conformité réglementaire.',
        priority: 5,
        assignedUserId: salesRep2.id,
      },
    }),
  ])

  console.log('🏢 Clients créés')

  // Créer des offres de démonstration
  const offers = await Promise.all([
    prisma.offer.create({
      data: {
        offerName: 'Suite ERP Complète - Nestlé',
        customerName: 'Nestlé SA',
        amount: 850000,
        currency: 'CHF',
        status: OfferStatus.NEGOTIATION,
        probability: 75,
        expectedClose: new Date('2024-09-30'),
        description: 'Implémentation complète d\'une solution ERP pour optimiser les processus de production et de distribution.',
        nextAction: 'Présentation technique détaillée prévue le 2 septembre',
        lastContact: new Date('2024-08-25'),
        customerId: customers[0].id,
        assignedUserId: salesRep1.id,
      },
    }),
    prisma.offer.create({
      data: {
        offerName: 'Système de Production - Rolex',
        customerName: 'Rolex SA',
        amount: 450000,
        currency: 'CHF',
        status: OfferStatus.WON,
        probability: 100,
        expectedClose: new Date('2024-08-30'),
        description: 'Solution de gestion de production sur mesure pour l\'horlogerie de luxe.',
        nextAction: 'Démarrage de l\'implémentation',
        lastContact: new Date('2024-08-26'),
        customerId: customers[1].id,
        assignedUserId: salesRep1.id,
      },
    }),
    prisma.offer.create({
      data: {
        offerName: 'Logistique Intelligente - Migros',
        customerName: 'Migros',
        amount: 1200000,
        currency: 'CHF',
        status: OfferStatus.SENT,
        probability: 60,
        expectedClose: new Date('2024-10-15'),
        description: 'Transformation digitale de la chaîne logistique avec IA et IoT.',
        nextAction: 'Réunion de validation avec le comité directeur',
        lastContact: new Date('2024-08-20'),
        customerId: customers[2].id,
        assignedUserId: salesRep2.id,
      },
    }),
    prisma.offer.create({
      data: {
        offerName: 'Fintech Security Suite - UBS',
        customerName: 'UBS AG',
        amount: 2100000,
        currency: 'CHF',
        status: OfferStatus.NEGOTIATION,
        probability: 85,
        expectedClose: new Date('2024-09-15'),
        description: 'Solution de sécurité financière de pointe avec blockchain et cryptographie avancée.',
        nextAction: 'Audit de sécurité par l\'équipe technique UBS',
        lastContact: new Date('2024-08-24'),
        customerId: customers[3].id,
        assignedUserId: salesRep2.id,
      },
    }),
    prisma.offer.create({
      data: {
        offerName: 'Plateforme R&D - Novartis',
        customerName: 'Novartis AG',
        amount: 950000,
        currency: 'CHF',
        status: OfferStatus.DRAFT,
        probability: 40,
        expectedClose: new Date('2024-11-30'),
        description: 'Plateforme collaborative pour la recherche et développement pharmaceutique.',
        nextAction: 'Finalisation de l\'analyse des besoins',
        lastContact: new Date('2024-08-19'),
        customerId: customers[5].id,
        assignedUserId: salesRep2.id,
      },
    }),
  ])

  console.log('💰 Offres créées')

  // Créer des visites de démonstration
  const visits = await Promise.all([
    prisma.visit.create({
      data: {
        visitType: VisitType.SALES_CALL,
        status: VisitStatus.COMPLETED,
        scheduledDate: new Date('2024-08-20'),
        actualDate: new Date('2024-08-20'),
        duration: 120,
        location: 'Siège Nestlé, Vevey',
        objective: 'Présentation de la solution ERP et discussion des besoins spécifiques',
        notes: 'Excellente réception de l\'équipe technique. Questions approfondies sur l\'intégration.',
        outcome: 'Accord pour une démonstration technique détaillée',
        nextSteps: 'Organiser une démo technique avec l\'équipe IT le 2 septembre',
        satisfaction: 4,
        customerId: customers[0].id,
        assignedUserId: salesRep1.id,
        offerId: offers[0].id,
      },
    }),
    prisma.visit.create({
      data: {
        visitType: VisitType.DEMO,
        status: VisitStatus.COMPLETED,
        scheduledDate: new Date('2024-08-22'),
        actualDate: new Date('2024-08-22'),
        duration: 90,
        location: 'Bureau Rolex, Genève',
        objective: 'Démonstration finale avant signature du contrat',
        notes: 'Démonstration parfaite. Client très satisfait de toutes les fonctionnalités.',
        outcome: 'Signature du contrat confirmée',
        nextSteps: 'Préparer le kick-off du projet',
        satisfaction: 5,
        customerId: customers[1].id,
        assignedUserId: salesRep1.id,
        offerId: offers[1].id,
      },
    }),
    prisma.visit.create({
      data: {
        visitType: VisitType.FOLLOW_UP,
        status: VisitStatus.PLANNED,
        scheduledDate: new Date('2024-09-02'),
        actualDate: null,
        duration: null,
        location: 'Siège UBS, Zurich',
        objective: 'Suivi de l\'audit de sécurité et négociation finale',
        notes: null,
        outcome: null,
        nextSteps: null,
        satisfaction: null,
        customerId: customers[3].id,
        assignedUserId: salesRep2.id,
        offerId: offers[3].id,
      },
    }),
    prisma.visit.create({
      data: {
        visitType: VisitType.SALES_CALL,
        status: VisitStatus.PLANNED,
        scheduledDate: new Date('2024-09-05'),
        actualDate: null,
        duration: null,
        location: 'Bureaux Swatch Group, Bienne',
        objective: 'Premier contact commercial et présentation de l\'entreprise',
        notes: null,
        outcome: null,
        nextSteps: null,
        satisfaction: null,
        customerId: customers[4].id,
        assignedUserId: salesRep1.id,
        offerId: null,
      },
    }),
  ])

  console.log('🚗 Visites créées')

  // Créer quelques routes
  const routes = await Promise.all([
    prisma.route.create({
      data: {
        routeName: 'Tournée Genève - Septembre',
        routeDate: new Date('2024-09-02'),
        startLocation: 'Bureau Birdlogyc Genève',
        endLocation: 'Bureau Birdlogyc Genève',
        totalDistance: 45.2,
        estimatedTime: 180,
        assignedUserId: salesRep1.id,
      },
    }),
    prisma.route.create({
      data: {
        routeName: 'Tournée Zurich - Septembre',
        routeDate: new Date('2024-09-02'),
        startLocation: 'Gare de Zurich',
        endLocation: 'Aéroport de Zurich',
        totalDistance: 32.8,
        estimatedTime: 150,
        assignedUserId: salesRep2.id,
      },
    }),
  ])

  console.log('🗺️ Routes créées')

  // Créer des rendez-vous d'agenda de démonstration
  const appointments = await Promise.all([
    prisma.appointment.create({
      data: {
        title: 'Réunion équipe commerciale',
        description: 'Point hebdomadaire avec l\'équipe de vente',
        startTime: new Date(2024, 8, 2, 9, 0), // 2 septembre 2024, 9h00
        endTime: new Date(2024, 8, 2, 10, 30),
        location: 'Salle de conférence A, Bureau Genève',
        isAllDay: false,
        type: 'MEETING',
        status: 'SCHEDULED',
        priority: 'MEDIUM',
        reminderMinutes: 15,
        notes: 'Préparation des objectifs de la semaine et suivi des opportunités',
        assignedUserId: salesRep1.id,
      },
    }),
    prisma.appointment.create({
      data: {
        title: 'Présentation client - Nestlé SA',
        description: 'Démonstration de notre nouvelle solution CRM',
        startTime: new Date(2024, 8, 3, 14, 0), // 3 septembre 2024, 14h00
        endTime: new Date(2024, 8, 3, 16, 0),
        location: 'Nestlé Headquarters, Vevey',
        isAllDay: false,
        type: 'PRESENTATION',
        status: 'CONFIRMED',
        priority: 'HIGH',
        reminderMinutes: 30,
        notes: 'Présentation technique approfondie avec l\'équipe IT',
        assignedUserId: salesRep1.id,
        customerId: customers[0].id,
        attendees: {
          create: [
            {
              name: 'Jean Dupont',
              email: 'jean.dupont@nestle.com',
              phone: '+41 21 924 21 15',
              isOptional: false
            },
            {
              name: 'Marie Lefèvre',
              email: 'marie.lefevre@nestle.com',
              phone: '+41 21 924 21 16',
              isOptional: false
            }
          ]
        }
      },
    }),
    prisma.appointment.create({
      data: {
        title: 'Formation produit - Nouvelles fonctionnalités',
        description: 'Session de formation sur les dernières mises à jour',
        startTime: new Date(2024, 8, 4, 13, 30), // 4 septembre 2024, 13h30
        endTime: new Date(2024, 8, 4, 17, 0),
        location: 'Centre de formation, Lausanne',
        isAllDay: false,
        type: 'TRAINING',
        status: 'SCHEDULED',
        priority: 'MEDIUM',
        reminderMinutes: 60,
        notes: 'Formation obligatoire pour tous les commerciaux',
        assignedUserId: salesRep2.id,
      },
    }),
    prisma.appointment.create({
      data: {
        title: 'Rendez-vous client - UBS AG',
        description: 'Négociation finale du contrat fintech',
        startTime: new Date(2024, 8, 5, 10, 0), // 5 septembre 2024, 10h00
        endTime: new Date(2024, 8, 5, 12, 0),
        location: 'UBS Tower, Zurich',
        isAllDay: false,
        type: 'CLIENT_VISIT',
        status: 'CONFIRMED',
        priority: 'URGENT',
        reminderMinutes: 60,
        notes: 'Négociation du contrat de 2.1M CHF - préparation juridique requise',
        assignedUserId: salesRep2.id,
        customerId: customers[3].id,
        attendees: {
          create: [
            {
              name: 'Alexandra Schmidt',
              email: 'alexandra.schmidt@ubs.com',
              phone: '+41 44 234 11 15',
              isOptional: false
            },
            {
              name: 'Dr. Thomas Weber',
              email: 'thomas.weber@ubs.com',
              isOptional: false
            }
          ]
        }
      },
    }),
    prisma.appointment.create({
      data: {
        title: 'Conférence FinTech Suisse',
        description: 'Participation à la conférence annuelle sur les technologies financières',
        startTime: new Date(2024, 8, 6, 8, 0), // 6 septembre 2024, journée complète
        endTime: new Date(2024, 8, 6, 18, 0),
        location: 'Palexpo, Genève',
        isAllDay: true,
        type: 'CONFERENCE',
        status: 'CONFIRMED',
        priority: 'MEDIUM',
        reminderMinutes: 1440, // 1 jour avant
        notes: 'Networking et veille technologique - stand birdlogyc B24',
        assignedUserId: manager.id,
      },
    }),
    prisma.appointment.create({
      data: {
        title: 'Appel de suivi - Migros',
        description: 'Point d\'avancement sur l\'opportunité logistique',
        startTime: new Date(2024, 8, 7, 11, 0), // 7 septembre 2024, 11h00
        endTime: new Date(2024, 8, 7, 11, 30),
        location: 'Visioconférence',
        isAllDay: false,
        type: 'CALL',
        status: 'SCHEDULED',
        priority: 'HIGH',
        reminderMinutes: 15,
        notes: 'Suivi de la proposition de 1.2M CHF',
        assignedUserId: salesRep2.id,
        customerId: customers[2].id,
        attendees: {
          create: [
            {
              name: 'Marc Weber',
              email: 'marc.weber@migros.ch',
              phone: '+41 44 277 20 15',
              isOptional: false
            }
          ]
        }
      },
    }),
    prisma.appointment.create({
      data: {
        title: 'Planification stratégique Q4',
        description: 'Révision des objectifs et stratégies pour le dernier trimestre',
        startTime: new Date(2024, 8, 9, 14, 0), // 9 septembre 2024, 14h00
        endTime: new Date(2024, 8, 9, 17, 0),
        location: 'Salle de direction, Siège birdlogyc',
        isAllDay: false,
        type: 'INTERNAL',
        status: 'SCHEDULED',
        priority: 'HIGH',
        reminderMinutes: 120,
        notes: 'Préparation budget 2025 et objectifs commerciaux',
        assignedUserId: manager.id,
      },
    }),
  ])

  console.log('📅 Rendez-vous créés')

  console.log('🎉 Base de données peuplée avec succès!')
  console.log('\n📊 Résumé des données créées:')
  console.log(`- ${await prisma.user.count()} utilisateurs`)
  console.log(`- ${await prisma.customer.count()} clients`)
  console.log(`- ${await prisma.offer.count()} offres`)
  console.log(`- ${await prisma.visit.count()} visites`)
  console.log(`- ${await prisma.route.count()} routes`)
  console.log(`- ${await prisma.appointment.count()} rendez-vous`)
  
  console.log('\n🔐 Comptes de connexion disponibles:')
  console.log('manager@birdlogyc.com / demo123 (Manager)')
  console.log('pierre@birdlogyc.com / demo123 (Commercial)')
  console.log('marie@birdlogyc.com / demo123 (Commercial)')
}

main()
  .catch((e) => {
    console.error('Erreur lors du seed:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
