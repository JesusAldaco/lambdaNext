import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const body = await request.json();
  const { cantidad } = body;

  if (typeof cantidad !== 'number' || cantidad <= 0) {
    return NextResponse.json({ message: 'La cantidad debe ser un número positivo.' }, { status: 400 });
  }

  const iva = cantidad * 0.16;

  // Enviar datos a la segunda lambda
  const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/calculoIVA/calculo`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ cantidad, iva }),
  });

  if (!response.ok) {
    return NextResponse.json({ message: 'Error enviando los datos a la segunda lambda.' }, { status: 500 });
  }

  const result = await response.json();
  return NextResponse.json(result);
}