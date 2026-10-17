'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function SplitViewRedirect() {
  const router = useRouter();

  useEffect(() => {
    // Privacy protection: Split view has been deprecated and disabled
    router.replace('/');
  }, [router]);

  return (
    <div className="min-h-screen bg-[#000000] flex items-center justify-center font-mono text-xs text-muted">
      Redirecting to client storefront...
    </div>
  );
}
