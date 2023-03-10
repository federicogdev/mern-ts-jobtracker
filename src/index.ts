import "dotenv/config";
import express, { Request, Response } from "express";

import env from "./util/validate-env";
import jobRoutes from "./routes/job-routes";
import authRoutes from "./routes/auth-routes";
import errorHandler from "./middleware/error-handler";
import { dbConnect } from "./util/db-connect";

const PORT = env.PORT;

const app = express();

dbConnect();

app.use(express.json());

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/jobs", jobRoutes);

app.use(errorHandler);

app.get("/ping", (_req: Request, res: Response) => {
  return res.send("pong 🏓");
});

app.listen(PORT, () => console.log("Server started on PORT: " + PORT));
