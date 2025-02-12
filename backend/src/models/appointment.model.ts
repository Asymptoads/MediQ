import mongoose from "mongoose";
import { weeklyScheduleSchema } from "./queue.model";
const { Schema } = mongoose;

// Appointment Schema
const appointmentSchema = new Schema({
  registered_at: { type: Date, default: Date.now },
  category: {
    type: String,
    required: true,
    enum: [
      "First-Time Consultations",
      "Consultation",
      "Follow-up Visits",
      "Report Collections",
      "Prescription Refills",
      "Category",
      "Routine Check-up",
      "Emergency",
      "Vaccination",
      "Pre-Surgery Assessment",
      "Post-Surgery Review",
      "Diagnostic Imaging",
      "Specialist Referral",
    ],
  },
  queue_id: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "queue",
  },
  
  // Schedule field using the weeklyScheduleSchema
  schedule: weeklyScheduleSchema,

  user_id: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "user",
  },

  is_suspended: { type: Boolean, default: false },
  suspended_at: { type: Date, default: null },

  is_operated: { type: Boolean, default: false },
  operated_at: { type: Date, default: null },
  operated_by: {
    type: Schema.Types.ObjectId,
    ref: "User", // Reference to the Doctor
    default: null,
  },
  is_completed: { type: Boolean, default: false },
  completed_at: { type: Date, default: null },
});

const appointmentModel = mongoose.model("appointment", appointmentSchema);
export { appointmentModel, appointmentSchema };
