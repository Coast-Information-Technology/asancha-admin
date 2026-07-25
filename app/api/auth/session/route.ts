import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

import { AUTH_API_PATHS } from '../../../../src/features/auth/constants/auth.constants';
import { STAFF_COOKIE_NAMES } from '../../../../src/lib/auth/staff-cookies';
import { normaliseBackendStaffAuth } from '../../../../src/lib/auth/normalise-backend-staff-session';
import { env } from '../../../../src/lib/env/env';

export async function GET() {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get(STAFF_COOKIE_NAMES.accessToken)?.value;

  if (!accessToken || !env.NEXT_PUBLIC_API_BASE_URL) {
    return NextResponse.json(
      { success: false, message: 'No authenticated staff session was found.', data: null },
      { status: 401 },
    );
  }

  let backendResponse: Response;

  try {
    backendResponse = await fetch(
      `${env.NEXT_PUBLIC_API_BASE_URL}${AUTH_API_PATHS.currentStaffSession}`,
      {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
        cache: 'no-store',
      },
    );
  } catch {
    return NextResponse.json(
      { success: false, message: 'Unable to validate the staff session.', data: null },
      { status: 503 },
    );
  }

  const backendPayload = await backendResponse.json().catch(() => null);

  if (!backendResponse.ok) {
    return NextResponse.json(
      backendPayload ?? {
        success: false,
        message: 'The staff session is no longer valid.',
        data: null,
      },
      { status: backendResponse.status },
    );
  }

  const authResult = normaliseBackendStaffAuth(backendPayload, { requireAccessToken: false });

  if (!authResult) {
    return NextResponse.json(
      { success: false, message: 'The session response was incomplete.', data: null },
      { status: 502 },
    );
  }

  return NextResponse.json({
    success: true,
    message: 'Staff session loaded.',
    data: {
      session: authResult.session,
    },
    error: null,
  });
}
