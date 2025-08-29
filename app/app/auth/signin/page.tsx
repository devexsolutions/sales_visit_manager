
import { SignInForm } from '@/components/auth/signin-form';
import { DemoInfo } from '@/components/auth/demo-info';

export default function SignInPage() {
  return (
    <div className="space-y-8">
      <DemoInfo />
      <SignInForm />
    </div>
  );
}
