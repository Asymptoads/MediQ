import mongoose from 'mongoose';

const { Schema } = mongoose;

const UserInQueueSchema = new Schema({
  registered_at: { type: Date, default: Date.now },
  // Reference to the VisitCategory model
  category: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'VisitCategory',  // This is where you reference the VisitCategory model
  },
  due_date: { type: Date, default: null },
  is_completed: { type: Boolean, default: false },
  description: { type: String, default: null },

  queue_id: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'Queue',
  },

  user_id: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'User',
  },

  total_waited: { 
    type: Number,  // Store total wait time in seconds or minutes
    default: null 
  },

  doctor_id: {
    type: Schema.Types.ObjectId, 
    ref: 'Doctor',  // Reference to the Doctor model
    default: null 
  },
});

// Middleware to calculate total_waited
// UserInQueueSchema.pre('save', function(next) {
//   if (this.registered_at && !this.is_completed) {
//     const now = new Date();
//     const waitTime = Math.floor((now - this.registered_at) / 60000); // Convert milliseconds to minutes
//     this.total_waited = waitTime;
//   }
//   next();
// });

export default mongoose.model('UserInQueue', UserInQueueSchema);
