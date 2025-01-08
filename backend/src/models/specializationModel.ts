import mongoose from 'mongoose';
import specialization from '../db/specializationSchema';

const SpecializationModel = mongoose.model('Specialization', specializationSchema);

export default SpecializationModel
