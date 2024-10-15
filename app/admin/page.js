'use client';

import { useSession } from '../../../models/node_modules/next-auth/src/react';
import { useRouter } from '@/models/node_modules/next/navigation';
import { useEffect } from 'react';

export default function AdminPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === 'loading') return; // Wait until session is loaded
    if (!session || session.user.role !== 'admin') {
      router.push('/auth/signin'); // Redirect non-admins to homepage
    }
  }, [session, status, router]);

  if (status === 'loading') return <div>Loading...</div>;

  if (session && session.user.role == "admin") {
    return (
      <div>
        <h1>Welcome, Admin!</h1>
        <p>This is a protected admin page.</p>
      </div>
    );
  }
}
