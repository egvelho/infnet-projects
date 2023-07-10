import "reflect-metadata";
import * as dotenv from "dotenv";
dotenv.config();
import { Container } from "typedi";
import { createExpressServer, useContainer } from "routing-controllers";
import { connect } from "mongoose";
import { TrainerController } from "./trainer/trainer.controller";
import { AuthController } from "./auth/auth.controller";
import { PokeStoreController } from "./pokestore/pokestore.controller";
import { BattleController } from "./battle/battle.controller";
import { authorizationChecker } from "./auth/checkers/authorization.checker";
import { currentUserChecker } from "./auth/checkers/currentUser.checker";

const port = process.env.PORT;
const host = process.env.HOST;

useContainer(Container);

createExpressServer({
  controllers: [
    TrainerController,
    AuthController,
    PokeStoreController,
    BattleController,
  ],
  cors: true,
  authorizationChecker,
  currentUserChecker,
}).listen(port, host, async () => {
  await connect(process.env.DATABASE_URL ?? "");
  console.log(`Servidor express iniciado em http://${host}:${port}`);
});
