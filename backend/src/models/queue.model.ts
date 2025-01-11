import mongoose from "mongoose";
const { Schema } = mongoose;

const queueSchema = new Schema({
  specialization: {
    type: String,
    enum: [ "OPD",    "Eye",        "Ear",         "Cardiology",       "Orthopedics", "Dermatology", "Neurology",
      "X-ray",        "Ultrasound", "MRI",         "CT Scan",          "Pathology",   "Radiology",   "Pediatrics",
      "Gynaecology",  "Dentistry",  "ENT",         "Gastroenterology", "Hematology",  "Oncology",
      "Rheumatology", "Urology",    "Pulmonology", "Endocrinology",    ],
    required: true,
  },
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
  }], // Reuse the shared subdocument schema
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
