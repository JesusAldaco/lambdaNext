import { NextResponse } from 'next/server';

export async function GET(request: Request) {
//   const body = await request.json();
//   const { cantidad, iva } = body;
 const { searchParams } = new URL(request.url);
  const cantidad = parseFloat(searchParams.get('cantidad') || '0');
  const iva = parseFloat(searchParams.get('iva') || '0');

  if (isNaN(cantidad)|| isNaN(iva) || cantidad <= 0 || iva <= 0) {
    return NextResponse.json({ message: 'Los datos enviados no son válidos.' }, { status: 400 });
  }

  const IVA = iva
  const total = cantidad + IVA;

  const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/calculoIVA/salida`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ total, IVA }),
  });

  if (!response.ok) {
    return NextResponse.json({ message: 'Error enviando el total a la tercera lambda.' }, { status: 500 });
  }

  const result = await response.json();
  return NextResponse.json(result);
}