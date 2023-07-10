import { Service } from "typedi";
import JWT from "jsonwebtoken";

const secret = process.env.JWT_SECRET ?? "";

@Service()
export class JWTService {
  sign(payload: JWT.JwtPayload) {
    const token = JWT.sign(payload, secret);
    return token;
  }

  verify(token: string) {
    try {
      const payload = JWT.verify(token, secret) as JWT.JwtPayload;
      return payload;
    } catch (error) {
      console.log(error);
      return null;
    }
  }
}
