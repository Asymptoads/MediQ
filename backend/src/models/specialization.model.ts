import mongoose from 'mongoose';

const { Schema } = mongoose;

const specializationSchema = new Schema({
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

const specializationModel = mongoose.model('specialization', specializationSchema);
export {specializationModel, specializationSchema};
