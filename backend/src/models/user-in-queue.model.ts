import mongoose from "mongoose";

const { Schema } = mongoose;

const userInQueueSchema = new Schema({
    registered_at: { type: Date, default: Date.now },
    remaining_at_the_time_of_register: { type: Number },
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
        ref: "Queue",
    },

    user_id: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "User",
    },

    doctor_id: {
        type: Schema.Types.ObjectId,
        ref: "User", // Reference to the Doctor model
        default: null,
    },
    is_suspended: { type: Boolean, default: false },
    suspended_at: { type: Date, default: null },
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

const userInQueueModel = mongoose.model("userInQueue", userInQueueSchema);
export { userInQueueModel, userInQueueSchema };
