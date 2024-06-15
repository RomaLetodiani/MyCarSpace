"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const Auth_Middleware_1 = require("../Middlewares/Auth.Middleware");
const User_Controller_1 = __importDefault(require("../Controllers/User.Controller"));
const router = express_1.default.Router();
// Get Current User information (Authentication required)
router.get("/current", Auth_Middleware_1.authenticateUser, User_Controller_1.default.GetCurrentUser);
// Update Current User information (Authentication required)
router.put("/current", Auth_Middleware_1.authenticateUser, User_Controller_1.default.UpdateCurrentUser);
exports.default = router;
//# sourceMappingURL=User.Routes.js.map