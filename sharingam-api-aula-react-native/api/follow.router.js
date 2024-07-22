import { Router } from "express";
import { prisma } from "./prisma.js";
import { authMiddleware } from "./auth.middleware.js";

export const followRouter = Router();

followRouter.get("/:userId", authMiddleware, async (req, res) => {
  const follows = await prisma.follows.findMany({
    where: {
      followerId: +req.params.userId,
    },
    include: {
      following: {
        include: {
          followers: true,
        },
      },
    },
  });

  res.status(200).json(follows.map(({ following }) => following));
});

followRouter.post("/:followId", authMiddleware, async (req, res) => {
  const follow = await prisma.follows.create({
    data: {
      followerId: req.user.id,
      followingId: +req.params.followId,
    },
  });
  res.status(200).json(follow);
});

followRouter.delete("/:followId", authMiddleware, async (req, res) => {
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
