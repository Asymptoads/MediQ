// routes/user-router.ts
import express from "express";
import {
  createAppointment,
  getAppointments,
  getAppointmentsByUserId,
  markAppointmentAsSuspended,
  markAppointmentAsOperated,
  markAppointmentAsCompleted,
} from "../controllers/appointment-controllers";

import { isAuthenticated } from "../middlewares/index";

export default (router: express.Router) => {
    router.post("/api/create-appointment", isAuthenticated, createAppointment);
    router.get("/api/appointments/:queue_id", isAuthenticated, getAppointments);
    router.put("/api/appointments/suspended/:appointment_id", isAuthenticated, markAppointmentAsSuspended);
    router.put("/api/appointments/operated/:appointment_id", isAuthenticated, markAppointmentAsOperated);
    router.put("/api/appointments/completed/:appointment_id", isAuthenticated, markAppointmentAsCompleted);
    router.get("/api/user/appointments/:status/:user_id", isAuthenticated, getAppointmentsByUserId);
};
