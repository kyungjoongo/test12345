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
const express_1 = __importDefault(require("express"));
const BoardModel_1 = __importDefault(require("../model/BoardModel"));
const httpStatus_1 = require("../config/httpStatus");
const authMiddleware_1 = require("../middleware/authMiddleware");
const boardRoutes = express_1.default.Router();
//todo: GetAll Data
boardRoutes.get("/board", authMiddleware_1.authMiddleware, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let results = yield BoardModel_1.default.find();
        console.log(results);
        return res.json(results);
    }
    catch (error) {
        return res.status(Number(httpStatus_1.httpStatus.INTERNAL_SERVER_ERROR)).json({ error: error.toString() });
    }
}));
//todo: Create
boardRoutes.post("/board", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("sldkflskdflksdf===>", req.body);
    console.log("sldkflskdflksdf===>", req.body);
    const result = yield BoardModel_1.default.create(req.body);
    return res.status(Number(httpStatus_1.httpStatus.CREATED)).json({ data: { result } });
}));
boardRoutes.get("/board/:id", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    let _id = (_a = req === null || req === void 0 ? void 0 : req.params) === null || _a === void 0 ? void 0 : _a.id;
    try {
        let results = yield BoardModel_1.default.findById({
            _id: _id
        });
        return res.json(results);
    }
    catch (error) {
        return res.status(Number(httpStatus_1.httpStatus.INTERNAL_SERVER_ERROR)).json({ error: error.toString() });
    }
}));
exports.default = boardRoutes;
//todo: GetAll Data
//todo; authMiddleware
// boardRoutes.get("/board", authMiddleware, async (req: Request, res: Response, next: NextFunction) => {
//     try {
//         let results = await boardModel.find();
//
//         console.log(results);
//         return res.json(results);
//     } catch (error: any) {
//         return res.status(Number(httpStatus.INTERNAL_SERVER_ERROR)).json({error: error.toString()});
//     }
// });
