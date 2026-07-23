'use client';

interface GlobalErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function GlobalError({ reset }: GlobalErrorProps) {
  return (
    <html lang="en">
      <body>
        <main
          style={{
            alignItems: 'center',
            display: 'grid',
            fontFamily: 'system-ui, sans-serif',
            gap: '1rem',
            justifyItems: 'center',
            minHeight: '100vh',
            padding: '2rem',
            textAlign: 'center',
          }}
        >
          <div>
            <h1>Asancha Admin is temporarily unavailable</h1>
            <p>Something went wrong. Try again or contact a super admin.</p>
            <button onClick={reset} type="button">
              Try again
            </button>
          </div>
        </main>
      </body>
    </html>
  );
}
