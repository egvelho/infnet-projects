import { model } from "mongoose";
import { trainerSchema, ITrainer } from "./trainer.schema";

export const Trainer = model<ITrainer>("Trainer", trainerSchema);
