"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.zapRouter = void 0;
const express_1 = require("express");
const Middleware_1 = require("../Middleware");
const router = (0, express_1.Router)();
router.post("/", Middleware_1.authMiddleware, (req, res) => {
    console.log("create zap");
});
router.get("/", Middleware_1.authMiddleware, (req, res) => {
});
router.get("/:zapId", Middleware_1.authMiddleware, (req, res) => {
});
exports.zapRouter = router;
