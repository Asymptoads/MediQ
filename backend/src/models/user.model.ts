import mongoose from 'mongoose';
const { Schema } = mongoose;

const userSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },  
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  date_of_birth: { type: Date, required: true },
  phone_number: { type: String, required: true }, // Added phone_number as mandatory
  authentication: {
    hashed_password: { type: String, required: true, select: false }, // select: false avoids fetching authentication data
    salt: { type: String, select: false },
    sessionToken: { type: String, select: false },
  },
  is_doctor: {type: Boolean, default: false},
  specialization: {
    type: String, 
    enum: [
      'OPD', 'Eye', 'Ear', 'Cardiology', 'Orthopedics', 'Dermatology', 
      'Neurology', 'X-ray', 'Ultrasound', 'MRI', 'CT Scan', 'Pathology', 
      'Radiology', 'Pediatrics', 'Gynaecology', 'Dentistry', 'ENT', 
      'Gastroenterology', 'Hematology', 'Oncology', 'Rheumatology', 
      'Urology', 'Pulmonology', 'Endocrinology'
    ],  // Enum for specializations directly in the user schema
    required: function () { return this.is_doctor; },  // Only if doctor
  },
  is_busy: {
    type: Boolean,
    default: false,
    required: function () { return this.is_doctor; },  // Only if doctor
  }
  // { timestamps: true } // Enable automatic createdAt and updatedAt fields
});

const userModel = mongoose.model('user', userSchema);
export {userModel, userSchema};
