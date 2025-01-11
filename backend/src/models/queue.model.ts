import mongoose from 'mongoose';

const { Schema } = mongoose;

const weeklyScheduleSchema = new Schema({
  day: {
    type: String,
    enum: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
    required: true
  },
  start_time: { type: String, required: true },  // Time in 24-hour format (e.g., "09:00")
  end_time: { type: String, required: true }     // Time in 24-hour format (e.g., "17:00")
}, { _id: false });  // This makes sure that individual schedule entries do not have their own `_id`

const queueSchema = new Schema({
  specialization: {
    type: String, 
    enum: [
      'OPD', 'Eye', 'Ear', 'Cardiology', 'Orthopedics', 'Dermatology', 
      'Neurology', 'X-ray', 'Ultrasound', 'MRI', 'CT Scan', 'Pathology', 
      'Radiology', 'Pediatrics', 'Gynaecology', 'Dentistry', 'ENT', 
      'Gastroenterology', 'Hematology', 'Oncology', 'Rheumatology', 
      'Urology', 'Pulmonology', 'Endocrinology'
    ],
    required: true
  },
  doctors: [{ 
    type: Schema.Types.ObjectId, 
    ref: 'User',  // Reference to the User model, allowing multiple doctors
    required: true 
  }],
  weekly_schedule: [weeklyScheduleSchema],  // Array of weekly schedule
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
  status: { 
    type: String, 
    enum: ['open', 'closed', 'paused'], 
    default: 'open' 
  },
});

// Method to determine if the queue is open based on the current day and time
// queueSchema.methods.isQueueOpen = function() {
//   const currentDate = new Date();
//   const currentDay = currentDate.toLocaleString('en-us', { weekday: 'long' });
//   const currentTime = currentDate.toISOString().substring(11, 16); // Extracts time in HH:MM format
//
//   // Find the schedule for today
//   const todaySchedule = this.weekly_schedule.find(schedule => schedule.day === currentDay);
//
//   if (todaySchedule) {
//     // Compare current time with the schedule's start and end time
//     if (currentTime >= todaySchedule.start_time && currentTime <= todaySchedule.end_time) {
//       return true;  // Queue is open
//     }
//   }
//   return false;  // Queue is closed
// };

const queueModel = mongoose.model('queue', queueSchema);
export { queueModel, queueSchema };
