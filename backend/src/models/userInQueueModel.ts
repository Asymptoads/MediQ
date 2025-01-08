import mongoose from 'mongoose';
import userInQueue from '../db/userInQueue';

const UserInQueueModel = mongoose.model('UserInQueue', userInQueueSchema);

export default UserInQueueModel
