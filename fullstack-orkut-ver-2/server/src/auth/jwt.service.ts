import jwt, { JwtPayload } from "jsonwebtoken";
export { TokenExpiredError } from "jsonwebtoken";
import type { Request } from "express";
import { Service } from "typedi";

@Service()
export class JwtService {
  constructor() {
    const jwtSecret = process.env.JWT_SECRET;
    if (jwtSecret === undefined) {
      throw new EmptyJwtError();
    }

    this.jwtSecret = jwtSecret;
  }

  private jwtSecret: string;

  encode(payload: Object) {
    const token = jwt.sign(payload, this.jwtSecret, {
      expiresIn: "7d",
    });
    return token;
  }

  decode(token: string) {
    const payload = jwt.verify(token, this.jwtSecret);
    return payload as JwtPayload;
  }

  extractTokenFromHeader(request: Request) {
    const authorizationHeader = request.headers.authorization;
    if (authorizationHeader === undefined) {
      throw new InvalidAuthorizationHeaderError();
    }

    const [bearer, token] = authorizationHeader.split(" ");
    if (bearer !== "Bearer" || token.length < 1) {
      throw new InvalidAuthorizationHeaderError();
    }

    const payload = this.decode(token);
    return payload;
  }
}

export class EmptyJwtError extends Error {}
export class InvalidAuthorizationHeaderError extends Error {}
