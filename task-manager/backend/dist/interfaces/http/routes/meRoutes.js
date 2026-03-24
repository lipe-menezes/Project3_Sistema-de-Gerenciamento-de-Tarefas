"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.meRoutes = void 0;
const express_1 = require("express");
const authGuard_1 = require("../middlewares/authGuard");
const MeController_1 = require("../controllers/MeController");
exports.meRoutes = (0, express_1.Router)();
const controller = new MeController_1.MeController();
exports.meRoutes.get("/me", authGuard_1.authGuard, (req, res, next) => controller.me(req, res).catch(next));
