import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  _id: { type: String, required: true, unique: true },  // patient_id as the primary key
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  date_of_birth: { type: Date, required: true },
  phone_number: { type: String, required: true }, // Added phone_number as mandatory
  authentication: {
    password: { type: String, required: true, select: false }, // select: false avoids fetching authentication data
    salt: { type: String, select: false },
    sessionToken: { type: String, select: false },
  },
  // created_at: { type: Date, default: Date.now },
  // updated_at: { type: Date, default: Date.now },
});

export default mongoose.model('User', UserSchema);
