import { Router } from "express";
import { authMiddleware } from "./auth.middleware.js";
import { prisma } from "./prisma.js";
import sharp from "sharp";

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
  const picture = req.body.picture;
  const pictureBuffer = await sharp(Buffer.from(picture, "base64"))
    .resize({
      width: 64,
      height: 64,
      fit: "cover",
      position: "center",
    })
    .toBuffer();
  const pictureBase64 = "data:image/jpg;base64,".concat(
    pictureBuffer.toString("base64")
  );
  const post = await prisma.post.create({
    data: {
      picture: pictureBase64,
      authorId: req.user.id,
    },
  });

  res.status(201).json(post);
});
