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
exports.authMiddleware = void 0;
const keyConfig_1 = require("../config/keyConfig");
const jwt = require('jsonwebtoken');
const authMiddleware = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const accessToken = req.header('Authorization');
    if (accessToken == null) {
        res.status(403).json({ success: false, errormessage: 'Authentication fail' });
    }
    else {
        try {
            //todo: 인증이 성공 로직..
            const tokenInfo = yield new Promise((resolve, reject) => {
                jwt.verify(accessToken, keyConfig_1.keyConfig.secret, (err, decoded) => {
                    if (err) {
                        reject(err);
                    }
                    else {
                        resolve(decoded);
                    }
                });
            });
            console.log("tokenInfo==>", tokenInfo);
            //req.tokenInfo = tokenInfo;
            next();
        }
        catch (err) {
            console.log(err);
            res.status(403).json({ success: false, errormessage: 'Authentication fail' });
        }
    }
});
exports.authMiddleware = authMiddleware;
