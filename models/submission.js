import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const submissionSchema = new Schema({
  title: {
    type: String,
    required: true,
    trim: true,
    maxlength: 200
  },
  description: {
    type: String,
    trim: true,
    maxlength: 1000
  },
  content: {
    type: String,
    required: true
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  status: {
    type: String,
    enum: ['pending', 'processing', 'completed', 'failed'],
    default: 'pending'
  },
  submissionType: {
    type: String,
    enum: ['text', 'code', 'file', 'form'],
    required: true,
    default: 'text'
  },
  metadata: {
    fileSize: Number,
    fileName: String,
    mimeType: String,
    language: String
  },
  tags: {
    type: [String],
    trim: true,
    default: []
  },
  isPublic: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true,
  toJSON: {
    transform: function (doc, ret) {
      return ret;
    }
  }
});

// Index for better query performance
submissionSchema.index({ user: 1, status: 1 });
submissionSchema.index({ createdAt: -1 });
submissionSchema.index({ tags: 1 });

// Virtual for getting results
submissionSchema.virtual('results', {
  ref: 'Result',
  localField: '_id',
  foreignField: 'submission'
});

export default mongoose.model('Submission', submissionSchema);
