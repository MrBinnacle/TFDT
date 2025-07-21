import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  let data: any = null;
  try {
    data = await req.json();
  } catch {}
  console.log('Markdown export payload:', data);
  return NextResponse.json({ message: 'Not implemented yet' });
}
