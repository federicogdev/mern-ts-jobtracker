import mongoose from "mongoose";
import HttpException from "./http-exception";

export default function checkIsValidObjectID(id: string) {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new HttpException(`${id} is not a valid ID`, 400);
  }
}
