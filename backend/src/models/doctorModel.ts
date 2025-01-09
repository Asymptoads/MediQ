import mongoose from 'mongoose';
import doctorSchema from '../db/doctorSchema';

const DoctorModel = mongoose.model('Doctor', doctorSchema);

export default DoctorModel;
