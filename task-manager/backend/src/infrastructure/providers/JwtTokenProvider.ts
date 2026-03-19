import jwt from "jsonwebtoken";
import { env } from "../../config/env";

export class JwtTokenProvider {
  sign(payload: object) {
    return jwt.sign(payload, env.jwtSecret, {
      expiresIn: env.jwtExpiresIn,
    });
  }
}