import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(request: Request) {
  try {
    // Parse the incoming request body
    const { messages, gameResult, userChoice, walletAddress } = await request.json();

    // Validate the presence of walletAddress
    if (!walletAddress) {
      return NextResponse.json({ error: 'Wallet address is required' }, { status: 400 });
    }

    // Find or create a user based on walletAddress
    let user = await prisma.user.findUnique({ where: { walletAddress } });

    if (!user) {
      // Create a new user if not found
      user = await prisma.user.create({
        data: { 
          walletAddress,
          gamesPlayed: 1,
          totalWins: gameResult === 'win' ? 1 : 0,
        },
      });
    } else {
      // Update existing user's stats
      user = await prisma.user.update({
        where: { id: user.id },
        data: {
          gamesPlayed: { increment: 1 },
          totalWins: { increment: gameResult === 'win' ? 1 : 0 },
        },
      });
    }

    // Create a new chat session with the associated messages
    const chatSession = await prisma.chatSession.create({
      data: {
        user: { connect: { id: user.id } },
        // Ensure this value is a string
        userChoice: userChoice || 'unknown',
        messages: {
          create: messages.map((msg: any) => ({
            text: msg.text,
            sender: msg.isSent ? 'human' : 'ai',
            user: { connect: { id: user.id } },
          })),
        },
      },
      include: {
        messages: true,
      },
    });
    

    // Return a successful response with the created session and user details
    return NextResponse.json({ success: true, chatSession, user });
  } catch (error) {
    console.error('Error saving chat:', error);
    return NextResponse.json({ error: 'Failed to save chat'}, { status: 500 });
  }
}
