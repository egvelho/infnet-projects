import { Action } from "routing-controllers";
import { PrismaClient } from "@prisma/client";
import { JWTService } from "../jwt.service";

const prisma = new PrismaClient();
const jwtService = new JWTService();

export async function authorizationChecker(action: Action) {
  const token = extractTokenFromHeader(action);
  if (token === null) {
    return false;
  }
  const payload = jwtService.verify(token);
  if (payload === null) {
    return false;
  }

  const userId = payload.id;
  const user = await prisma.users.findFirst({
    where: {
      id: userId,
    },
  });

  if (user === null) {
    return false;
  }

  action.request.user = user;
  return true;
}

function extractTokenFromHeader(action: Action) {
  if (!action.request.headers.authorization) {
    return null;
  }

  const [bearer, token] = action.request.headers.authorization.split(" ");
  if (bearer !== "Bearer" || !token) {
    return null;
  }

  return token;
}
