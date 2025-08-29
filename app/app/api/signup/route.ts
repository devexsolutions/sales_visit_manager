
// Demo signup API endpoint
import { NextRequest, NextResponse } from 'next/server';
import { demoUsers, AuthManager } from '@/lib/auth';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { email, username, firstName, lastName, password } = body;

    // Demo mode accepts any signup attempt and creates a successful response
    const userToLogin = email || `${username || firstName || 'demo'}@birdlogyc.com`;
    
    // For testing/demo: always use the first demo user regardless of input
    const defaultUser = demoUsers[0];
    AuthManager.login(defaultUser.email);
    
    // Redirect to dashboard after successful signup
    return NextResponse.redirect(new URL('/dashboard', req.url), 302);
  } catch (error) {
    console.error('Signup API Error:', error);
    return NextResponse.json({ error: 'Erreur de traitement' }, { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  return NextResponse.json({
    message: 'API Inscription - Mode Démonstration',
    availableUsers: demoUsers.map(u => ({
      email: u.email,
      name: u.name,
      role: u.role,
      territory: u.territory || 'Non défini'
    }))
  });
}
