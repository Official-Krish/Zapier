"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRouter = void 0;
const express_1 = require("express");
const Middleware_1 = require("../Middleware");
const types_1 = require("../types");
const db_1 = require("../db");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const config_1 = require("../config");
const activationtoken_1 = require("../utils/activationtoken");
const sendEmail_1 = __importDefault(require("../utils/sendEmail"));
const router = (0, express_1.Router)();
router.post("/signup", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const body = req.body;
    const parsedData = types_1.SignupSchema.safeParse(body);
    const hashedPassword = yield bcrypt_1.default.hash(body.password, 10);
    if (!parsedData.success) {
        return res.status(400).json({ error: "Invalid data" });
    }
    const userExist = yield db_1.prismaClient.user.findFirst({
        where: {
            email: parsedData.data.username
        }
    });
    if (userExist) {
        return res.status(400).json({ error: "User already exist" });
    }
    const user = {
        name: parsedData.data.name,
        email: parsedData.data.username,
        password: parsedData.data.password,
    };
    console.log(user.email);
    try {
        const activationToken = (0, activationtoken_1.createActivationToken)(user);
        const activationCode = activationToken.activationCode;
        const data = { user: { name: user.name }, activationCode };
        yield (0, sendEmail_1.default)({
            email: user.email,
            message: ` Hi <span>${user.name}</span> Your  activation Code is <p>${activationCode} </p> Please activate Your Account  `,
            subject: "Email Verification",
        });
        return res.status(201).json({
            success: true,
            message: `Please check your email: ${user.email} `,
            token: activationToken.token,
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: `Internal server error: ${error.message}`,
        });
    }
}));
router.post("/signin", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const body = req.body;
    const parsedData = types_1.SigninSchema.safeParse(body);
    if (!parsedData.success) {
        return res.status(400).json({ error: "Invalid data" });
    }
    try {
        const user = yield db_1.prismaClient.user.findFirst({
            where: {
                email: parsedData.data.username
            }
        });
        if (!user) {
            return res.status(400).json({ error: "user not found" });
        }
        const isPasswordMatch = yield bcrypt_1.default.compare(parsedData.data.password, user.password);
        if (isPasswordMatch) {
            const token = jsonwebtoken_1.default.sign({
                id: user.id,
            }, config_1.JWT_SECRET);
            res.json({ token });
        }
        else {
            res.json({ error: "Invalid password" });
        }
    }
    catch (err) {
        console.error('Error authenticating user:', err);
    }
}));
router.get("/", Middleware_1.authMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // TODO: Fix the type
    // @ts-ignore
    const id = req.id;
    const user = yield db_1.prismaClient.user.findFirst({
        where: {
            id
        },
        select: {
            name: true,
            email: true
        }
    });
    return res.json({
        user
    });
}));
exports.userRouter = router;
