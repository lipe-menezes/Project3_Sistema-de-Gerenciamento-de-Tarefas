import { env } from "../config/env";
import { makeApp } from "./app";

const app = makeApp();

app.listen(env.port, () => {
  console.log(`API running on http://localhost:${env.port}`);
});