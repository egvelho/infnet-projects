import jwt from "jsonwebtoken";

export const TokenExpiredError = jwt.TokenExpiredError;
export const JsonWebTokenError = jwt.JsonWebTokenError;
export const NotBeforeError = jwt.NotBeforeError;

export class JwtService {
  constructor() {
    const jwtSecret = process.env.JWT_SECRET;
    if (jwtSecret === undefined) {
      throw new EmptyJwtError();
    }

    this.jwtSecret = jwtSecret;
  }

  encode(payload) {
    const token = jwt.sign(payload, this.jwtSecret, {
      expiresIn: "24h",
    });
    return token;
  }

  decode(token) {
    const payload = jwt.verify(token, this.jwtSecret);
    return payload;
  }

  extractTokenFromHeader(request) {
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
