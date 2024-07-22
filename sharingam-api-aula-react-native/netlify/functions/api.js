import serverless from "serverless-http";
import { api } from "../../api/api";

export const handler = serverless(api);
