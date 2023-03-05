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
const mongoose_1 = __importDefault(require("mongoose"));
const development_1 = __importDefault(require("./env/development"));
mongoose_1.default.Promise = Promise;
mongoose_1.default.connection.on("connected", () => {
    console.log("log====>", (`MongoDB Connection Established====>>> ${development_1.default.dbConnectionString}`));
});
mongoose_1.default.connection.on("reconnected", () => {
    console.log("log====>", ("MongoDB Connection Reestablished"));
});
mongoose_1.default.connection.on("disconnected", () => {
    console.log("log====>", ("MongoDB Connection Disconnected"));
});
mongoose_1.default.connection.on("close", () => {
    console.log("log====>", ("MongoDB Connection Closed"));
});
mongoose_1.default.connection.on("error", error => {
    console.log("log====>", ("MongoDB ERROR: " + error));
    process.exit(1);
});
//todo: ##################
//todo: Db접속 정보 셋팅 부분..
//todo: ##################
mongoose_1.default.set("debug", development_1.default.mongoDebug);
const connectMongo = () => __awaiter(void 0, void 0, void 0, function* () {
    let connectionuri = development_1.default.dbConnectionString;
    yield mongoose_1.default.connect(connectionuri, {
        //autoReconnect: true,
        //reconnectTries: 1000000,
        //reconnectInterval: 3000,
        useNewUrlParser: true,
        useFindAndModify: false,
        useCreateIndex: true,
        useUnifiedTopology: true
    });
});
exports.default = connectMongo;
