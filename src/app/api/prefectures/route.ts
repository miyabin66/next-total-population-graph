import { RESAS_API_KEY } from '@/env';
import { CORS_HEADERS, RESAS_API_URL } from '@/constants';
import { NextResponse } from 'next/server';
import type { GetPrefecturesResponse } from '@/interfaces/prefectures';

export async function GET() {
  const res = await fetch(`${RESAS_API_URL}/prefectures`, {
    headers: {
      'X-API-KEY': RESAS_API_KEY || '',
      'Content-Type': 'application/json;charset=UTF-8',
    },
  });
  const data = (await res.json()) as GetPrefecturesResponse;

  return NextResponse.json({ data }, { status: 200, headers: CORS_HEADERS });
}
