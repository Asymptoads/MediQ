import mongoose from "mongoose";
const { Schema } = mongoose;

const queueSchema = new Schema({
  specialization: {
    type: String,
    enum: [ "OPD", "Ophthalmology", "Cardiology", "Orthopedics", "Dermatology", "Pediatrics", "Neurology",
      "X-ray", "Ultrasound", "MRI", "CT Scan", "Pathology", "Radiology",
      "Gynaecology", "Dentistry", "ENT", "Gastroenterology", "Hematology", "Oncology" ],
    required: true,
  },
  is_lab_test: { type: Boolean, default: false },
  description: { type: String, required: true },
  weekly_schedule: [{
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
  }],
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
  status: {
    type: String,
    enum: ["open", "closed", "paused"],
    default: "open",
  },
});

const queueModel = mongoose.model("queue", queueSchema);
export { queueModel, queueSchema };
