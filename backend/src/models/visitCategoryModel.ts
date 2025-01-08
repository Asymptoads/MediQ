import mongoose from 'mongoose';
import visitCategorySchema from '../db/visitCategorySchema';

const VisitCategoryModel = mongoose.model('visitCategory', visitCategorySchema);

export default VisitCategoryModel;
