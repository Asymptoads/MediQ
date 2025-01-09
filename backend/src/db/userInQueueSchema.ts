import mongoose from 'mongoose';

const { Schema } = mongoose;

const UserInQueueSchema = new Schema({
  registered_at: { type: Date, default: Date.now },
  remaining_at_the_time_of_register: { type: Number },
  // Reference to the VisitCategory model
  category: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'VisitCategory',  // This is where you reference the VisitCategory model
  },
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

  doctor_id: {
    type: Schema.Types.ObjectId, 
    ref: 'Doctor',  // Reference to the Doctor model
    default: null 
  },
  is_suspended: { type: Boolean, default: false },
  suspended_at: { type: Date, default: null }
  is_completed: { type: Boolean, default: false },
  completed_at: { type: Date, default: null }
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
