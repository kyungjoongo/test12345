"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const keyConfig_1 = require("../config/keyConfig");
const express_1 = __importDefault(require("express"));
const loginRouter = express_1.default.Router();
loginRouter.post('/login', function (req, res, next) {
    let memberList = [
        { id: "lance77", password: "ka1114", name: "고경준" },
        { id: "testid2", password: "testpwd2", name: "김철수" },
        { id: "testid3", password: "testpwd3", name: "이영희" }
    ];
    console.log("REST API Post Method - Member Login And JWT Sign");
    const memberId = req.body.id;
    const memberPassword = req.body.password;
    let count = 0;
    let memberItem = memberList.find(object => {
        if (object.id == memberId) {
            count++;
        }
        return object;
    });
    console.log((memberItem));
    if (count > 0) {
        if ((memberItem === null || memberItem === void 0 ? void 0 : memberItem.password) == memberPassword) {
            jsonwebtoken_1.default.sign({
                memberId: memberItem === null || memberItem === void 0 ? void 0 : memberItem.id,
                memberName: memberItem === null || memberItem === void 0 ? void 0 : memberItem.name
            }, keyConfig_1.keyConfig.secret, {
                expiresIn: '1d'
            }, (err, token) => {
                if (err) {
                    console.log(err);
                    res.status(401).json({ success: false, errormessage: 'token sign fail' });
                }
                else {
                    console.log(token);
                    res.json({ success: true, accessToken: token });
                }
            });
        }
        else {
            res.status(401).json({ success: false, errormessage: 'id and password are not identical' });
        }
    }
    else {
        res.status(401).json({ success: false, errormessage: 'id and password are not identical' });
    }
});
exports.default = loginRouter;
