import jwt, { Secret, SignOptions } from "jsonwebtoken";
import { env } from "../../config/env";

export class JwtTokenProvider {
  sign(payload: object) {
    return jwt.sign(payload, env.jwtSecret as Secret, {
      expiresIn: env.jwtExpiresIn as SignOptions["expiresIn"],
    });
  }
}