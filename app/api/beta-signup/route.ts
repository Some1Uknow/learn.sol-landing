import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db('learn-sol');
    const betaSignups = db.collection('beta-signups');
    
    const count = await betaSignups.countDocuments();
    return NextResponse.json({ count });
  } catch (error) {
    console.error('Error getting waitlist count:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const { firstName, lastName, email, country } = await req.json();

    if (!firstName || !lastName || !email || !country) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const client = await clientPromise;
    const db = client.db('learn-sol');
    const betaSignups = db.collection('beta-signups');

    // Check if email already exists
    const existingUser = await betaSignups.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { error: 'Email already registered' },
        { status: 400 }
      );
    }

    // Insert new signup
    await betaSignups.insertOne({
      firstName,
      lastName,
      email,
      country,
      createdAt: new Date()
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Beta signup error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}