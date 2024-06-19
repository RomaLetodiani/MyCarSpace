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
const Product_Service_1 = __importDefault(require("../Services/Product.Service"));
class ProductController {
    constructor() {
        this.getProducts = (0, express_async_handler_1.default)((req, res) => __awaiter(this, void 0, void 0, function* () {
            const params = req.query;
            const result = yield this.ProductServices.findAll(params);
            res.status(200).json(result);
        }));
        this.getProduct = (0, express_async_handler_1.default)((req, res) => __awaiter(this, void 0, void 0, function* () {
            const id = req.params.id;
            const result = yield this.ProductServices.findOne({ id });
            res.status(200).json(result);
        }));
        this.createProduct = (0, express_async_handler_1.default)((req, res) => __awaiter(this, void 0, void 0, function* () {
            const productData = req.body;
            const result = yield (yield this.ProductServices.create(productData)).populate("category");
            res.status(201).json(result);
        }));
        this.updateProduct = (0, express_async_handler_1.default)((req, res) => __awaiter(this, void 0, void 0, function* () {
            const id = req.params.id;
            const productData = req.body;
            const result = yield this.ProductServices.update({ id, productData });
            res.status(200).json(result);
        }));
        this.archiveProducts = (0, express_async_handler_1.default)((req, res) => __awaiter(this, void 0, void 0, function* () {
            const ids = req.body.ids;
            const result = yield this.ProductServices.archive({ ids });
            res.status(200).json(result);
        }));
        this.restoreProducts = (0, express_async_handler_1.default)((req, res) => __awaiter(this, void 0, void 0, function* () {
            const ids = req.body.ids;
            const result = yield this.ProductServices.restore({ ids });
            res.status(200).json(result);
        }));
        this.deleteProducts = (0, express_async_handler_1.default)((req, res) => __awaiter(this, void 0, void 0, function* () {
            const ids = req.body.ids;
            const result = yield this.ProductServices.delete({ ids });
            res.status(200).json(result);
        }));
        this.ProductServices = new Product_Service_1.default();
    }
}
exports.default = new ProductController();
//# sourceMappingURL=Product.Controller.js.map