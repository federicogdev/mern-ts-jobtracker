import { Request, Response } from "express";
import expressAsyncHandler from "express-async-handler";
import mongoose from "mongoose";
import * as JobServices from "../services/job-services";
import JobModel from "../models/job-model";

export const getJobs = expressAsyncHandler(
  async (req: Request, res: Response) => {
    const jobs = await JobServices.getJobs();

    res.status(200).json({ data: jobs });
  }
);

export const getJob = expressAsyncHandler(
  async (req: Request, res: Response) => {
    const { id } = req.params;

    if (!mongoose.isValidObjectId(id)) {
      res.status(404);
      throw new Error("ID not valid.");
    }

    const job = await JobServices.getJobByID(id);

    res.status(200).json({ data: job });
  }
);

export const createJob = expressAsyncHandler(
  async (req: Request, res: Response) => {
    const { position, company, location, status, type } = req.body;

    if (!position) {
      res.status(400);
      throw new Error("Position required.");
    }

    if (!company) {
      res.status(404);
      throw new Error("Company required.");
    }

    const job = await JobServices.createJob({
      position,
      company,
      location,
      status,
      type,
    });

    res.status(200).json({ data: job });
  }
);

export const updateJob = expressAsyncHandler(
  async (req: Request, res: Response) => {
    const { id } = req.params;

    if (!mongoose.isValidObjectId(id)) {
      res.status(404);
      throw new Error("ID not valid.");
    }
    const { position, company, location, status, type } = req.body;

    if (!position) {
      res.status(400);
      throw new Error("Position required.");
    }

    if (!company) {
      res.status(404);
      throw new Error("Company required.");
    }

    const job = await JobServices.updateJob(id, {
      position,
      company,
      location,
      status,
      type,
    });

    res.status(200).json({ data: job });
  }
);

export const deleteJob = expressAsyncHandler(
  async (req: Request, res: Response) => {
    const { id } = req.params;

    if (!mongoose.isValidObjectId(id)) {
      res.status(400);
      throw new Error("ID not valid.");
    }

    const job = await JobModel.findById(id);

    if (!job) {
      res.status(404);
      throw new Error("Job not found.");
    }

    await job.remove();

    res.status(200).json({ message: `Delete Job ${req.params.id}.` });
  }
);
