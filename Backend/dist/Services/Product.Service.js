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
const CustomError_1 = require("../Error/CustomError");
const Product_Model_1 = require("../Models/Product.Model");
const Category_Service_1 = __importDefault(require("./Category.Service"));
const productNotFoundError = new CustomError_1.CustomError("Product not found", 404);
class ProductServices {
    constructor() {
        this.findAll = (criteria) => __awaiter(this, void 0, void 0, function* () {
            const { category, isArchived, maxPrice, minPrice, onlySales, title } = criteria;
            const query = {};
            let categoryId;
            if (category) {
                const categoryFromDb = yield this.categoryServices.findOneByName({ name: category });
                if (!categoryFromDb)
                    return [];
                categoryId = categoryFromDb._id;
            }
            // Apply filters based on provided criteria
            if (category)
                query.category = categoryId;
            if (typeof isArchived !== "undefined")
                query.isArchived = isArchived;
            if (title)
                query.title = { $regex: title, $options: "i" };
            if (onlySales)
                query.salePrice = { $ne: null };
            // Handling price filters
            if (minPrice || maxPrice) {
                query.$or = [];
                // Define the min and max price conditions for salePrice and regular price
                const salePriceCondition = {};
                const regularPriceCondition = {};
                if (minPrice) {
                    salePriceCondition.salePrice = { $gte: minPrice };
                    regularPriceCondition.price = { $gte: minPrice };
                }
                if (maxPrice) {
                    salePriceCondition.salePrice = Object.assign(Object.assign({}, salePriceCondition.salePrice), { $lte: maxPrice });
                    regularPriceCondition.price = Object.assign(Object.assign({}, regularPriceCondition.price), { $lte: maxPrice });
                }
                // Add conditions to query
                if (Object.keys(salePriceCondition).length > 0) {
                    salePriceCondition.salePrice = Object.assign(Object.assign({}, salePriceCondition.salePrice), { $ne: null });
                    query.$or.push(salePriceCondition);
                }
                if (Object.keys(regularPriceCondition).length > 0) {
                    query.$or.push(regularPriceCondition);
                }
            }
            const products = yield Product_Model_1.Product.find(query).sort({ createdAt: -1 }).populate("category");
            return products;
        });
        this.findOne = (_a) => __awaiter(this, [_a], void 0, function* ({ id }) {
            const product = yield Product_Model_1.Product.find({ _id: id }).populate("category");
            if (!product)
                throw productNotFoundError;
            return product;
        });
        this.create = (productData) => __awaiter(this, void 0, void 0, function* () {
            const product = new Product_Model_1.Product(Object.assign(Object.assign({}, productData), { imageUrls: productData.imageUrls.map((b64) => "data:image/png;base64," + b64) }));
            yield product.save();
            return product;
        });
        this.update = (_b) => __awaiter(this, [_b], void 0, function* ({ id, productData }) {
            const product = yield Product_Model_1.Product.findOneAndUpdate({ _id: id }, productData, { new: true });
            if (!product)
                throw productNotFoundError;
            return product;
        });
        this.archive = (_c) => __awaiter(this, [_c], void 0, function* ({ ids }) {
            const result = yield Product_Model_1.Product.updateMany({ _id: { $in: ids } }, { isArchived: true });
            if (result.modifiedCount === 0)
                throw productNotFoundError;
            return result;
        });
        this.delete = (_d) => __awaiter(this, [_d], void 0, function* ({ ids }) {
            const result = yield Product_Model_1.Product.deleteMany({ _id: { $in: ids } });
            if (result.deletedCount === 0)
                throw productNotFoundError;
            return result;
        });
        this.restore = (_e) => __awaiter(this, [_e], void 0, function* ({ ids }) {
            const result = yield Product_Model_1.Product.updateMany({ _id: { $in: ids } }, { isArchived: false });
            if (result.modifiedCount === 0)
                throw productNotFoundError;
            return result;
        });
        this.categoryServices = new Category_Service_1.default();
    }
}
exports.default = ProductServices;
//# sourceMappingURL=Product.Service.js.map