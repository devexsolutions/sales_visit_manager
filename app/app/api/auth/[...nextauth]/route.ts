
// Demo authentication API endpoints
import { NextRequest, NextResponse } from 'next/server';
import { demoUsers, AuthManager } from '@/lib/auth';

export async function GET(req: NextRequest, { params }: { params: { nextauth: string[] } }) {
  const { nextauth } = params;
  const action = nextauth?.[0];

  switch (action) {
    case 'providers':
      return NextResponse.json({
        demo: {
          id: 'demo',
          name: 'Mode Démonstration',
          type: 'credentials',
          credentials: {
            email: { label: 'Email', type: 'email', placeholder: 'demo@birdlogyc.com' }
          }
        }
      });

    case 'session':
      const user = AuthManager.getCurrentUser();
      if (user) {
        return NextResponse.json({
          user: {
            id: user.id,
            email: user.email,
            name: user.name,
            firstName: user.firstName,
            lastName: user.lastName,
            role: user.role,
            territory: user.territory
          },
          expires: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString()
        });
      } else {
        return NextResponse.json(null);
      }

    case 'csrf':
      return NextResponse.json({ csrfToken: 'demo-csrf-token' });

    default:
      return NextResponse.json({ 
        message: `Mode démonstration - Action: ${action}`,
        availableUsers: demoUsers.map(u => ({ email: u.email, role: u.role }))
      });
  }
}

export async function POST(req: NextRequest, { params }: { params: { nextauth: string[] } }) {
  const { nextauth } = params;
  const action = nextauth?.[0];

  try {
    const body = await req.json();

    switch (action) {
      case 'signin':
      case 'callback':
        const { email, username, password, callbackUrl } = body;
        
        // Demo mode accepts any login attempt
        let userToLogin = email || `${username || 'demo'}@birdlogyc.com`;
        
        // Try to find a matching demo user, fallback to first demo user
        const user = demoUsers.find(u => u.email.toLowerCase() === userToLogin.toLowerCase()) || demoUsers[0];
        AuthManager.login(user.email);
        
        // For demo mode, always redirect to dashboard on login attempt
        const redirectUrl = callbackUrl || '/dashboard';
        return NextResponse.redirect(new URL(redirectUrl, req.url), 302);

      case 'signout':
        AuthManager.logout();
        // Redirect to home page after logout
        return NextResponse.redirect(new URL('/', req.url), 302);

      default:
        return NextResponse.json({ error: 'Action non supportée en mode démo' }, { status: 400 });
    }
  } catch (error) {
    console.error('Auth API Error:', error);
    return NextResponse.json({ error: 'Erreur de traitement' }, { status: 500 });
  }
}
