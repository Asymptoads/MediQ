import mongoose from 'mongoose';

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
  // created_at: { type: Date, default: Date.now },
  // updated_at: { type: Date, default: Date.now },
});

const userModel = mongoose.model('user', userSchema);
export {userModel, userSchema};
