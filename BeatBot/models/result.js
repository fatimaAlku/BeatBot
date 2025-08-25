// Result model for storing music recommendation results
// Contains playlist data generated from user submissions

import mongoose from 'mongoose';

// Schema for individual track recommendations
const trackSchema = new mongoose.Schema({
 title: { type: String, required: true, trim: true },
 artist: { type: String, required: true, trim: true },
 why: { type: String, required: true, trim: true } // Explanation for why this track was recommended
}, { _id: false });

// Schema for storing the original submission metadata
const metadataSchema = new mongoose.Schema({
 ageGroup: { type: String, required: true, trim: true },
 mood: { type: String, required: true, trim: true },
 activity: { type: String, required: true, trim: true },
 energy: { type: String, required: true, enum: ['low', 'medium', 'high'] },
 language: { type: String, default: 'any', trim: true },
 genres: { type: [String], default: [] }
}, { _id: false });

// Main result schema for playlist recommendations
const resultSchema = new mongoose.Schema({
 submission: { type: mongoose.Schema.Types.ObjectId, ref: 'Submission', required: true },
 user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
 title: { type: String, required: true, trim: true }, // Playlist title
 explanation: { type: String, required: true, trim: true }, // Overall playlist description
 tracks: { type: [trackSchema], default: [] }, // Array of recommended tracks
 metadata: { type: metadataSchema, required: true } // Original submission criteria
}, { timestamps: true });

// Database indexes for optimized queries
resultSchema.index({ submission: 1 }); // Find results by submission
resultSchema.index({ user: 1, createdAt: -1 }); // Find user's results sorted by date

// Middleware to automatically assign user from submission if not provided
resultSchema.pre('validate', async function (next) {
 if (!this.user && this.submission) {
   const submission = await mongoose.model('Submission').findById(this.submission);
   if (submission) this.user = submission.user;
 }
 next();
});

export default mongoose.model('Result', resultSchema);