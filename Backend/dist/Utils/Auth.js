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
exports.seedAdmin = exports.hashPassword = exports.verifyToken = exports.decodeToken = exports.generateTokens = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const User_Model_1 = require("../Models/User.Model");
const generateTokens = (user) => {
    const jwtSecret = process.env.JWT_SECRET_KEY || "";
    const accessToken = jsonwebtoken_1.default.sign(Object.assign({}, user), jwtSecret, { expiresIn: "1h" });
    const refreshToken = jsonwebtoken_1.default.sign(Object.assign({}, user), jwtSecret, { expiresIn: "1w" });
    return { accessToken, refreshToken };
};
exports.generateTokens = generateTokens;
const hashPassword = (password) => __awaiter(void 0, void 0, void 0, function* () {
    const salt = yield bcrypt_1.default.genSalt(10);
    return yield bcrypt_1.default.hash(password, salt);
});
exports.hashPassword = hashPassword;
const verifyToken = (token) => __awaiter(void 0, void 0, void 0, function* () {
    const jwtSecret = process.env.JWT_SECRET_KEY || "";
    return jsonwebtoken_1.default.verify(token, jwtSecret);
});
exports.verifyToken = verifyToken;
const decodeToken = (token) => {
    return jsonwebtoken_1.default.decode(token);
};
exports.decodeToken = decodeToken;
const seedAdmin = () => __awaiter(void 0, void 0, void 0, function* () {
    const adminUser = yield User_Model_1.User.findOne({ role: "admin" });
    if (adminUser) {
        console.log("🚀 ~ admin user already Created");
        return;
    }
    const admin = new User_Model_1.User({
        username: process.env.ADMIN_USERNAME,
        email: process.env.ADMIN_EMAIL,
        password: process.env.ADMIN_PASSWORD,
        role: User_Model_1.Role.ADMIN,
    });
    yield admin.save();
    console.log("🚀 ~ admin user Created");
    return;
});
exports.seedAdmin = seedAdmin;
//# sourceMappingURL=Auth.js.map