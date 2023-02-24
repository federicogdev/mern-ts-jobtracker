import { Request, Response } from "express";

export const getJobs = (req: Request, res: Response) => {
  res.status(200).json({ message: "Get all Jobs." });
};

export const getJob = (req: Request, res: Response) => {
  res.status(200).json({ message: `Get Job ${req.params.id}.` });
};

export const createJob = (req: Request, res: Response) => {
  if (!req.body.title) {
    throw new Error("Title required");
  }
  res.status(200).json({ message: "Created Job." });
};

export const updateJob = (req: Request, res: Response) => {
  res.status(200).json({ message: `Updated Job ${req.params.id}.` });
};

export const deleteJob = (req: Request, res: Response) => {
  res.status(200).json({ message: `Delete Job ${req.params.id}.` });
};
