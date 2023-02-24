import express from "express";
import * as JobController from "../controllers/job-controller";

const router = express.Router();

router.get("/", JobController.getJobs);
router.post("/", JobController.createJob);
router.get("/:id", JobController.getJob);
router.patch("/:id", JobController.updateJob);
router.delete("/:id", JobController.deleteJob);

export default router;
