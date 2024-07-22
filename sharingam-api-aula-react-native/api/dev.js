import "dotenv/config";
import { api } from "./api.js";

const host = process.env.HOST;
const port = Number(process.env.PORT);

api.listen(port, host, () => {
  console.log(`Express API server started in http://${host}:${port}`);
});
