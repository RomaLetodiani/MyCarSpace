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
const dotenv_1 = __importDefault(require("dotenv"));
const express_1 = __importDefault(require("express"));
const Auth_Routes_1 = __importDefault(require("./Routes/Auth.Routes"));
const Product_Routes_1 = __importDefault(require("./Routes/Product.Routes"));
const Category_Routes_1 = __importDefault(require("./Routes/Category.Routes"));
const User_Routes_1 = __importDefault(require("./Routes/User.Routes"));
const helmet_1 = __importDefault(require("helmet"));
const cors_1 = __importDefault(require("cors"));
const body_parser_1 = __importDefault(require("body-parser"));
const Error_middleware_1 = require("./Middlewares/Error.middleware");
const MongoDB_1 = __importDefault(require("./Database/MongoDB"));
const Auth_1 = require("./Utils/Auth");
// Load environment variables from .env file
dotenv_1.default.config();
// Create an Express application
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(body_parser_1.default.json({ limit: "50mb" }));
app.use(body_parser_1.default.urlencoded({ extended: true }));
// Security: Enable additional helmet protections (consider tailoring these based on your needs)
app.use(helmet_1.default.contentSecurityPolicy()); // Content Security Policy for script and resource restrictions
app.use(helmet_1.default.referrerPolicy()); // Prevent referrer leakage
// Define a route
app.get("/", (req, res) => {
    res.send("Hello, world!");
});
// Define routes
app.use("/api/auth", Auth_Routes_1.default);
app.use("/api/product", Product_Routes_1.default);
app.use("/api/category", Category_Routes_1.default);
app.use("/api/user", User_Routes_1.default);
app.use(Error_middleware_1.errorHandler);
// Start the server
const PORT = process.env.PORT || 5050;
app.listen(PORT, () => {
    if (process.env.NODE_ENV === "development") {
        console.log(`Server is running on port http://localhost:${PORT}`);
    }
});
(0, MongoDB_1.default)().then(() => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, Auth_1.seedAdmin)();
}));
//# sourceMappingURL=index.js.map