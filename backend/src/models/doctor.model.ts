import mongoose from 'mongoose';

const { Schema } = mongoose;

const doctorSchema = new Schema({
    _id: { type: String, required: true, unique: true },  // doctor_id as the primary key
    email: { type: String, required: true, unique: true },
    phone_number: { type: String, required: true }, // Added phone_number as mandatory
    authentication: {
      password: { type: String, required: true, select: false }, // Password is now only in authentication
      salt: { type: String, select: false },
      sessionToken: { type: String, select: false },
    },
    specialization: {
      type: Schema.Types.ObjectId,
      ref: 'Specialization',  // Reference to the Specialization model
      required: true,  // Each doctor must have a specialization
    },
  },
  { timestamps: true } // Enable automatic createdAt and updatedAt fields
);

const doctorModel = mongoose.model('doctor', doctorSchema);
export {doctorModel, doctorSchema};
