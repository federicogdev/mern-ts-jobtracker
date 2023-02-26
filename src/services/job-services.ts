import mongoose from "mongoose";
import JobModel from "../models/job-model";
import { IJobType, IJobSchema } from "../types/job-types";
import checkIsValidObjectId from "../util/check-is-valid-object-id";
import checkIsValidObjectID from "../util/check-is-valid-object-id";
import HttpException, { ErrorHandler } from "../util/http-exception";

export const getJobs = async (
  userId: string | undefined
): Promise<IJobSchema[]> => {
  if (!userId) {
    throw new HttpException("UserId is undefined", 400);
  }

  checkIsValidObjectId(userId);

  try {
    const jobs = JobModel.find({ userId });

    return jobs;
  } catch (error) {
    throw ErrorHandler(error);
  }
};

export const getJobByID = async (
  jobID: string,
  userId: string | undefined
): Promise<IJobSchema> => {
  checkIsValidObjectID(jobID);

  if (!userId) {
    throw new HttpException("UserId is undefined", 400);
  }

  checkIsValidObjectId(userId);

  try {
    const job = await JobModel.findById(jobID);

    if (!job) {
      throw new HttpException(`Job with ${jobID} ID not found.`, 404);
    }

    if (job.userId !== userId.toString()) {
      throw new HttpException("Unauthorized", 404);
    }

    return job;
  } catch (error) {
    throw ErrorHandler(error);
  }
};

export const createJob = async (
  job: IJobType,
  userId: string | undefined
): Promise<IJobSchema> => {
  const { position, company, location, status, type } = job;

  if (!userId) {
    throw new HttpException("UserId is undefined", 400);
  }

  checkIsValidObjectId(userId);

  if (!position) {
    throw new HttpException("Position required.", 400);
  }

  if (!company) {
    throw new HttpException("Company required.", 400);
  }

  try {
    const newJob = await JobModel.create({
      userId,
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
  job: IJobType,
  userId: string | undefined
): Promise<IJobSchema> => {
  checkIsValidObjectID(jobID);

  const { position, company, location, status, type } = job;

  if (!position) {
    throw new HttpException("Position required.", 400);
  }

  if (!company) {
    throw new HttpException("Company required.", 400);
  }

  if (!userId) {
    throw new HttpException("UserId is undefined", 400);
  }

  checkIsValidObjectId(userId);

  const _job = await JobModel.findById(jobID);

  if (!_job) {
    throw new HttpException(`Job with ${jobID} ID not found.`, 404);
  }

  if (_job.userId !== userId.toString()) {
    throw new HttpException("Unauthorized", 404);
  }

  try {
    const updatedJob = await JobModel.findByIdAndUpdate(
      jobID,
      { position, company, location, status, type, userId },
      {
        new: true,
        runValidators: true,
      }
    );

    if (!updatedJob) {
      throw new HttpException(`Job with ${jobID} ID not found.`, 400);
    }

    return updatedJob;
  } catch (error) {
    throw ErrorHandler(error);
  }
};

export const deleteJob = async (
  jobID: string,
  userId: string | undefined
): Promise<void> => {
  checkIsValidObjectID(jobID);

  if (!userId) {
    throw new HttpException("UserId is undefined", 400);
  }

  checkIsValidObjectId(userId);

  const job = await JobModel.findById(jobID);

  if (!job) {
    throw new HttpException(`Job with ${jobID} ID not found.`, 404);
  }

  if (job.userId !== userId.toString()) {
    throw new HttpException("Unauthorized", 404);
  }

  try {
    await job.remove();

    return;
  } catch (error) {
    throw ErrorHandler(error);
  }
};
