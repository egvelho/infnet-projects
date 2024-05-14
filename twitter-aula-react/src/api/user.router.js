import { Router } from "express";
import { prisma } from "./prisma.js";
import { authMiddleware } from "./auth.middleware.js";

export const userRouter = Router();

userRouter.get("/", authMiddleware, async (req, res) => {
  const users = await prisma.user.findMany();
  res.status(200).json(users);
});

userRouter.get("/:username", authMiddleware, async (req, res) => {
  const user = await prisma.user.findUnique({
    where: {
      username: req.params.username,
    },
  });

  const follow = await prisma.follows.findFirst({
    where: {
      followerId: req.user.id,
      followingId: user.id,
    },
  });

  const isFollow = follow !== null;

  user.isFollow = isFollow;

  res.status(200).json(user);
});

userRouter.post("/follow/:followId", authMiddleware, async (req, res) => {
  const follow = await prisma.follows.create({
    data: {
      followerId: req.user.id,
      followingId: +req.params.followId,
    },
  });
  res.status(200).json(follow);
});

userRouter.delete("/follow/:followId", authMiddleware, async (req, res) => {
  const follow = await prisma.follows.delete({
    where: {
      followerId_followingId: {
        followerId: req.user.id,
        followingId: +req.params.followId,
      },
    },
  });
  res.status(200).json(follow);
});
