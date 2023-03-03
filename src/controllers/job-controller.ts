import { Response } from "express";
import asyncHandler from "express-async-handler";
import { IAuthorizedUserRequest } from "../middleware/auth-middleware";
import * as JobServices from "../services/job-services";

export const getJobs = asyncHandler(
  async (req: IAuthorizedUserRequest, res: Response) => {
    const { query } = req;
    const limit = query?.limit as string;
    const page = query?.page as string;
    const jobs = await JobServices.getJobs(req.user?._id, limit, page);

    res.status(200).json({ data: jobs });
  }
);

export const getJob = asyncHandler(
  async (req: IAuthorizedUserRequest, res: Response) => {
    const job = await JobServices.getJobByID(req.params.id, req.user?._id);

    res.status(200).json({ data: job });
  }
);

export const createJob = asyncHandler(
  async (req: IAuthorizedUserRequest, res: Response) => {
    const job = await JobServices.createJob(req.body, req.user?._id);

    res.status(200).json({ data: job });
  }
);

export const updateJob = asyncHandler(
  async (req: IAuthorizedUserRequest, res: Response) => {
    const job = await JobServices.updateJob(
      req.params.id,
      req.body,
      req.user?._id
    );

    res.status(200).json({ data: job });
  }
);

export const deleteJob = asyncHandler(
  async (req: IAuthorizedUserRequest, res: Response) => {
    await JobServices.deleteJob(req.params.id, req.user?._id);

    res.status(200).json({ message: `Deleted Job ${req.params.id}.` });
  }
);

export const getJobStats = asyncHandler(
  async (req: IAuthorizedUserRequest, res: Response) => {
    const jobStats = await JobServices.getJobStats(req.user?._id);
    console.log(req.user?._id);

    res.status(200).json({ data: jobStats });
  }
);
