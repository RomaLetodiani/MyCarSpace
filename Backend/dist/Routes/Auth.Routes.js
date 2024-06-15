"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const Auth_Controller_1 = __importDefault(require("../Controllers/Auth.Controller"));
const Auth_Middleware_1 = require("../Middlewares/Auth.Middleware");
const Validate_middlware_1 = require("../Middlewares/Validate.middlware");
const Auth_dto_1 = require("../DTO/Auth.dto");
const router = express_1.default.Router();
// Register a user (No Authentication required)
router.post("/register", Auth_Controller_1.default.registerUser);
// Login a user (No Authentication required)
router.post("/login", (0, Validate_middlware_1.validateDTO)(Auth_dto_1.loginUserDTO), Auth_Controller_1.default.loginUser);
// Logout a user (Authentication required)
router.post("/logout", Auth_Middleware_1.authenticateUser, Auth_Controller_1.default.logoutUser);
// Refresh tokens (No Authentication required)
router.post("/refresh-tokens", (0, Validate_middlware_1.validateDTO)(Auth_dto_1.refreshTokenDTO), Auth_Controller_1.default.refreshTokens);
exports.default = router;
//# sourceMappingURL=Auth.Routes.js.map