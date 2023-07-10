import { Service } from "typedi";
import * as JWT from "jsonwebtoken";

const jwtSecret = process.env.JWT_SECRET ?? "";

@Service()
export class JWTService {
  constructor() {}

  sign(payload: any) {
    const jwt = JWT.sign(payload, jwtSecret, {
      expiresIn: "30 days",
    });
    return jwt;
  }
  verify(token: string): JWT.JwtPayload | null {
    try {
      const payload = JWT.verify(token, jwtSecret);
      return payload as any;
    } catch (error) {
      console.log(error);
      return null;
    }
  }
}
