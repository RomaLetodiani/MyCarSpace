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
exports.validateDTO = void 0;
// middlewares/validate.ts
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
function validateDTO(dtoClass) {
    return (req, res, next) => __awaiter(this, void 0, void 0, function* () {
        const dtoInstance = (0, class_transformer_1.plainToInstance)(dtoClass, req.params.id ? Object.assign(Object.assign({}, req.body), { id: req.params.id }) : req.body);
        const errors = yield (0, class_validator_1.validate)(dtoInstance);
        if (errors.length > 0) {
            const errorMessages = errors.map((error) => Object.values(error.constraints || {}).join(", "));
            return res.status(400).json({ errors: errorMessages });
        }
        req.body = dtoInstance;
        next();
    });
}
exports.validateDTO = validateDTO;
//# sourceMappingURL=Validate.middlware.js.map