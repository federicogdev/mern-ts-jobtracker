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
