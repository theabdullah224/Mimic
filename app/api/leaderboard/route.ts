// pages/api/leaderboard.js

import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
  try {
    const leaderboard = await prisma.user.findMany({
      select: {
        walletAddress: true,
        gamesPlayed: true,
        totalWins: true,
      },
      orderBy: {
        totalWins: 'desc',
      },
      take: 100, // Limit to top 100 users
    });

    const leaderboardWithStats = leaderboard.map((user, index) => ({
      place: index + 1,
      user: user.walletAddress,
      gamesPlayed: user.gamesPlayed,
      totalWins: user.totalWins,
      winrate: user.gamesPlayed > 0 
        ? ((user.totalWins / user.gamesPlayed) * 100).toFixed(2) + '%'
        : '0%',
    }));

    return NextResponse.json(leaderboardWithStats);
  } catch (error) {
    console.error('Error fetching leaderboard:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}