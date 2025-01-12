// routes/authentication-router.ts
import express from "express";
import {
    login,
    logout,
    register,
} from "../controllers/authentication-controllers";

export default (router: express.Router) => {
    router.post("/api/auth/login", login);
    router.post("/api/auth/register", register);
    router.post("/api/auth/logout", logout);
};
