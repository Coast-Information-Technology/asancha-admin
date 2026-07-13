import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import type { ReactNode } from 'react';

export const metadata: Metadata = {
  title: {
    default: 'Staff Auth | Asancha Admin',
    template: '%s | Asancha Admin',
  },
  description: 'Staff-only authentication area for Asancha Admin.',
  robots: {
    index: false,
    follow: false,
  },
};

export interface AuthLayoutProps {
  children: ReactNode;
}

export default function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <main
      style={{
        minHeight: '100vh',
        display: 'grid',
        gridTemplateColumns: 'minmax(0, 1fr)',
        background:
          'radial-gradient(circle at top left, rgb(219 234 254 / 0.75), transparent 32rem), var(--asancha-color-page)',
      }}
    >
      <section
        aria-label="Asancha Admin staff authentication"
        style={{
          width: '100%',
          minHeight: '100vh',
          display: 'grid',
          placeItems: 'center',
          padding: 'clamp(1rem, 4vw, 2rem)',
        }}
      >
        <div
          style={{
            width: 'min(100%, 32rem)',
            display: 'grid',
            gap: '1.5rem',
            justifyItems: 'center',
          }}
        >
          <header
            style={{
              display: 'grid',
              justifyItems: 'center',
              gap: '0.75rem',
              textAlign: 'center',
            }}
          >
            <Link
              aria-label="Asancha Admin"
              href="/auth/sign-in"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--asancha-color-text)',
                textDecoration: 'none',
              }}
            >
              <Image
                alt="Asancha Properties"
                height={249}
                priority
                src="/logo.png"
                style={{ width: 'auto', height: '4rem', maxWidth: '100%' }}
                width={400}
              />
            </Link>

            <p
              style={{
                maxWidth: '28rem',
                color: 'var(--asancha-color-text-muted)',
                fontSize: 'var(--asancha-font-size-sm)',
                lineHeight: 'var(--asancha-line-height-relaxed)',
              }}
            >
              Staff-only operations access for authorised Asancha team members.
            </p>
          </header>

          {children}
        </div>
      </section>
    </main>
  );
}
