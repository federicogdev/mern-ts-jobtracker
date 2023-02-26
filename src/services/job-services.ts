import mongoose from "mongoose";
import JobModel from "../models/job-model";
import { IJobType, IJobSchema } from "../types/job-types";
import checkIsValidObjectID from "../util/check-is-valid-object-id";
import HttpException, { ErrorHandler } from "../util/http-exception";

export const getJobs = async (): Promise<IJobSchema[]> => {
  try {
    const jobs = JobModel.find();

    return jobs;
  } catch (error) {
    throw ErrorHandler(error);
  }
};

export const getJobByID = async (jobID: string): Promise<IJobSchema> => {
  checkIsValidObjectID(jobID);

  try {
    const job = await JobModel.findById(jobID);

    if (!job) {
      throw new HttpException(`Job with ${jobID} ID not found.`, 404);
    }

    return job;
  } catch (error) {
    throw ErrorHandler(error);
  }
};

export const createJob = async (job: IJobType): Promise<IJobSchema> => {
  const { position, company, location, status, type } = job;

  if (!position) {
    throw new Error("Position required.");
  }

  if (!company) {
    throw new Error("Company required.");
  }

  try {
    const newJob = await JobModel.create({
      position,
      company,
      location,
      status,
      type,
    });

    return newJob;
  } catch (error) {
    throw ErrorHandler(error);
  }
};

export const updateJob = async (
  jobID: string,
  job: IJobType
): Promise<IJobSchema> => {
  checkIsValidObjectID(jobID);

  const { position, company, location, status, type } = job;

  if (!position) {
    throw new Error("Position required.");
  }

  if (!company) {
    throw new Error("Company required.");
  }

  try {
    const updatedJob = await JobModel.findByIdAndUpdate(
      jobID,
      { position, company, location, status, type },
      {
        new: true,
        runValidators: true,
      }
    );

    if (!updatedJob) {
      throw new Error(`Job with ${jobID} ID not found.`);
    }

    return updatedJob;
  } catch (error) {
    throw ErrorHandler(error);
  }
};

export const deleteJob = async (jobID: string): Promise<void> => {
  checkIsValidObjectID(jobID);

  try {
    const job = await JobModel.findById(jobID);

    if (!job) {
      throw new HttpException(`Job with ${jobID} ID not found.`, 404);
    }

    await job.remove();

    return;
  } catch (error) {
    throw ErrorHandler(error);
  }
};
