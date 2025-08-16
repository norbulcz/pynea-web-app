'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { AuthManager } from '@/core/AuthManager';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const authManager = AuthManager.getInstance();

  useEffect(() => {
    if (authManager.isUserAuthenticated()) {
      setIsAuthorized(true);
    } else {
      // Redirect to welcome page if not authenticated
      router.replace('/');
    }
    setIsLoading(false);
  }, [router]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!isAuthorized) {
    return null; // Will redirect to welcome page
  }

  return <>{children}</>;
}
