// routes/user-router.ts
import express from 'express';
import {
  createQueue,
  getQueueById,
  getBySpecialization,
  getByDoctor,
  getAllQueue
} from '../controllers/queue-controllers';
import { isAuthenticated } from '../middlewares/index';

export default (router: express.Router) => {
  router.post('/api/queue/create', createQueue);
  router.get('/api/queue/', getAllQueue);
  router.get('/api/queue/:queueId', getQueueById); // GET request to retrieve queue by ID
  router.get('/api/queue/specialization/:specialization', getBySpecialization);
  router.get('/api/queue/doctor/:doctorId', getByDoctor);
};
