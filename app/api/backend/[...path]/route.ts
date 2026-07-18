import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

import { STAFF_COOKIE_NAMES } from '../../../../src/lib/auth/staff-cookies';
import { env } from '../../../../src/lib/env/env';

interface BackendRouteContext {
  params: Promise<{ path: string[] }>;
}

async function forwardRequest(request: Request, context: BackendRouteContext): Promise<Response> {
  if (!env.NEXT_PUBLIC_API_BASE_URL) {
    return NextResponse.json(
      { success: false, message: 'Backend API is not configured.', data: null },
      { status: 503 },
    );
  }

  const { path } = await context.params;
  const decodedPath = path.map((segment) => decodeURIComponent(segment));
  const backendPath = decodedPath[0] === 'api' && decodedPath[1] === 'v1'
    ? decodedPath.slice(2)
    : decodedPath;
  const backendUrl = new URL(
    `${env.NEXT_PUBLIC_API_BASE_URL}/${backendPath.map((segment) => encodeURIComponent(segment)).join('/')}`,
  );
  const requestUrl = new URL(request.url);
  backendUrl.search = requestUrl.search;

  const cookieStore = await cookies();
  const accessToken = cookieStore.get(STAFF_COOKIE_NAMES.accessToken)?.value;
  const headers = new Headers(request.headers);

  headers.delete('host');
  headers.delete('content-length');
  headers.delete('cookie');

  if (accessToken) {
    headers.set('Authorization', `Bearer ${accessToken}`);
  }

  const body = request.method === 'GET' || request.method === 'HEAD'
    ? undefined
    : await request.arrayBuffer();

  try {
    const backendResponse = await fetch(backendUrl, {
      method: request.method,
      headers,
      body,
      cache: 'no-store',
    });
    const responseHeaders = new Headers();
    const contentType = backendResponse.headers.get('content-type');

    if (contentType) {
      responseHeaders.set('content-type', contentType);
    }

    return new NextResponse(backendResponse.body, {
      status: backendResponse.status,
      headers: responseHeaders,
    });
  } catch {
    return NextResponse.json(
      { success: false, message: 'Unable to reach the backend API.', data: null },
      { status: 503 },
    );
  }
}

export async function GET(request: Request, context: BackendRouteContext) {
  return forwardRequest(request, context);
}

export async function POST(request: Request, context: BackendRouteContext) {
  return forwardRequest(request, context);
}

export async function PUT(request: Request, context: BackendRouteContext) {
  return forwardRequest(request, context);
}

export async function PATCH(request: Request, context: BackendRouteContext) {
  return forwardRequest(request, context);
}

export async function DELETE(request: Request, context: BackendRouteContext) {
  return forwardRequest(request, context);
}
