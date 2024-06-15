"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const Auth_Middleware_1 = require("../Middlewares/Auth.Middleware");
const Admin_middleware_1 = require("../Middlewares/Admin.middleware");
const Category_Controller_1 = __importDefault(require("../Controllers/Category.Controller"));
const Validate_middlware_1 = require("../Middlewares/Validate.middlware");
const Shared_dto_1 = require("../DTO/Shared.dto");
const Category_dto_1 = require("../DTO/Category.dto");
const router = express_1.default.Router();
// Get all category with optional filters in the query string
router.get("/", Category_Controller_1.default.getCategories);
// Get a specific category by its ID
router.get("/:id", Category_Controller_1.default.getCategory);
// Create a new category (authentication and admin rights required)
router.post("/", (0, Validate_middlware_1.validateDTO)(Category_dto_1.categoryCreateDTO), Auth_Middleware_1.authenticateUser, Admin_middleware_1.authenticateAdmin, Category_Controller_1.default.createCategory);
// Update a specific category by its ID (authentication and admin rights required)
router.put("/:id", (0, Validate_middlware_1.validateDTO)(Category_dto_1.categoryUpdateDTO), Auth_Middleware_1.authenticateUser, Admin_middleware_1.authenticateAdmin, Category_Controller_1.default.updateCategory);
// Archive specific categories by their IDs (authentication and admin rights required)
router.patch("/archive", (0, Validate_middlware_1.validateDTO)(Shared_dto_1.idsDTO), Auth_Middleware_1.authenticateUser, Admin_middleware_1.authenticateAdmin, Category_Controller_1.default.archiveCategories);
// Restore specific categories by their IDs (authentication and admin rights required)
router.patch("/restore", (0, Validate_middlware_1.validateDTO)(Shared_dto_1.idsDTO), Auth_Middleware_1.authenticateUser, Admin_middleware_1.authenticateAdmin, Category_Controller_1.default.restoreCategories);
// Delete specific categories by their IDs (authentication and admin rights required)
router.delete("/", (0, Validate_middlware_1.validateDTO)(Shared_dto_1.idsDTO), Auth_Middleware_1.authenticateUser, Admin_middleware_1.authenticateAdmin, Category_Controller_1.default.deleteCategories);
exports.default = router;
//# sourceMappingURL=Category.Routes.js.map