import mongoose from "mongoose";
import env from "../util/validate-env";

export const dbConnect = async (): Promise<void> => {
  if (env.MONGO_URI === "" || env.MONGO_URI === null) {
    console.log("MONGO_URI not defined");
    process.exit(1);
  }

  try {
    await mongoose.set("strictQuery", false).connect(env.MONGO_URI);
    console.log("MongoDB connected");
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};
