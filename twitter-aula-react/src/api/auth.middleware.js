import {
  JwtService,
  InvalidAuthorizationHeaderError,
  TokenExpiredError,
  NotBeforeError,
  JsonWebTokenError,
} from "./jwt.service.js";
const jwtService = new JwtService();
import { prisma } from "./prisma.js";

export async function authMiddleware(req, res, next) {
  try {
    const payload = jwtService.extractTokenFromHeader(req);
    req.user = await prisma.user.findUnique({
      where: {
        id: payload.id,
      },
    });
    return next();
  } catch (error) {
    if (
      error instanceof InvalidAuthorizationHeaderError ||
      error instanceof TokenExpiredError ||
      error instanceof JsonWebTokenError ||
      error instanceof NotBeforeError
    ) {
      return res.status(401).json({
        error: "Token inválido",
      });
    }

    throw error;
  }
}
