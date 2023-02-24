import { RequestHandler } from "express";

export const getJobs: RequestHandler = async (req, res) => {
  res.status(200).json({ message: "Get all Jobs." });
};

export const getJob: RequestHandler = async (req, res) => {
  res.status(200).json({ message: `Get Job ${req.params.id}.` });
};

export const createJob: RequestHandler = async (req, res) => {
  res.status(200).json({ message: "Created Job." });
};

export const updateJob: RequestHandler = async (req, res) => {
  res.status(200).json({ message: `Updated Job ${req.params.id}.` });
};

export const deleteJob: RequestHandler = async (req, res) => {
  res.status(200).json({ message: `Delete Job ${req.params.id}.` });
};
