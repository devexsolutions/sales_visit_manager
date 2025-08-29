
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import Link from 'next/link';
import Image from 'next/image';
import { useAuth } from '@/hooks/useAuth';
import { demoUsers } from '@/lib/auth';

export function SignInForm() {
  const router = useRouter();
  const { signIn, loading, error } = useAuth();
  const [email, setEmail] = useState('');
  const [localError, setLocalError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLocalError('');

    if (!email) {
      setLocalError('Veuillez saisir un email');
      return;
    }

    const result = await signIn(email);
    if (result.success) {
      router.push('/dashboard');
    } else {
      setLocalError(result.error || 'Erreur de connexion');
    }
  };

  const handleDemoLogin = async (demoEmail: string) => {
    setEmail(demoEmail);
    setLocalError('');
    const result = await signIn(demoEmail);
    if (result.success) {
      router.push('/dashboard');
    } else {
      setLocalError(result.error || 'Erreur de connexion');
    }
  };

  const currentError = error || localError;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <div className="flex justify-center mb-6">
            <div className="relative w-16 h-16">
              <Image
                src="/birdlogyc-logo.png"
                alt="birdlogyc logo"
                fill
                className="object-contain"
                priority
              />
            </div>
          </div>
          <h2 className="text-3xl font-extrabold text-gray-900">birdlogyc</h2>
          <p className="mt-2 text-sm text-gray-600">
            Mode démonstration
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Connexion Démo</CardTitle>
            <CardDescription>
              Choisissez un profil de démonstration pour explorer birdlogyc
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {currentError && (
              <Alert variant="destructive">
                <AlertDescription>{currentError}</AlertDescription>
              </Alert>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email de démonstration</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Saisissez un email de démo"
                  disabled={loading}
                />
              </div>
              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? 'Connexion...' : 'Se connecter'}
              </Button>
            </form>

            <div className="space-y-3">
              <div className="text-sm font-medium text-gray-700 text-center">
                Profils de démonstration :
              </div>
              <div className="space-y-2">
                {demoUsers.map((user) => (
                  <Button
                    key={user.id}
                    variant="outline"
                    size="sm"
                    className="w-full justify-start text-left"
                    onClick={() => handleDemoLogin(user.email)}
                    disabled={loading}
                  >
                    <div className="flex flex-col items-start">
                      <span className="font-medium">{user.name}</span>
                      <span className="text-xs text-gray-500">
                        {user.email} - {user.role === 'SALES_REP' ? 'Commercial' : user.role === 'MANAGER' ? 'Manager' : 'Admin'}
                        {user.territory && ` - ${user.territory}`}
                      </span>
                    </div>
                  </Button>
                ))}
              </div>
            </div>

            <div className="text-center">
              <Link href="/" className="text-sm text-blue-600 hover:text-blue-500">
                ← Retour à l'accueil
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
