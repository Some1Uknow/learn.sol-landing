import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Waitlist from '@/models/Waitlist';

export async function GET() {
    try {
        await connectDB();
        const count = await Waitlist.countDocuments();
        console.log('Waitlist count:', count);
        return NextResponse.json({ count });
    } catch (error) {
        console.error('Error getting waitlist count:', error);
        return NextResponse.json({ error: 'Failed to get waitlist count' }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        const { email } = await request.json();
        await connectDB();
        
        const existingEntry = await Waitlist.findOne({ email });
        if (existingEntry) {
            return NextResponse.json(
                { error: 'Email already registered' },
                { status: 400 }
            );
        }

        await Waitlist.create({ email });
        return NextResponse.json({ message: 'Successfully added to waitlist' });
    } catch (error) {
        console.error('Error adding to waitlist:', error);
        return NextResponse.json(
            { error: 'Failed to add to waitlist' },
            { status: 500 }
        );
    }
}