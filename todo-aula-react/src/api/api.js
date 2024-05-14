import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import { taskRouter } from "./task.router.js";

export const api = express();

api.use(cors());
api.use(express.json());
api.use(bodyParser.json());

api.use("/api/", taskRouter);
