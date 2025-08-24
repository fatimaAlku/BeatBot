
import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const resultSchema = new Schema({
  submission: {
    type: Schema.Types.ObjectId,
    ref: 'Submission',
    required: true
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  resultType: {
    type: String,
    enum: ['success', 'error', 'warning', 'info'],
    required: true,
    default: 'success'
  },
  output: {
    type: String,
    required: true
  },
  score: {
    type: Number,
    min: 0,
    max: 100
  },
  processingTime: {
    type: Number, // in milliseconds
    min: 0
  },
  details: {
    errors: {
      type: [{
        line: Number,
        column: Number,
        message: String,
        type: String
      }],
      default: []
    },
    warnings: {
      type: [{
        line: Number,
        column: Number,
        message: String,
        type: String
      }],
      default: []
    },
    metrics: {
      linesOfCode: Number,
      complexity: Number,
      coverage: Number,
      performance: Number
    }
  },
  feedback: {
    type: String,
    maxlength: 2000
  },
  isPublic: {
    type: Boolean,
    default: false
  },
  reviewed: {
    type: Boolean,
    default: false
  },
  reviewedBy: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  reviewDate: Date
}, {
  timestamps: true,
  toJSON: {
    transform: function (doc, ret) {
      return ret;
    }
  }
});

// Indexes for better query performance
resultSchema.index({ submission: 1 });
resultSchema.index({ user: 1, createdAt: -1 });
resultSchema.index({ resultType: 1 });
resultSchema.index({ score: -1 });

// Pre-save middleware to set user from submission if not provided
resultSchema.pre('save', async function (next) {
  if (!this.user && this.submission) {
    try {
      const submission = await mongoose.model('Submission').findById(this.submission);
      if (submission) {
        this.user = submission.user;
      }
    } catch (error) {
      return next(error);
    }
  }
  next();
});

export default mongoose.model('Result', resultSchema);
