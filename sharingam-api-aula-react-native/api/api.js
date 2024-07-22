import express, { Router } from "express";
import "express-async-errors";
import bodyParser from "body-parser";
import cors from "cors";
import { userRouter } from "./user.router.js";
import { accountRouter } from "./account.router.js";
import { followRouter } from "./follow.router.js";
import { postRouter } from "./post.router.js";
import { ValidationError } from "yup";

export const api = express();
const router = Router();

api.use(cors());
api.use(express.json());
api.use(bodyParser.json());

router.use("/users", userRouter);
router.use("/follows", followRouter);
router.use("/account", accountRouter);
router.use("/posts", postRouter);

api.use("/api/", router);

api.use((error, req, res, next) => {
  if (error instanceof ValidationError) {
    return res.status(422).json(error);
  }

  throw error;
  next();
});
