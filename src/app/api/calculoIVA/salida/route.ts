import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const body = await request.json();
  const { total } = body;

  if (typeof total !== 'number') {
    return NextResponse.json({ message: 'El dato enviado no es válido.' }, { status: 400 });
  }

  return NextResponse.json({ message: `El total a pagar es ${total}` });
}