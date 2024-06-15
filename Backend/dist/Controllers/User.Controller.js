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
const User_Service_1 = __importDefault(require("../Services/User.Service"));
const CustomError_1 = require("../Error/CustomError");
class UserController {
    constructor() {
        // Reusable method for handling unimplemented endpoints
        this.handleNotImplemented = (req, res) => {
            res.status(501).json({
                message: "Not Implemented Yet",
            });
        };
        this.GetCurrentUser = (0, express_async_handler_1.default)((req, res) => __awaiter(this, void 0, void 0, function* () {
            const decodedUser = req.user;
            if (!decodedUser) {
                throw new CustomError_1.CustomError("User not found", 404);
            }
            const user = yield this.userServices.findOne({ username: decodedUser.username });
            res.status(200).json(user);
        }));
        this.UpdateCurrentUser = (0, express_async_handler_1.default)(this.handleNotImplemented);
        this.userServices = new User_Service_1.default();
    }
}
exports.default = new UserController();
//# sourceMappingURL=User.Controller.js.map