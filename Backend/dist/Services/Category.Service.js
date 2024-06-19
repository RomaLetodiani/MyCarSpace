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
Object.defineProperty(exports, "__esModule", { value: true });
const CustomError_1 = require("../Error/CustomError");
const Category_Model_1 = require("../Models/Category.Model");
const categoryNotFoundError = new CustomError_1.CustomError("Category not found", 404);
class CategoryServices {
    constructor() {
        this.findAll = (criteria) => __awaiter(this, void 0, void 0, function* () {
            const categories = yield Category_Model_1.Category.find(criteria).sort({ isArchived: 1, createdAt: -1 });
            return categories;
        });
        this.findOneById = (_a) => __awaiter(this, [_a], void 0, function* ({ id }) {
            const category = yield Category_Model_1.Category.find({ _id: id });
            if (!category)
                throw categoryNotFoundError;
            return category;
        });
        this.findOneByName = (_b) => __awaiter(this, [_b], void 0, function* ({ name }) {
            const category = yield Category_Model_1.Category.findOne({ name });
            return category;
        });
        this.create = (categoryData) => __awaiter(this, void 0, void 0, function* () {
            const categoryExist = yield this.findOneByName({ name: categoryData.name });
            if (categoryExist)
                throw new CustomError_1.CustomError("Category with that name already exists", 400);
            const category = new Category_Model_1.Category(categoryData);
            yield category.save();
            return category;
        });
        this.update = (_c) => __awaiter(this, [_c], void 0, function* ({ id, categoryData }) {
            let category = yield this.findOneByName({ name: categoryData.name });
            if (category)
                throw new CustomError_1.CustomError("Category with that name already exists", 400);
            category = yield Category_Model_1.Category.findOneAndUpdate({ _id: id }, categoryData, { new: true });
            if (!category)
                throw categoryNotFoundError;
            return category;
        });
        this.archive = (_d) => __awaiter(this, [_d], void 0, function* ({ ids }) {
            const result = yield Category_Model_1.Category.updateMany({ _id: { $in: ids } }, { isArchived: true });
            if (result.modifiedCount === 0)
                throw categoryNotFoundError;
            return result;
        });
        this.delete = (_e) => __awaiter(this, [_e], void 0, function* ({ ids }) {
            const result = yield Category_Model_1.Category.deleteMany({ _id: { $in: ids } });
            if (result.deletedCount === 0)
                throw categoryNotFoundError;
            return result;
        });
        this.restore = (_f) => __awaiter(this, [_f], void 0, function* ({ ids }) {
            const result = yield Category_Model_1.Category.updateMany({ _id: { $in: ids } }, { isArchived: false });
            if (result.modifiedCount === 0)
                throw categoryNotFoundError;
            return result;
        });
    }
}
exports.default = CategoryServices;
//# sourceMappingURL=Category.Service.js.map