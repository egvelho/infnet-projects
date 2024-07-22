import express, { Router } from "express";
import { promises as fs } from "fs";
import sharp from "sharp";
import multer from "multer";
import { prisma } from "./prisma.js";
import yup from "yup";
import { JwtService } from "./jwt.service.js";
import { authMiddleware } from "./auth.middleware.js";

const upload = multer();
const jwt = new JwtService();

const signUpSchema = yup.object({
  name: yup
    .string()
    .min(2, "O nome precisa ter pelo menos 2 caracteres.")
    .max(40, "O nome precisa ter até 40 caracteres.")
    .required("O nome não pode ficar vazio."),
  email: yup
    .string()
    .email("O email digitado é inválido")
    .required("O email não pode ficar vazio.")
    .test(
      "checkEmailUnique",
      "Esse email já está cadastrado",
      async (email) => {
        const user = await prisma.user.findFirst({
          where: {
            email,
          },
        });
        return user === null;
      }
    ),
  username: yup
    .string()
    .lowercase("O nome de usuário só pode ter letras minúsculas.")
    .min(3, "O nome de usuário precisa ter pelo menos 3 caracteres.")
    .max(16, "O nome de usuário só pode ter até 16 caracteres.")
    .required("O nome de usuário não pode ficar vazio.")
    .test(
      "checkUsernameUnique",
      "Esse nome de usuário já está cadastrado",
      async (username) => {
        const user = await prisma.user.findFirst({
          where: {
            username,
          },
        });
        return user === null;
      }
    ),
  password: yup
    .string()
    .min(6, "A senha precisa ter pelo menos 6 caracteres.")
    .max(30, "A senha só pode ter até 30 caracteres.")
    .required("O campo senha não pode ficar vazio."),
});

const profileSchema = yup.object({
  name: yup
    .string()
    .min(2, "O nome precisa ter pelo menos 2 caracteres.")
    .max(40, "O nome precisa ter até 40 caracteres.")
    .required("O nome não pode ficar vazio."),
});

export const accountRouter = Router();

accountRouter.get("/profile", authMiddleware, async (req, res) => {
  res.status(200).json(req.user);
});

accountRouter.patch("/profile", authMiddleware, async (req, res) => {
  const profileData = await profileSchema.validate(req.body, {
    stripUnknown: true,
  });

  const user = await prisma.user.update({
    data: profileData,
    where: {
      id: req.user.id,
    },
  });

  res.status(200).json({
    user,
  });
});

accountRouter.post("/sign-up", async (req, res) => {
  const signUpData = await signUpSchema.validate(req.body, {
    stripUnknown: true,
  });
  const user = await prisma.user.create({
    data: signUpData,
  });
  const token = jwt.encode({
    id: user.id,
    name: user.name,
  });

  res.status(201).json({
    user,
    token,
  });
});

accountRouter.post("/sign-in", async (req, res) => {
  const user = await prisma.user.findUnique({
    where: {
      username: req.body.username,
      password: req.body.password,
    },
  });

  if (user === null) {
    return res.status(422).json({
      error: "Usuário ou senha inválidos",
    });
  }

  const token = jwt.encode({
    id: user.id,
    name: user.name,
  });

  return res.status(200).json({
    user,
    token,
  });
});

accountRouter.post("/upload-avatar", [authMiddleware], async (req, res) => {
  const avatar = req.body.avatar;
  const avatarBuffer = await sharp(Buffer.from(avatar, "base64"))
    .resize({
      width: 64,
      height: 64,
      fit: "cover",
      position: "center",
    })
    .toBuffer();
  const avatarBase64 = "data:image/jpg;base64,".concat(
    avatarBuffer.toString("base64")
  );
  const user = await prisma.user.update({
    data: {
      avatar: avatarBase64,
    },
    where: {
      id: req.user.id,
    },
  });
  res.status(200).json(user);
});
