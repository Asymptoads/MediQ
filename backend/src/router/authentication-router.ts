// routes/authentication-router.ts
import express from "express";
import {
    login,
    logout,
    register,
} from "../controllers/authentication-controllers";

export default (router: express.Router) => {
    router.post("/auth/login", login);
    router.post("/auth/register", register);
    router.post("/auth/logout", logout);
};
