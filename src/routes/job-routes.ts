import express from "express";
import * as JobController from "../controllers/job-controller";
import { isAuth } from "../middleware/auth-middleware";

const router = express.Router();

router.get("/", isAuth, JobController.getJobs);
router.post("/", isAuth, JobController.createJob);
router.get("/:id", isAuth, JobController.getJob);
router.patch("/:id", isAuth, JobController.updateJob);
router.delete("/:id", isAuth, JobController.deleteJob);

export default router;
