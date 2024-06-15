"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const Auth_Middleware_1 = require("../Middlewares/Auth.Middleware");
const Product_Controller_1 = __importDefault(require("../Controllers/Product.Controller"));
const Admin_middleware_1 = require("../Middlewares/Admin.middleware");
const Validate_middlware_1 = require("../Middlewares/Validate.middlware");
const Shared_dto_1 = require("../DTO/Shared.dto");
const Product_dto_1 = require("../DTO/Product.dto");
const router = express_1.default.Router();
// Get all products with optional filters in the query string
router.get("/", Product_Controller_1.default.getProducts);
// Get a specific product by its ID
router.get("/:id", (0, Validate_middlware_1.validateDTO)(Shared_dto_1.idDTO), Product_Controller_1.default.getProduct);
// Create a new product (authentication and admin rights required)
router.post("/", (0, Validate_middlware_1.validateDTO)(Product_dto_1.productCreateDTO), Auth_Middleware_1.authenticateUser, Admin_middleware_1.authenticateAdmin, Product_Controller_1.default.createProduct);
// Update a specific product by its ID (authentication and admin rights required)
router.put("/:id", (0, Validate_middlware_1.validateDTO)(Product_dto_1.productUpdateDTO), Auth_Middleware_1.authenticateUser, Admin_middleware_1.authenticateAdmin, Product_Controller_1.default.updateProduct);
// Archive specific products by their IDs (authentication and admin rights required)
router.patch("/archive", (0, Validate_middlware_1.validateDTO)(Shared_dto_1.idsDTO), Auth_Middleware_1.authenticateUser, Admin_middleware_1.authenticateAdmin, Product_Controller_1.default.archiveProducts);
// Restore specific products by their IDs (authentication and admin rights required)
router.patch("/restore", (0, Validate_middlware_1.validateDTO)(Shared_dto_1.idsDTO), Auth_Middleware_1.authenticateUser, Admin_middleware_1.authenticateAdmin, Product_Controller_1.default.restoreProducts);
// Delete specific products by their IDs (authentication and admin rights required)
router.delete("/", (0, Validate_middlware_1.validateDTO)(Shared_dto_1.idsDTO), Auth_Middleware_1.authenticateUser, Admin_middleware_1.authenticateAdmin, Product_Controller_1.default.deleteProducts);
exports.default = router;
//# sourceMappingURL=Product.Routes.js.map