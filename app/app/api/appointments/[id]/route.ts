
import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

export const dynamic = 'force-dynamic';

const prisma = new PrismaClient();

// GET /api/appointments/[id] - Récupérer un rendez-vous spécifique
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;

    if (!id) {
      return NextResponse.json(
        { error: 'ID du rendez-vous requis' },
        { status: 400 }
      );
    }

    const appointment = await prisma.appointment.findUnique({
      where: { id },
      include: {
        assignedUser: {
          select: {
            id: true,
            name: true,
            firstName: true,
            lastName: true,
            email: true,
            territory: true
          }
        },
        customer: {
          select: {
            id: true,
            customerName: true,
            mainContact: true,
            contactEmail: true,
            contactPhone: true,
            location: true,
            latitude: true,
            longitude: true
          }
        },
        attendees: true
      }
    });

    if (!appointment) {
      return NextResponse.json(
        { error: 'Rendez-vous non trouvé' },
        { status: 404 }
      );
    }

    return NextResponse.json(appointment);
  } catch (error) {
    console.error('Erreur lors de la récupération du rendez-vous:', error);
    return NextResponse.json(
      { error: 'Erreur lors de la récupération du rendez-vous' },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}

// PUT /api/appointments/[id] - Mettre à jour un rendez-vous spécifique
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const body = await request.json();

    if (!id) {
      return NextResponse.json(
        { error: 'ID du rendez-vous requis' },
        { status: 400 }
      );
    }

    // Vérifier que le rendez-vous existe
    const existingAppointment = await prisma.appointment.findUnique({
      where: { id }
    });

    if (!existingAppointment) {
      return NextResponse.json(
        { error: 'Rendez-vous non trouvé' },
        { status: 404 }
      );
    }

    const {
      title,
      description,
      startTime,
      endTime,
      location,
      isAllDay,
      type,
      status,
      priority,
      reminderMinutes,
      notes,
      customerId,
      attendees
    } = body;

    // Préparer les données de mise à jour
    const updateData: any = {};
    
    if (title !== undefined) updateData.title = title;
    if (description !== undefined) updateData.description = description;
    if (startTime) updateData.startTime = new Date(startTime);
    if (endTime) updateData.endTime = new Date(endTime);
    if (location !== undefined) updateData.location = location;
    if (isAllDay !== undefined) updateData.isAllDay = isAllDay;
    if (type) updateData.type = type;
    if (status) updateData.status = status;
    if (priority) updateData.priority = priority;
    if (reminderMinutes !== undefined) updateData.reminderMinutes = reminderMinutes;
    if (notes !== undefined) updateData.notes = notes;
    if (customerId !== undefined) updateData.customerId = customerId || null;

    // Gérer les participants si fournis
    if (attendees !== undefined) {
      // Supprimer les anciens participants
      await prisma.appointmentAttendee.deleteMany({
        where: { appointmentId: id }
      });

      // Ajouter les nouveaux participants
      if (attendees.length > 0) {
        updateData.attendees = {
          create: attendees.map((attendee: any) => ({
            name: attendee.name,
            email: attendee.email,
            phone: attendee.phone,
            isOptional: attendee.isOptional || false
          }))
        };
      }
    }

    // Mettre à jour le rendez-vous
    const appointment = await prisma.appointment.update({
      where: { id },
      data: updateData,
      include: {
        assignedUser: {
          select: {
            id: true,
            name: true,
            firstName: true,
            lastName: true,
            email: true,
            territory: true
          }
        },
        customer: {
          select: {
            id: true,
            customerName: true,
            mainContact: true,
            contactEmail: true,
            contactPhone: true,
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

// DELETE /api/appointments/[id] - Supprimer un rendez-vous spécifique
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;

    if (!id) {
      return NextResponse.json(
        { error: 'ID du rendez-vous requis' },
        { status: 400 }
      );
    }

    // Vérifier que le rendez-vous existe
    const existingAppointment = await prisma.appointment.findUnique({
      where: { id }
    });

    if (!existingAppointment) {
      return NextResponse.json(
        { error: 'Rendez-vous non trouvé' },
        { status: 404 }
      );
    }

    // Supprimer le rendez-vous (les participants seront supprimés automatiquement)
    await prisma.appointment.delete({
      where: { id }
    });

    return NextResponse.json({ 
      message: 'Rendez-vous supprimé avec succès',
      deletedId: id 
    });
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
