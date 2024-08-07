import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
  try {
    // Fetch total games played
    const totalGames = await prisma.chatSession.count();

    // Fetch total user wins by summing the 'totalWins' field across all users
    const userWinsResult = await prisma.user.aggregate({
      _sum: {
        totalWins: true,
      },
    });

    const userWins = userWinsResult._sum.totalWins || 0;

    return NextResponse.json({ totalGames, userWins });
  } catch (error) {
    console.error('Error fetching game stats:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}
