import serverless from "serverless-http";
import { api } from "../../src/api/api";

export const handler = serverless(api);
