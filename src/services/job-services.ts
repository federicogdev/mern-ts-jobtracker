import JobModel from "../models/job-model";
import { IJobType } from "../types/job-types";

export const getJobs = async (): Promise<IJobType[]> => {
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

export const createJob = async (job: IJobType): Promise<IJobType> => {
  try {
    const newJob = await JobModel.create(job);

    return newJob;
  } catch (error) {
    throw new Error("Job not created.");
  }
};
