import { NextResponse } from 'next/server';

import { AUTH_API_PATHS } from '../../../../src/features/auth/constants/auth.constants';
import {
  STAFF_COOKIE_NAMES,
} from '../../../../src/lib/auth/staff-cookies';
import { normaliseBackendStaffAuth } from '../../../../src/lib/auth/normalise-backend-staff-session';
import { env } from '../../../../src/lib/env/env';

const REMEMBER_DEVICE_MAX_AGE_SECONDS = 60 * 60 * 24 * 30;

function getBackendUrl(path: string): string | null {
  const baseUrl = env.NEXT_PUBLIC_API_BASE_URL;

  if (!baseUrl) {
    return null;
  }

  return `${baseUrl}${path.startsWith('/') ? path : `/${path}`}`;
}

async function readResponseBody(response: Response): Promise<unknown> {
  const text = await response.text();

  if (!text) {
    return null;
  }

  try {
    return JSON.parse(text) as unknown;
  } catch {
    return text;
  }
}

export async function POST(request: Request) {
  const backendUrl = getBackendUrl(AUTH_API_PATHS.staffSignIn);

  if (!backendUrl) {
    return NextResponse.json(
      { success: false, message: 'Authentication service is not configured.', data: null },
      { status: 503 },
    );
  }

  let requestBody: unknown;

  try {
    requestBody = await request.json();
  } catch {
    return NextResponse.json(
      { success: false, message: 'Invalid sign-in request.', data: null },
      { status: 400 },
    );
  }

  if (
    typeof requestBody !== 'object' ||
    requestBody === null ||
    typeof (requestBody as { email?: unknown }).email !== 'string' ||
    typeof (requestBody as { password?: unknown }).password !== 'string'
  ) {
    return NextResponse.json(
      { success: false, message: 'Email and password are required.', data: null },
      { status: 400 },
    );
  }

  const body = requestBody as {
    email: string;
    password: string;
    rememberDevice?: boolean;
  };

  let backendResponse: Response;

  try {
    backendResponse = await fetch(backendUrl, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: body.email,
        password: body.password,
      }),
      cache: 'no-store',
    });
  } catch {
    return NextResponse.json(
      { success: false, message: 'Unable to reach the authentication service.', data: null },
      { status: 503 },
    );
  }

  const backendPayload = await readResponseBody(backendResponse);

  if (!backendResponse.ok) {
    return NextResponse.json(backendPayload ?? {
      success: false,
      message: 'Sign in failed.',
      data: null,
    }, { status: backendResponse.status });
  }

  const authResult = normaliseBackendStaffAuth(backendPayload);

  if (!authResult) {
    return NextResponse.json(
      {
        success: false,
        message: 'The authentication response was incomplete or not a staff session.',
        data: null,
      },
      { status: 502 },
    );
  }

  const response = NextResponse.json({
    success: true,
    message: 'Signed in successfully.',
    data: {
      session: authResult.session,
      redirectTo: '/dashboard',
    },
  });
  const cookieOptions = {
    httpOnly: true,
    sameSite: 'lax' as const,
    secure: env.NEXT_PUBLIC_ENVIRONMENT === 'production',
    path: '/',
    ...(body.rememberDevice ? { maxAge: REMEMBER_DEVICE_MAX_AGE_SECONDS } : {}),
  };

  response.cookies.set({
    ...cookieOptions,
    name: STAFF_COOKIE_NAMES.accessToken,
    value: authResult.accessToken,
  });

  if (authResult.refreshToken) {
    response.cookies.set({
      ...cookieOptions,
      name: STAFF_COOKIE_NAMES.refreshToken,
      value: authResult.refreshToken,
    });
  }

  if (authResult.sessionId) {
    response.cookies.set({
      ...cookieOptions,
      name: STAFF_COOKIE_NAMES.sessionId,
      value: authResult.sessionId,
    });
  }

  response.cookies.set({
    ...cookieOptions,
    name: STAFF_COOKIE_NAMES.role,
    value: authResult.session.role ?? '',
  });
  response.cookies.set({
    ...cookieOptions,
    name: STAFF_COOKIE_NAMES.accountStatus,
    value: authResult.session.accountStatus,
  });
  response.cookies.set({
    ...cookieOptions,
    name: STAFF_COOKIE_NAMES.staffPublicId,
    value: authResult.session.user?.publicId ?? '',
  });

  return response;
}
