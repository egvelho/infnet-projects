import { PrismaClient } from "@prisma/client";

async function excludePasswordMiddleware(params, next) {
  const result = await next(params);
  if (params?.model === "User" && params?.args?.select?.password !== true) {
    delete result.password;
  }
  return result;
}

export const prisma = new PrismaClient();
prisma.$use(excludePasswordMiddleware);
