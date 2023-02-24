import "dotenv/config";
import express from "express";

import env from "./util/validate-env";
import jobRoutes from "./routes/job-routes";
import errorHandler from "./middleware/error-handler";
import { dbConnect } from "./util/db-connect";

const PORT = env.PORT;

const app = express();

dbConnect();

app.use(express.json());

app.get("/", (req, res) => {
  res.json({ message: "Hello" });
});

app.use("/api/v1/jobs", jobRoutes);

app.use(errorHandler);

app.listen(PORT, () => console.log("Server started on PORT: " + PORT));
