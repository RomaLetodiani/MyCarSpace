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
const Category_Service_1 = __importDefault(require("../Services/Category.Service"));
class CategoryController {
    constructor() {
        this.getCategories = (0, express_async_handler_1.default)((req, res) => __awaiter(this, void 0, void 0, function* () {
            const params = req.query;
            const result = yield this.CategoryServices.findAll(params);
            res.status(200).json(result);
        }));
        this.getCategory = (0, express_async_handler_1.default)((req, res) => __awaiter(this, void 0, void 0, function* () {
            const id = req.params.id;
            const result = yield this.CategoryServices.findOneById({ id });
            res.status(200).json(result);
        }));
        this.createCategory = (0, express_async_handler_1.default)((req, res) => __awaiter(this, void 0, void 0, function* () {
            const categoryData = req.body;
            const result = yield this.CategoryServices.create(categoryData);
            res.status(201).json(result);
        }));
        this.updateCategory = (0, express_async_handler_1.default)((req, res) => __awaiter(this, void 0, void 0, function* () {
            const id = req.params.id;
            const categoryData = req.body;
            const result = yield this.CategoryServices.update({ id, categoryData });
            res.status(200).json(result);
        }));
        this.archiveCategories = (0, express_async_handler_1.default)((req, res) => __awaiter(this, void 0, void 0, function* () {
            const ids = req.body.ids;
            const result = yield this.CategoryServices.archive({ ids });
            res.status(200).json(result);
        }));
        this.restoreCategories = (0, express_async_handler_1.default)((req, res) => __awaiter(this, void 0, void 0, function* () {
            const ids = req.body.ids;
            const result = yield this.CategoryServices.restore({ ids });
            res.status(200).json(result);
        }));
        this.deleteCategories = (0, express_async_handler_1.default)((req, res) => __awaiter(this, void 0, void 0, function* () {
            const ids = req.body.ids;
            const result = yield this.CategoryServices.delete({ ids });
            res.status(200).json(result);
        }));
        this.CategoryServices = new Category_Service_1.default();
    }
}
exports.default = new CategoryController();
//# sourceMappingURL=Category.Controller.js.map