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
Object.defineProperty(exports, "__esModule", { value: true });
const User_Model_1 = require("../Models/User.Model");
const CustomError_1 = require("../Error/CustomError");
const Auth_1 = require("../Utils/Auth");
class AuthServices {
    constructor() {
        this.createTokens = (_a) => __awaiter(this, [_a], void 0, function* ({ username, password }) {
            const user = yield User_Model_1.User.findOne({ username });
            if (!user) {
                throw new CustomError_1.CustomError("User not found", 404);
            }
            const isMatch = yield user.comparePassword(password);
            if (!isMatch) {
                throw new CustomError_1.CustomError("Invalid credentials", 401);
            }
            // Generate tokens
            const { accessToken, refreshToken } = (0, Auth_1.generateTokens)({
                username: user.username,
                email: user.email,
                role: user.role,
            });
            return { accessToken, refreshToken };
        });
        this.refreshTokens = (_b) => __awaiter(this, [_b], void 0, function* ({ refreshToken }) {
            const decodedUser = yield this.verifyAndDecodeRefreshToken({ refreshToken });
            const user = yield User_Model_1.User.findOne({ username: decodedUser === null || decodedUser === void 0 ? void 0 : decodedUser.username });
            if (!user) {
                throw new CustomError_1.CustomError("User not found", 404);
            }
            const { accessToken, refreshToken: newRefreshToken } = (0, Auth_1.generateTokens)({
                username: user.username,
                email: user.email,
                role: user.role,
            });
            return { accessToken, refreshToken: newRefreshToken };
        });
        this.verifyAndDecodeRefreshToken = (_c) => __awaiter(this, [_c], void 0, function* ({ refreshToken }) {
            try {
                const verifiedToken = yield (0, Auth_1.verifyToken)(refreshToken);
                if (typeof verifiedToken === "string" ||
                    !verifiedToken.exp ||
                    Date.now() / 1000 > verifiedToken.exp) {
                    throw new CustomError_1.CustomError("Invalid or expired refresh token", 404);
                }
                return (0, Auth_1.decodeToken)(refreshToken);
            }
            catch (error) {
                throw new CustomError_1.CustomError("Invalid refresh token", 404);
            }
        });
    }
}
exports.default = AuthServices;
//# sourceMappingURL=Auth.Service.js.map