import mongoose from 'mongoose';

const WaitlistSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        trim: true
    },
    lastName: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email']
    },
    country: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

// Create compound index for better query performance
WaitlistSchema.index({ email: 1, createdAt: -1 });

export default mongoose.models.Waitlist || mongoose.model('Waitlist', WaitlistSchema);
