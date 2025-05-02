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
        const { firstName, lastName, email, country } = await request.json();

        // Validate required fields
        if (!firstName || !lastName || !email || !country) {
            return NextResponse.json(
                { 
                    error: 'Missing required fields',
                    required: ['firstName', 'lastName', 'email', 'country']
                },
                { status: 400 }
            );
        }

        // Validate email format
        const emailRegex = /^\S+@\S+\.\S+$/;
        if (!emailRegex.test(email)) {
            return NextResponse.json(
                { error: 'Invalid email format' },
                { status: 400 }
            );
        }

        await connectDB();
        
        const existingEntry = await Waitlist.findOne({ email });
        if (existingEntry) {
            return NextResponse.json(
                { error: 'Email already registered' },
                { status: 400 }
            );
        }

        const newEntry = await Waitlist.create({
            firstName,
            lastName,
            email: email.toLowerCase(),
            country
        });

        return NextResponse.json({ 
            message: 'Successfully added to waitlist',
            data: {
                id: newEntry._id,
                email: newEntry.email
            }
        }, { status: 201 });
    } catch (error) {
        console.error('Error adding to waitlist:', error);
        return NextResponse.json(
            { error: 'Failed to add to waitlist' },
            { status: 500 }
        );
    }
}