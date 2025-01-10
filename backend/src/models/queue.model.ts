import mongoose from 'mongoose';

const { Schema } = mongoose;

const queueSchema = new Schema({
  specialization: {
    type: String, 
    enum: [
      'OPD', 'Eye', 'Ear', 'Cardiology', 'Orthopedics', 'Dermatology', 
      'Neurology', 'X-ray', 'Ultrasound', 'MRI', 'CT Scan', 'Pathology', 
      'Radiology', 'Pediatrics', 'Gynaecology', 'Dentistry', 'ENT', 
      'Gastroenterology', 'Hematology', 'Oncology', 'Rheumatology', 
      'Urology', 'Pulmonology', 'Endocrinology'
    ],
    required: true
  },
  doctors: [{ 
    type: Schema.Types.ObjectId, 
    ref: 'User',  // Reference to the User model, allowing multiple doctors
    required: true 
  }],
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
  status: { 
    type: String, 
    enum: ['open', 'closed', 'paused'], 
    default: 'open' 
  },
  is_active: { type: Boolean, default: true },  // Track if the queue is active
});

const queueModel = mongoose.model('queue', queueSchema);
export {queueModel, queueSchema};
