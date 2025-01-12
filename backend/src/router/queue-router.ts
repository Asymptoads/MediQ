// routes/user-router.ts
import express from 'express';
import {
  createQueue,
  getAllQueue,
  getSpecializations,
  getQueueOfSpecialization,
  // getQueueById,
  // getBySpecialization,
  // getByDoctor,
} from '../controllers/queue-controllers';
import { isAuthenticated } from '../middlewares/index';

export default (router: express.Router) => {
  router.post('/api/queue/create', isAuthenticated, createQueue);
  router.get('/api/queue/', isAuthenticated, getAllQueue);
  router.get('/api/queue/specialization/', isAuthenticated, getSpecializations);
  router.get('/api/queue/:specialization', isAuthenticated, getQueueOfSpecialization);

  // router.get('/api/queue/:queueId', isAuthenticated, getQueueById); // GET request to retrieve queue by ID
  // router.get('/api/queue/specialization/:specialization', isAuthenticated, getBySpecialization);
  // router.get('/api/queue/doctor/:doctorId', isAuthenticated, getByDoctor);
};
