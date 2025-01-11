import mongoose from "mongoose";

const { Schema } = mongoose;

const appointmentSchema = new Schema({
    registered_at: { type: Date, default: Date.now },
    remaining_at_the_time_of_register: { type: Number, default: 0 }, // Remaining patients in the queue at the time of registration
    // Reference to the VisitCategory model
    category: {
        type: String,
        required: true,
        enum: [
            "Emergency Cases",
            "Follow-up Visits",
            "First-time Consultations",
            "Lab Tests Only",
            "Report Collections",
            "Prescription Refills",
            // 'X-ray',         // Added as example
            // 'MRI Scan',      // Added as example
            // 'General Checkup',  // Added as example
            // 'Blood Test',    // Added as example
            // Add more categories as needed
        ],
    },
    description: { type: String, default: null },

    queue_id: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "queue",
    },

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

// Middleware to calculate total_waited
// UserInQueueSchema.pre('save', function(next) {
//   if (this.registered_at && !this.is_completed) {
//     const now = new Date();
//     const waitTime = Math.floor((now - this.registered_at) / 60000); // Convert milliseconds to minutes
//     this.total_waited = waitTime;
//   }
//   next();
// });

const appointmentModel = mongoose.model("appointment", appointmentSchema);
export { appointmentModel, appointmentSchema };
