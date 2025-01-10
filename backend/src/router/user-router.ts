// routes/user-router.ts
import express from "express";
import {
    deleteUser,
    getAllUsers,
    getCurrentUser,
    updateUser,
    getAllDoctors,
    getAllPatients,
    getDoctorById,
    validateObjectId,
    getPatientById,
    // setDoctorBusy,
    // setDoctorFree,
} from "../controllers/user-controllers";
import { isAuthenticated } from "../middlewares/index";

export default (router: express.Router) => {
    router.get("/api/user", isAuthenticated, getCurrentUser);
    router.get("/api/users", isAuthenticated, getAllUsers);
    router.get("/api/doctors", isAuthenticated, getAllDoctors);
    router.get("/api/patients", isAuthenticated, getAllPatients);
    router.put("/api/user/update", isAuthenticated, updateUser);
    router.delete("/api/user/delete", isAuthenticated, deleteUser);
    router.get(
        "/api/doctor/:id",
        isAuthenticated,
        validateObjectId,
        getDoctorById
    );
    // router.patch( "/api/set-doctor-free/:doctor_id", isAuthenticated, setDoctorFree);
    // router.patch( "/api/set-doctor-busy/:doctor_id", isAuthenticated, setDoctorBusy);
    router.get(
        "/api/user/:id",
        isAuthenticated,
        validateObjectId,
        getPatientById
    );
};
