
// Submission model for storing user music preference requests
// Captures user inputs from the BeatForm for generating music recommendations

import mongoose from 'mongoose';

// Schema for user music preference submissions
const submissionSchema = new mongoose.Schema({
 // Reference to the user who made this submission
 user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
 
 // Music preference fields collected from BeatForm
 ageGroup: { type: String, required: true, trim: true }, // User's age demographic
 mood: { type: String, required: true, trim: true }, // Desired mood/vibe
 activity: { type: String, required: true, trim: true }, // Context for listening
 energy: { type: String, required: true, enum: ['low', 'medium', 'high'] }, // Energy level preference
 genres: { type: [String], default: [] }, // Preferred music genres
 language: { type: String, default: 'any', trim: true }, // Language preference for lyrics
 count: { type: Number, min: 3, max: 20, default: 10 } // Number of tracks requested
}, { timestamps: true }); // Automatically add createdAt and updatedAt

// Database index for efficient user submission queries
submissionSchema.index({ user: 1, createdAt: -1 }); // Find user's submissions by date

// Virtual field to populate related results
submissionSchema.virtual('results', {
 ref: 'Result', // Reference the Result model
 localField: '_id', // Use submission's _id
 foreignField: 'submission' // Match with result's submission field
});

export default mongoose.model('Submission', submissionSchema);