import JobModel from "../models/job-model";
import { IJobType, IJobSchema } from "../types/job-types";

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
