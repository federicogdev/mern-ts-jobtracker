import moment from "moment";
import mongoose from "mongoose";
import JobModel from "../models/job-model";
import {
  IJobType,
  IJobSchema,
  IJobStats,
  IJobStatsResponse,
  IJobMonthlyApplication,
} from "../types/job-types";
import checkIsValidObjectId from "../util/check-is-valid-object-id";
import checkIsValidObjectID from "../util/check-is-valid-object-id";
import HttpException, { ErrorHandler } from "../util/http-exception";

export const getJobs = async (
  userId: string | undefined,
  limit?: string,
  page?: string
): Promise<IJobSchema[]> => {
  if (!userId) {
    throw new HttpException("UserId is undefined", 400);
  }

  checkIsValidObjectId(userId);

  try {
    let jobs = JobModel.find({ userId });

    const _page = Number(page) || 1;
    const _limit = Number(limit) || 10;
    const skip = (_page - 1) * _limit;

    // return jobs
    return jobs.skip(skip).limit(_limit);
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

export const getJobStats = async (
  userId: string | undefined
): Promise<IJobStatsResponse> => {
  if (!userId) {
    throw new HttpException("UserId is undefined", 400);
  }

  checkIsValidObjectId(userId);

  try {
    const aggregatedStats = await JobModel.aggregate([
      { $match: { userId: userId.valueOf() } },
      { $group: { _id: "$status", count: { $sum: 1 } } },
    ]);

    const aggregatedMonthlyApplications = await JobModel.aggregate([
      { $match: { userId: userId.valueOf() } },
      {
        $group: {
          _id: {
            year: { $year: "$createdAt" },
            month: { $month: "$createdAt" },
          },
          count: { $sum: 1 },
        },
      },
      { $sort: { "_id.year": -1, "_id.month": -1 } },
      { $limit: 6 },
    ]);

    const stats: IJobStats = aggregatedStats.reduce((acc, curr) => {
      const { _id: title, count } = curr;

      acc[title] = count;

      return acc;
    }, {});

    const defaultStats = {
      pending: stats.pending || 0,
      interview: stats.interview || 0,
      declined: stats.declined || 0,
    };

    const monthlyApplications: IJobMonthlyApplication[] =
      aggregatedMonthlyApplications
        .map((item) => {
          const {
            _id: { year, month },
            count,
          } = item;

          const date = moment()
            .month(month - 1)
            .year(year)
            .format("MMM Y");
          return { date, count };
        })
        .reverse();

    return { defaultStats, monthlyApplications };
  } catch (error) {
    throw ErrorHandler(error);
  }
};
