'use client';

import WelcomePage from '@/components/WelcomePage';
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();

  const handleNavigate = (path: string) => {
    router.push(path);
  };

  return <WelcomePage onNavigate={handleNavigate} />;
}
