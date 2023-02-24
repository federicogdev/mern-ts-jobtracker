import { Schema, model } from "mongoose";
import {
  JobStatusEnum,
  JobTypeEnum,
  IJobType,
  IJobSchema,
} from "../types/job-types";

const jobSchema = new Schema<IJobType>(
  {
    // userId: { type: Schema.Types.ObjectId, required: true, ref: "User" },
    position: {
      type: String,
      required: true,
      max: 100,
      trim: true,
    },
    company: { type: String, required: true, max: 50 },
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
