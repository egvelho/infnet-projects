import { Router } from "express";
import { authMiddleware } from "./auth.middleware.js";
import { prisma } from "./prisma.js";

export const postRouter = Router();

postRouter.get("/:userId", authMiddleware, async (req, res) => {
  const posts = await prisma.post.findMany({
    where: {
      authorId: +req.params.userId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
  res.status(200).json(posts);
});

postRouter.post("/", authMiddleware, async (req, res) => {
  const post = await prisma.post.create({
    data: {
      message: req.body.message,
      authorId: req.user.id,
    },
  });

  res.status(201).json(post);
});
