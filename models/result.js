import mongoose from 'mongoose';

const resultSchema = new mongoose.Schema({
  submission: { type: mongoose.Schema.Types.ObjectId, ref: 'Submission', required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  resultType: { type: String, enum: ['success', 'error', 'warning', 'info'], default: 'success' },
  output: { type: String, required: true },
  score: { type: Number, min: 0, max: 100 },
  isPublic: { type: Boolean, default: false }
}, { timestamps: true });

// Indexes
resultSchema.index({ submission: 1 });
resultSchema.index({ user: 1, createdAt: -1 });
resultSchema.index({ score: -1 });

// auto-assign user from submission
resultSchema.pre('save', async function (next) {
  if (!this.user && this.submission) {
    const submission = await mongoose.model('Submission').findById(this.submission);
    if (submission) this.user = submission.user;
  }
  next();
});

export default mongoose.model('Result', resultSchema);
