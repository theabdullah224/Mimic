import { NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request: Request) {
  try {
    const { message } = await request.json();

    const chatCompletion = await openai.chat.completions.create({
        model: "gpt-3.5-turbo-1106",
        messages: [
          { role: 'system', content: 'Given your input, respond as a human would in a conversation.' },
          { role: 'user', content: message }
        ],
        max_tokens: 150
      });

    const aiResponse = chatCompletion.choices[0].message.content;

    return NextResponse.json({ message: aiResponse });
  } catch (error) {
    console.error('OpenAI API error:', error);
    return NextResponse.json({ error: 'Failed to get response from OpenAI' }, { status: 500 });
  }
}