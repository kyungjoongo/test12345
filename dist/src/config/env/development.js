"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//development.js
const devConfig = {
    jwt_key: "",
    jwt_expiration: 360000,
    //dbConnectionString: "mongodb://localhost:27017/kyungjoon_test_222",
    //mongodb+srv://<username>:<password>@cluster0.wdj1ypp.mongodb.net/?retryWrites=true&w=majority
    dbConnectionString: "mongodb+srv://admin:1114@cluster0.mpn31kz.mongodb.net/?retryWrites=true&w=majority",
    mongoDebug: true
};
exports.default = devConfig;
