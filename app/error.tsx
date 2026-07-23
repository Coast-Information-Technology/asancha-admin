'use client';

import { useEffect } from 'react';

import { ErrorState } from '../src/components/ui/error-state/error-state';
import { Button } from '../src/components/ui/button/button';

interface AppErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function Error({ error, reset }: AppErrorProps) {
  useEffect(() => {
    console.error('Asancha Admin route error', error);
  }, [error]);

  return (
    <main className="asancha-page-shell">
      <ErrorState
        action={<Button onClick={reset}>Try again</Button>}
        description="Something went wrong while loading this admin area. Try again or contact a super admin if the problem continues."
        title="Unable to load this page"
      />
    </main>
  );
}
