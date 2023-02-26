import { cleanEnv, port, str } from "envalid";

export default cleanEnv(process.env, {
  MONGO_URI: str(),
  PORT: port(),
  NODE_ENV: str(),
  JWT_SECRET: str(),
});
