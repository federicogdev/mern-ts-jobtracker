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

    const job = await JobModel.findById(id);

    if (!job) {
      res.status(404);
      throw new Error("Job not found.");
    }

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

    const job = await JobModel.create({
      position,
      company,
      location,
      status,
      type,
    });

    res.status(200).json({ data: job });
  }
);

export const updateJob = expressAsyncHandler((req: Request, res: Response) => {
  res.status(200).json({ message: `Updated Job ${req.params.id}.` });
});

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
