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
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const Auth_Service_1 = __importDefault(require("../Services/Auth.Service"));
class AuthController {
    constructor() {
        // Reusable method for handling unimplemented endpoints
        this.handleNotImplemented = (req, res) => {
            res.status(501).json({
                message: "Not Implemented Yet",
            });
        };
        this.registerUser = (0, express_async_handler_1.default)(this.handleNotImplemented);
        this.logoutUser = (0, express_async_handler_1.default)(this.handleNotImplemented);
        this.loginUser = (0, express_async_handler_1.default)((req, res) => __awaiter(this, void 0, void 0, function* () {
            const { username, password } = req.body;
            const { accessToken, refreshToken } = yield this.authServices.createTokens({
                username,
                password,
            });
            res.status(200).json({
                accessToken,
                refreshToken,
            });
        }));
        this.refreshTokens = (0, express_async_handler_1.default)((req, res) => __awaiter(this, void 0, void 0, function* () {
            const { refreshToken } = req.body;
            const { accessToken, refreshToken: newRefreshToken } = yield this.authServices.refreshTokens({
                refreshToken,
            });
            res.status(200).json({
                accessToken,
                refreshToken: newRefreshToken,
            });
        }));
        this.authServices = new Auth_Service_1.default();
    }
}
exports.default = new AuthController();
//# sourceMappingURL=Auth.Controller.js.map