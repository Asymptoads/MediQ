import express from "express";
import { predictOperationTime } from "../controllers/prediction.controller";
import { isAuthenticated } from "../middlewares/index";

const router = express.Router();

export default (router: express.Router) => {
    router.post(
        "/api/predict-operation-time",
        isAuthenticated,
        predictOperationTime
    );
};
