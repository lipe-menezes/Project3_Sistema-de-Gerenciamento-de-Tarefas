"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authRoutes = void 0;
const express_1 = require("express");
const AuthController_1 = require("../controllers/AuthController");
exports.authRoutes = (0, express_1.Router)();
const controller = new AuthController_1.AuthController();
exports.authRoutes.post("/register", (req, res, next) => controller.register(req, res).catch(next));
exports.authRoutes.post("/login", (req, res, next) => controller.login(req, res).catch(next));
