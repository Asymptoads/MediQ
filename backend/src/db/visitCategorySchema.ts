import mongoose from 'mongoose';

const { Schema } = mongoose;

const VisitCategorySchema = new Schema({
  name: {
    type: String,
    required: true,
    enum: [
      'Emergency Cases',
      'Follow-up Visits',
      'First-time Consultations',
      'Lab Tests Only',
      'Report Collections',
      'Prescription Refills',
      // 'X-ray',         // Added as example
      // 'MRI Scan',      // Added as example
      // 'General Checkup',  // Added as example
      // 'Blood Test',    // Added as example
      // Add more categories as needed
    ],
  },
});

export default mongoose.model('VisitCategory', VisitCategorySchema);
