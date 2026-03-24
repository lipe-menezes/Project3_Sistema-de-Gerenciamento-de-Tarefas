"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeApp = makeApp;
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const morgan_1 = __importDefault(require("morgan"));
const authRoutes_1 = require("../interfaces/http/routes/authRoutes");
const errorHandler_1 = require("../interfaces/http/middlewares/errorHandler");
const meRoutes_1 = require("../interfaces/http/routes/meRoutes");
const tasksRoutes_1 = require("../interfaces/http/routes/tasksRoutes");
function makeApp() {
    const app = (0, express_1.default)();
    app.use((0, helmet_1.default)());
    app.use((0, cors_1.default)({ origin: true }));
    app.use(express_1.default.json());
    app.use((0, morgan_1.default)("dev"));
    app.get("/health", (_req, res) => {
        res.json({ status: "ok" });
    });
    app.use("/auth", authRoutes_1.authRoutes);
    app.use(meRoutes_1.meRoutes);
    app.use(tasksRoutes_1.tasksRoutes);
    app.use(errorHandler_1.errorHandler);
    return app;
}
