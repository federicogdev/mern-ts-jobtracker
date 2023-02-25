import JobModel from "../models/job-model";
import { IJobType, IJobSchema } from "../types/job-types";
import checkIsValidObjectID from "../util/check-is-valid-object-id";

export const getJobs = async (): Promise<IJobSchema[]> => {
  try {
    const jobs = JobModel.find();

    if (!jobs) {
      throw new Error("No Jobs Found.");
    }

    return jobs;
  } catch (error) {
    throw new Error("No Jobs Found.");
  }
};

export const getJobByID = async (jobID: string): Promise<IJobSchema> => {
  checkIsValidObjectID(jobID);

  try {
    const job = await JobModel.findById(jobID);

    if (!job) {
      throw new Error(`Job with ${jobID} ID not found.`);
    }

    return job;
  } catch (error) {
    throw new Error("Job not found.");
  }
};

export const createJob = async (job: IJobType): Promise<IJobSchema> => {
  try {
    const newJob = await JobModel.create(job);

    return newJob;
  } catch (error) {
    throw new Error("Job not created.");
  }
};

export const updateJob = async (
  jobID: string,
  job: IJobType
): Promise<IJobSchema> => {
  checkIsValidObjectID(jobID);

  try {
    const updateJob = await JobModel.findByIdAndUpdate(jobID, job, {
      new: true,
      runValidators: true,
    });

    if (!updateJob) {
      throw new Error(`Job with ${jobID} ID not found.`);
    }

    return updateJob;
  } catch (error) {
    throw new Error("Job not updated.");
  }
};

export const deleteJob = async (jobID: string): Promise<void> => {
  checkIsValidObjectID(jobID);
  try {
    const job = await JobModel.findByIdAndDelete(jobID);

    if (!job) {
      throw new Error(`Job with ${jobID} ID not found.`);
    }

    return;
  } catch (error) {
    throw new Error("Job not deleted.");
  }
};
