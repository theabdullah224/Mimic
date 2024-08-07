import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(request: Request) {
  try {
    const { walletAddress } = await request.json();

    const user = await prisma.user.upsert({
      where: { walletAddress },
      update: {},
      create: { walletAddress },
    });

    return NextResponse.json(user);
  } catch (error) {
    return NextResponse.json({ error: 'Error connecting wallet' }, { status: 500 });
  }
}