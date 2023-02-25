import { Request, Response } from "express";
import expressAsyncHandler from "express-async-handler";
import * as JobServices from "../services/job-services";

export const getJobs = expressAsyncHandler(
  async (req: Request, res: Response) => {
    const jobs = await JobServices.getJobs();

    res.status(200).json({ data: jobs });
  }
);

export const getJob = expressAsyncHandler(
  async (req: Request, res: Response) => {
    const job = await JobServices.getJobByID(req.params.id);

    res.status(200).json({ data: job });
  }
);

export const createJob = expressAsyncHandler(
  async (req: Request, res: Response) => {
    const job = await JobServices.createJob(req.body);

    res.status(200).json({ data: job });
  }
);

export const updateJob = expressAsyncHandler(
  async (req: Request, res: Response) => {
    const job = await JobServices.updateJob(req.params.id, req.body);

    res.status(200).json({ data: job });
  }
);

export const deleteJob = expressAsyncHandler(
  async (req: Request, res: Response) => {
    await JobServices.deleteJob(req.params.id);

    res.status(200).json({ message: `Deleted Job ${req.params.id}.` });
  }
);
