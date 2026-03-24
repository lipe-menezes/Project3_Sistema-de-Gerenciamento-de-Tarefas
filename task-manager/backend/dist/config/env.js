"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.env = void 0;
require("dotenv/config");
function requireEnv(key) {
    const v = process.env[key];
    if (!v)
        throw new Error(`Missing env var: ${key}`);
    return v;
}
exports.env = {
    port: Number(process.env.PORT ?? 3333),
    corsOrigin: process.env.CORS_ORIGIN ?? "*",
    jwtSecret: requireEnv("JWT_SECRET"),
    jwtExpiresIn: process.env.JWT_EXPIRES_IN ?? "1h",
    bcryptSaltRounds: Number(process.env.BCRYPT_SALT_ROUNDS ?? 10),
};
