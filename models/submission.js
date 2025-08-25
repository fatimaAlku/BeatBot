// # saved answers


import mongoose from 'mongoose';


const submissionSchema = new mongoose.Schema({
 // Who submitted the preferences
 user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },


 // Fields coming from BeatForm
 ageGroup: { type: String, required: true, trim: true },
 mood: { type: String, required: true, trim: true },
 activity: { type: String, required: true, trim: true },
 energy: { type: String, required: true, enum: ['low', 'medium', 'high'] },
 genres: { type: [String], default: [] },
 language: { type: String, default: 'any', trim: true },
 count: { type: Number, min: 3, max: 20, default: 10 }
}, { timestamps: true });


// Indexes
submissionSchema.index({ user: 1, createdAt: -1 });


// Virtual for results
submissionSchema.virtual('results', {
 ref: 'Result',
 localField: '_id',
 foreignField: 'submission'
});


export default mongoose.model('Submission', submissionSchema);
