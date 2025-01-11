import express from "express";
import {
  updateOrCreateEstimatedTime,
  getEstimatedTimeFor,
} from "../controllers/estimated-time-controllers";
import { isAuthenticated } from "../middlewares/index";

export default (router: express.Router) => {
  router.post("api/set-update-estimated-time", isAuthenticated, updateOrCreateEstimatedTime);
  router.post("api/estimated-time/", isAuthenticated, getEstimatedTimeFor)
};
