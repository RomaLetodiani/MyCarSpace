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
exports.authenticateUser = void 0;
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const CustomError_1 = require("../Error/CustomError");
const Auth_1 = require("../Utils/Auth");
exports.authenticateUser = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const header = req.headers.authorization;
    if (!header) {
        throw new CustomError_1.CustomError("Not authorized, no token provided", 401);
    }
    const parts = header.split(" ");
    if (parts.length !== 2) {
        throw new CustomError_1.CustomError("Not authorized, token format should be 'Bearer <token>'", 401);
    }
    const [scheme, token] = parts;
    if (!/^Bearer$/i.test(scheme)) {
        throw new CustomError_1.CustomError("Not authorized, token format should be 'Bearer <token>'", 401);
    }
    // Verify the token
    try {
        const user = yield (0, Auth_1.verifyToken)(token);
        if (!user) {
            throw new CustomError_1.CustomError("Not authorized, invalid token", 401);
        }
        req.user = user;
        next();
    }
    catch (error) {
        throw new CustomError_1.CustomError("Not authorized, token verification failed", 401);
    }
}));
//# sourceMappingURL=Auth.Middleware.js.map