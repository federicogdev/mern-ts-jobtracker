export enum JobTypeEnum {
  FullTime = "full-time",
  PartTime = "part-time",
  Remote = "remote",
  Internship = "internship",
}

export enum JobStatusEnum {
  Interview = "interview",
  Declined = "declined",
  Pending = "pending",
}

export interface IJobType {
  userId: string;
  position: string;
  company: string;
  status: JobStatusEnum;
  type: JobTypeEnum;
  location: string;
}

export interface IJobSchema extends IJobType {
  _id: string;
}

export interface IJobStats {
  pending: number;
  interview: number;
  declined: number;
}

export interface IJobMonthlyApplication {
  date: string;
  count: number;
}

export interface IJobStatsResponse {
  defaultStats: IJobStats;
  monthlyApplications: IJobMonthlyApplication[];
}
