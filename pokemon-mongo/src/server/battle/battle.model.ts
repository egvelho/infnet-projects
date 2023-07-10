import { model } from "mongoose";
import { battleSchema, IBattle } from "./battle.schema";

export const Battle = model<IBattle>("Battle", battleSchema);
