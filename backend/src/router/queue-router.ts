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
  router.post('/queue/create', createQueue);
  router.get('/queue/', getAllQueue);
  router.get('/queue/:queueId', getQueueById); // GET request to retrieve queue by ID
  router.get('/queue/specialization/:specialization', getBySpecialization);
  router.get('/queue/doctor/:doctorId', getByDoctor);
};
