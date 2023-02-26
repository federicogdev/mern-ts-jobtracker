import { Schema, model } from "mongoose";
import {
  JobStatusEnum,
  JobTypeEnum,
  IJobType,
  IJobSchema,
} from "../types/job-types";

const jobSchema = new Schema<IJobType>(
  {
    userId: { type: String, required: true },
    position: {
      type: String,
      required: true,
      max: [100, "Company must be less than 100 characters."],
      trim: true,
    },
    company: {
      type: String,
      required: true,
      max: [100, "Company must be less than 100 characters."],
    },
    status: {
      type: String,
      enum: Object.values(JobStatusEnum),
      default: JobStatusEnum.Pending,
    },
    type: {
      type: String,
      enum: Object.values(JobTypeEnum),
      default: JobTypeEnum.FullTime,
    },
    location: {
      type: String,
      default: "Unknown",
      trim: true,
    },
  },
  { timestamps: true }
);

const JobModel = model<IJobSchema>("Job", jobSchema);

export default JobModel;
