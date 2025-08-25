// # OpenAI result (cached)
import mongoose from 'mongoose';


const trackSchema = new mongoose.Schema({
 title: { type: String, required: true, trim: true },
 artist: { type: String, required: true, trim: true },
 why: { type: String, required: true, trim: true }
}, { _id: false });


const metadataSchema = new mongoose.Schema({
 ageGroup: { type: String, required: true, trim: true },
 mood: { type: String, required: true, trim: true },
 activity: { type: String, required: true, trim: true },
 energy: { type: String, required: true, enum: ['low', 'medium', 'high'] },
 language: { type: String, default: 'any', trim: true },
 genres: { type: [String], default: [] }
}, { _id: false });


const resultSchema = new mongoose.Schema({
 submission: { type: mongoose.Schema.Types.ObjectId, ref: 'Submission', required: true },
 user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },


 title: { type: String, required: true, trim: true },
 explanation: { type: String, required: true, trim: true },
 tracks: { type: [trackSchema], default: [] },
 metadata: { type: metadataSchema, required: true }
}, { timestamps: true });


// Indexes
resultSchema.index({ submission: 1 });
resultSchema.index({ user: 1, createdAt: -1 });


// auto-assign user from submission
resultSchema.pre('validate', async function (next) {
 if (!this.user && this.submission) {
   const submission = await mongoose.model('Submission').findById(this.submission);
   if (submission) this.user = submission.user;
 }
 next();
});


export default mongoose.model('Result', resultSchema);
