"use client";
import { SignIn } from "@clerk/nextjs";
import { useRouter } from 'next/navigation';
import { useUser } from "@clerk/nextjs";
import { useEffect } from 'react';

export default function SignInPage() {
  const { user, isLoaded } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (isLoaded && user) {
      // Redirect to dashboard if user is already logged in
      router.replace('/dashboard');
    }
  }, [isLoaded, user, router]);

  if (!isLoaded || user) {
    // Optionally show a loading spinner or a placeholder while user state is being determined
    return (
      <div className="flex items-center justify-center h-screen">
        <span className="text-gray-700">Redirecting...</span>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center h-screen">
      <SignIn />
    </div>
  );
}
