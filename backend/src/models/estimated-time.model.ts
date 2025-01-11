import mongoose from "mongoose";

const { Schema } = mongoose;

const estimatedTimeSchema = new Schema({ //estimated operating time
    category: {                   // specific to this category
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
    queue_id: {                         // specific to this queue
        type: Schema.Types.ObjectId,
        required: true,
        ref: "queue",
    },
    average_time: { type: Number, required: true }, // average time
    count: {type: Number, default: 0},  // average time of how many data
});

const estimatedTimeModel = mongoose.model("estimatedTime", estimatedTimeSchema);
export { estimatedTimeModel, estimatedTimeSchema };
