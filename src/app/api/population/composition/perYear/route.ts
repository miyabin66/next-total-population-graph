import { RESAS_API_KEY } from '@/env';
import { CORS_HEADERS, RESAS_API_URL } from '@/constants';
import { NextResponse } from 'next/server';
import type { GetPopulationResponse } from '@/interfaces/population';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const urlSearchParam = new URLSearchParams({
    prefCode: searchParams.get('prefCode') || '',
  }).toString();
  const res = await fetch(
    `${RESAS_API_URL}/population/composition/perYear?${urlSearchParam}`,
    {
      headers: {
        'X-API-KEY': RESAS_API_KEY || '',
        'Content-Type': 'application/json;charset=UTF-8',
      },
    },
  );
  const data = (await res.json()) as GetPopulationResponse;

  return NextResponse.json({ data }, { status: 200, headers: CORS_HEADERS });
}
