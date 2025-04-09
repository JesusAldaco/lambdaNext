import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const body = await request.json();
  const { cantidad, iva } = body;

  if (typeof cantidad !== 'number' || typeof iva !== 'number') {
    return NextResponse.json({ message: 'Los datos enviados no son válidos.' }, { status: 400 });
  }

  const total = cantidad + iva;

  const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/calculoIVA/salida`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ total }),
  });

  if (!response.ok) {
    return NextResponse.json({ message: 'Error enviando el total a la tercera lambda.' }, { status: 500 });
  }

  const result = await response.json();
  return NextResponse.json(result);
}