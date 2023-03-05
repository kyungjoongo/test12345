"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//production.js
const prodConfig = {
    //database
    jwt_key: "",
    jwt_expiration: 360000,
    dbConnectionString: "mongodb://localhost:27017/kyungjoon_test",
    mongoDebug: false
};
exports.default = prodConfig;
