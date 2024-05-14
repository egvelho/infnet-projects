import "reflect-metadata";
import "dotenv/config";

import express from "express";
import { createExpressServer, useContainer } from "routing-controllers";
import { Container } from "typedi";

import { PostController } from "./post/post.controller";
import { UserController } from "./user/user.controller";
import { AuthController } from "./auth/auth.controller";
import { FileController } from "./file/file.controller";
import { ScrapController } from "./scrap/scrap.controller";

import { authorizationChecker } from "./auth/checkers/authorizationChecker";
import { currentUserChecker } from "./auth/checkers/currentUserChecker";

import { setupMongoDb } from "./mongodb";
setupMongoDb();
useContainer(Container);

const port = process.env.PORT;
const host = process.env.HOST;
const app = createExpressServer({
  cors: true,
  controllers: [
    PostController,
    UserController,
    AuthController,
    FileController,
    ScrapController,
  ],
  authorizationChecker,
  currentUserChecker,
});

app.use("/public", express.static("public"));

app.listen(port, host, () => {
  console.log(`Servidor express iniciado em http://${host}:${port}`);
});
