import { NextRequest, NextResponse } from 'next/server';

export async function GET(
  request: NextRequest,
  { params }: { params: { path: string[] } }
) {
  return handleRequest(request, params.path, 'GET');
}

export async function POST(
  request: NextRequest,
  { params }: { params: { path: string[] } }
) {
  return handleRequest(request, params.path, 'POST');
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { path: string[] } }
) {
  return handleRequest(request, params.path, 'PUT');
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { path: string[] } }
) {
  return handleRequest(request, params.path, 'DELETE');
}

async function handleRequest(
  request: NextRequest,
  pathSegments: string[],
  method: string
) {
  const backendUrl = process.env.BACKEND_URL || 'http://localhost:8000';
  const path = pathSegments.join('/');
  const url = `${backendUrl}/api/v1/${path}`;
  
  const headers = new Headers();
  request.headers.forEach((value, key) => {
    if (key !== 'host') {
      headers.set(key, value);
    }
  });

  try {
    const response = await fetch(url, {
      method,
      headers,
      body: method !== 'GET' ? await request.text() : undefined,
    });

    const responseData = await response.text();
    
    return new NextResponse(responseData, {
      status: response.status,
      statusText: response.statusText,
      headers: response.headers,
    });
  } catch (error) {
    console.error('Proxy error:', error);
    return NextResponse.json(
      { error: 'Backend service unavailable' },
      { status: 503 }
    );
  }
} 