import mongoose from 'mongoose';

const { Schema } = mongoose;

const visitCategorySchema = new Schema({
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

const visitCategoryModel = mongoose.model('visitCategory', visitCategorySchema);
export {visitCategoryModel, visitCategorySchemal};
