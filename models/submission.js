import mongoose from 'mongoose';

const submissionSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true, maxlength: 200 },
  content: { type: String, required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  status: { type: String, enum: ['pending', 'processing', 'completed', 'failed'], default: 'pending' },
  submissionType: { type: String, enum: ['text', 'code', 'file', 'form'], default: 'text' },
  tags: { type: [String], default: [] },
  isPublic: { type: Boolean, default: false }
}, { timestamps: true });

// Indexes
submissionSchema.index({ user: 1, status: 1 });
submissionSchema.index({ createdAt: -1 });

// Virtual for results
submissionSchema.virtual('results', {
  ref: 'Result',
  localField: '_id',
  foreignField: 'submission'
});

export default mongoose.model('Submission', submissionSchema);
