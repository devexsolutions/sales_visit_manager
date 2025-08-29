
import { NextRequest, NextResponse } from 'next/server';
import { 
  PrismaClient, 
  AppointmentType, 
  AppointmentStatus, 
  AppointmentPriority 
} from '@prisma/client';

export const dynamic = 'force-dynamic';

const prisma = new PrismaClient();

// GET /api/appointments - Récupérer tous les rendez-vous
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');
    const startDate = searchParams.get('startDate');
    const endDate = searchParams.get('endDate');

    const where: any = {};

    // Filtrer par utilisateur si spécifié
    if (userId) {
      where.assignedUserId = userId;
    }

    // Filtrer par plage de dates si spécifiée
    if (startDate && endDate) {
      where.startTime = {
        gte: new Date(startDate),
        lte: new Date(endDate)
      };
    }

    const appointments = await prisma.appointment.findMany({
      where,
      include: {
        assignedUser: {
          select: {
            id: true,
            name: true,
            firstName: true,
            lastName: true,
            email: true
          }
        },
        customer: {
          select: {
            id: true,
            customerName: true,
            contactEmail: true,
            location: true
          }
        },
        attendees: true
      },
      orderBy: {
        startTime: 'asc'
      }
    });

    return NextResponse.json({
      appointments,
      count: appointments.length
    });
  } catch (error) {
    console.error('Erreur lors de la récupération des rendez-vous:', error);
    return NextResponse.json(
      { error: 'Erreur lors de la récupération des rendez-vous' },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}

// POST /api/appointments - Créer un nouveau rendez-vous
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    const {
      title,
      description,
      startTime,
      endTime,
      location,
      isAllDay = false,
      type = 'MEETING',
      status = 'SCHEDULED',
      priority = 'MEDIUM',
      reminderMinutes = 15,
      isRecurring = false,
      recurrenceRule,
      notes,
      assignedUserId,
      customerId,
      attendees = []
    } = body;

    // Validation des données requises
    if (!title || !startTime || !endTime || !assignedUserId) {
      return NextResponse.json(
        { error: 'Titre, dates de début/fin et utilisateur assigné sont requis' },
        { status: 400 }
      );
    }

    // Vérifier que la date de fin est après la date de début
    if (new Date(endTime) <= new Date(startTime) && !isAllDay) {
      return NextResponse.json(
        { error: 'La date de fin doit être après la date de début' },
        { status: 400 }
      );
    }

    // Créer le rendez-vous
    const appointment = await prisma.appointment.create({
      data: {
        title,
        description,
        startTime: new Date(startTime),
        endTime: new Date(endTime),
        location,
        isAllDay,
        type: type as AppointmentType,
        status: status as AppointmentStatus,
        priority: priority as AppointmentPriority,
        reminderMinutes,
        isRecurring,
        recurrenceRule,
        notes,
        assignedUserId,
        customerId: customerId || null,
        attendees: {
          create: attendees.map((attendee: any) => ({
            name: attendee.name,
            email: attendee.email,
            phone: attendee.phone,
            isOptional: attendee.isOptional || false
          }))
        }
      },
      include: {
        assignedUser: {
          select: {
            id: true,
            name: true,
            firstName: true,
            lastName: true,
            email: true
          }
        },
        customer: {
          select: {
            id: true,
            customerName: true,
            contactEmail: true,
            location: true
          }
        },
        attendees: true
      }
    });

    return NextResponse.json(appointment, { status: 201 });
  } catch (error) {
    console.error('Erreur lors de la création du rendez-vous:', error);
    return NextResponse.json(
      { error: 'Erreur lors de la création du rendez-vous' },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}

// PUT /api/appointments - Mettre à jour un rendez-vous
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { id, ...updateData } = body;

    if (!id) {
      return NextResponse.json(
        { error: 'ID du rendez-vous requis' },
        { status: 400 }
      );
    }

    // Préparer les données de mise à jour
    const data: any = {};
    
    if (updateData.title) data.title = updateData.title;
    if (updateData.description !== undefined) data.description = updateData.description;
    if (updateData.startTime) data.startTime = new Date(updateData.startTime);
    if (updateData.endTime) data.endTime = new Date(updateData.endTime);
    if (updateData.location !== undefined) data.location = updateData.location;
    if (updateData.isAllDay !== undefined) data.isAllDay = updateData.isAllDay;
    if (updateData.type) data.type = updateData.type as AppointmentType;
    if (updateData.status) data.status = updateData.status as AppointmentStatus;
    if (updateData.priority) data.priority = updateData.priority as AppointmentPriority;
    if (updateData.reminderMinutes !== undefined) data.reminderMinutes = updateData.reminderMinutes;
    if (updateData.notes !== undefined) data.notes = updateData.notes;
    if (updateData.customerId !== undefined) data.customerId = updateData.customerId || null;

    // Mettre à jour le rendez-vous
    const appointment = await prisma.appointment.update({
      where: { id },
      data,
      include: {
        assignedUser: {
          select: {
            id: true,
            name: true,
            firstName: true,
            lastName: true,
            email: true
          }
        },
        customer: {
          select: {
            id: true,
            customerName: true,
            contactEmail: true,
            location: true
          }
        },
        attendees: true
      }
    });

    return NextResponse.json(appointment);
  } catch (error) {
    console.error('Erreur lors de la mise à jour du rendez-vous:', error);
    return NextResponse.json(
      { error: 'Erreur lors de la mise à jour du rendez-vous' },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}

// DELETE /api/appointments - Supprimer un rendez-vous
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json(
        { error: 'ID du rendez-vous requis' },
        { status: 400 }
      );
    }

    // Supprimer le rendez-vous (les attendees seront supprimés automatiquement grâce au onDelete: Cascade)
    await prisma.appointment.delete({
      where: { id }
    });

    return NextResponse.json({ message: 'Rendez-vous supprimé avec succès' });
  } catch (error) {
    console.error('Erreur lors de la suppression du rendez-vous:', error);
    return NextResponse.json(
      { error: 'Erreur lors de la suppression du rendez-vous' },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}
