import "dotenv/config";
import express from "express";

import env from "./util/validate-env";
import jobRoutes from "./routes/job-routes";

const PORT = env.PORT;

const app = express();

app.use(express.json({ limit: "4mb" }));

app.get("/", (req, res) => {
  res.json({ message: "Hello" });
});

app.use("/api/v1/jobs", jobRoutes);

app.listen(PORT, () => console.log("Server started on PORT: " + PORT));
