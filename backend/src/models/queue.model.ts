import mongoose from "mongoose";
const { Schema } = mongoose;

// Define the WeeklyScheduleSchema
const weeklyScheduleSchema = new Schema({
  doctors: [{
    type: Schema.Types.ObjectId,
    ref: 'User',  // Reference to the User model, allowing multiple doctors
    required: true
  }],
  day: {
    type: String,
    enum: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
    required: true
  },
  start_time: { type: String, required: true },  // Time in 24-hour format (e.g., "09:00")
  end_time: { type: String, required: true }     // Time in 24-hour format (e.g., "17:00")
}, {
  _id: true  // Ensures each schedule entry gets an ObjectId
});

// Define the QueueSchema with reference to WeeklyScheduleSchema
const queueSchema = new Schema({
  specialization: {
    type: String,
    enum: ["OPD", "Ophthalmology", "Cardiology", "Orthopedics", "Dermatology", "Pediatrics", "Neurology",
      "X-ray", "Ultrasound", "MRI", "CT Scan", "Pathology", "Radiology",
      "Gynaecology", "Dentistry", "ENT", "Gastroenterology", "Hematology", "Oncology"],
    required: true,
    unique: true
  },
  is_lab_test: { type: Boolean, default: false },
  description: { type: String, required: true },
  weekly_schedule: [weeklyScheduleSchema],  // Use the WeeklyScheduleSchema
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
  status: {
    type: String,
    enum: ["open", "closed", "paused"],
    default: "open",
  },
});

const queueModel = mongoose.model("queue", queueSchema);
export { queueModel, queueSchema, weeklyScheduleSchema };
