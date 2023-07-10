import * as dotenv from "dotenv";
dotenv.config();
import "reflect-metadata";
import { Container } from "typedi";
import { createExpressServer, useContainer } from "routing-controllers";
import { CommentController } from "./comment/comment.controller";
import { PostController } from "./post/post.controller";
import { UserController } from "./user/user.controller";
import { AuthController } from "./auth/auth.controller";
import { authorizationChecker } from "./auth/checkers/authorizationChecker";
import { currentUserChecker } from "./auth/checkers/currentUserChecker";

const host = process.env.HOST;
const port = process.env.PORT;
const controllers = [
  PostController,
  CommentController,
  UserController,
  AuthController,
];

useContainer(Container);

createExpressServer({
  cors: true,
  controllers,
  currentUserChecker,
  authorizationChecker,
}).listen(port, host, () => {
  console.log(`Servidor express iniciado em http://${host}:${port}`);
});
