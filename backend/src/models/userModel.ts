import mongoose from 'mongoose';
import userSchema from '../db/userSchema';

const UserModel = mongoose.model('User', userSchema);

export default UserModel;
