import mongoose from 'mongoose';

const WaitlistSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

export default mongoose.models.Waitlist || mongoose.model('Waitlist', WaitlistSchema);
