import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

import { AUTH_API_PATHS } from '../../../../src/features/auth/constants/auth.constants';
import { STAFF_COOKIE_NAMES } from '../../../../src/lib/auth/staff-cookies';
import { env } from '../../../../src/lib/env/env';

export async function POST() {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get(STAFF_COOKIE_NAMES.accessToken)?.value;

  if (accessToken && env.NEXT_PUBLIC_API_BASE_URL) {
    try {
      await fetch(`${env.NEXT_PUBLIC_API_BASE_URL}${AUTH_API_PATHS.staffSignOut}`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
        cache: 'no-store',
      });
    } catch {
      // Local session cleanup still completes if the backend is unavailable.
    }
  }

  const response = NextResponse.json({
    success: true,
    message: 'Signed out successfully.',
    data: {
      signedOut: true,
    },
  });

  Object.values(STAFF_COOKIE_NAMES).forEach((name) => {
    response.cookies.set({
      name,
      value: '',
      httpOnly: true,
      maxAge: 0,
      sameSite: 'lax',
      secure: env.NEXT_PUBLIC_ENVIRONMENT === 'production',
      path: '/',
    });
  });

  return response;
}
