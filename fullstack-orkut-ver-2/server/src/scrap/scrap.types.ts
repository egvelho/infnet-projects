import type { ObjectId } from "../mongodb";

export type Scrap = {
  _id?: ObjectId;
  creatorId: number;
  ownerId: number;
  message: string;
};
