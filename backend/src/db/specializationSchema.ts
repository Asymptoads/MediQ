import mongoose from 'mongoose';

const { Schema } = mongoose;

const SpecializationSchema = new Schema({
  name: { 
    type: String, 
    required: true, 
    enum: [
      'OPD', 
      'Eye', 
      'Ear', 
      'Cardiology', 
      'Orthopedics', 
      'Dermatology', 
      'Neurology', 
      'X-ray', 
      'Ultrasound', 
      'MRI', 
      'CT Scan', 
      'Pathology', 
      'Radiology', 
      'Pediatrics', 
      'Gynaecology', 
      'Dentistry', 
      'ENT', 
      'Gastroenterology', 
      'Hematology', 
      'Oncology', 
      'Rheumatology', 
      'Urology', 
      'Pulmonology', 
      'Endocrinology'
    ],  // Expanded enum for specializations
    unique: true,
  },
});

export default mongoose.model('Specialization', SpecializationSchema);
