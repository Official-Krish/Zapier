"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SMTP_SERVICE = exports.SMTP_PORT = exports.SMTP_PASSWORD = exports.SMTP_MAIL = exports.SMTP_HOST = exports.JWT_SECRET = void 0;
exports.JWT_SECRET = process.env.JWT_SECRET || "secret";
exports.SMTP_HOST = process.env.SMTP_HOST || "smtp.gmail.com";
exports.SMTP_MAIL = process.env.SMTP_MAIL || "";
exports.SMTP_PASSWORD = process.env.SMTP_PASSWORD || "";
exports.SMTP_PORT = process.env.SMTP_PORT || 587;
exports.SMTP_SERVICE = process.env.SMTP_SERVICE || "gmail";
