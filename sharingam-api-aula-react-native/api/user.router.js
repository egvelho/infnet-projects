import { Router } from "express";
import { prisma } from "./prisma.js";
import { authMiddleware } from "./auth.middleware.js";

export const userRouter = Router();

userRouter.get("/", authMiddleware, async (req, res) => {
  const skip = +req.query.skip || 0;
  const take = +req.query.take || 10;
  const users = await prisma.user.findMany({
    skip,
    take,
  });
  res.status(200).json(
    users.map(({ id, username, name, avatar }) => ({
      id,
      username,
      name,
      avatar,
    }))
  );
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
