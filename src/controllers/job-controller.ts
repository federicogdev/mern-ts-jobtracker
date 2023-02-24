import { Request, Response } from "express";
import expressAsyncHandler from "express-async-handler";
import JobModel from "../models/job-model";

export const getJobs = expressAsyncHandler((req: Request, res: Response) => {
  res.status(200).json({ message: "Get all Jobs." });
});

export const getJob = expressAsyncHandler(
  async (req: Request, res: Response) => {
    const { id } = req.params;
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
      throw new Error("Position required");
    }

    if (!company) {
      throw new Error("Company required");
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

export const deleteJob = expressAsyncHandler((req: Request, res: Response) => {
  res.status(200).json({ message: `Delete Job ${req.params.id}.` });
});
