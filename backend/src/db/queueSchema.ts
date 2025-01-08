import mongoose from 'mongoose';

const { Schema } = mongoose;

const QueueSchema = new Schema({
  specialization: { 
    type: Schema.Types.ObjectId, 
    ref: 'Specialization',  // Reference to the Specialization model
    required: true 
  },
  doctors: [{ 
    type: Schema.Types.ObjectId, 
    ref: 'Doctor',  // Reference to the Doctor model, allowing multiple doctors
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

export default mongoose.model('Queue', QueueSchema);
