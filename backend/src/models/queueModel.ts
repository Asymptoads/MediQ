import mongoose from 'mongoose';
import queue from '../db/queueSchema';

const QueueModel = mongoose.model('Queue', queueSchema);

export default QueueModel;
