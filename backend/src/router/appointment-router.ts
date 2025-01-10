// routes/user-router.ts
import express from "express";
import { createappointment } from "../controllers/appointment-controllers";

import { isAuthenticated } from "../middlewares/index";

export default (router: express.Router) => {
    router.post("/api/createappointment", isAuthenticated, createappointment);
    //   router.get('/get-queue/specialization/:specialization', getBySpecialization);
    //   router.get('/get-queue/doctor/:doctorId', getByDoctor);
    //   router.get('/queue/:queueId', getQueueById); // GET request to retrieve queue by ID
};
