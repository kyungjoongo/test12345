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
const body_parser_1 = __importDefault(require("body-parser"));
const http_1 = __importDefault(require("http"));
const mongoConnect_1 = __importDefault(require("./config/mongoConnect"));
const IndexRoute_1 = __importDefault(require("./routes/IndexRoute"));
const BoardRoutes_1 = __importDefault(require("./routes/BoardRoutes"));
const LoginRouter_1 = __importDefault(require("./routes/LoginRouter"));
// @ts-ignore
const path = require('path');
const app = (0, express_1.default)();
const server = http_1.default.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
//todo: ####################
//todo: Production enviroment
//todo: ####################
const isProduction = process.env.NODE_ENV === "production";
app.set('view engine', 'ejs');
app.set('views', 'src/views');
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: true }));
app.use(express_1.default.static(path.join(__dirname, 'public')));
//todo: ####################
//todo: Connect Mongo
//todo: ####################
(0, mongoConnect_1.default)().then(() => {
    console.log("Connected MongoDB====>");
});
io.on('connection', (socket) => {
    console.log('a user connected');
    socket.on('chat_message', (msg) => __awaiter(void 0, void 0, void 0, function* () {
        console.log('message: ' + msg);
        io.emit('chat_message', msg);
        let messageOne = {
            userName: msg.userName,
            roomName: msg.roomName,
            message: msg.message,
            createdAt: new Date(),
        };
        /*const result = await chatMessageModel.create(
            messageOne
        );*/
        //console.log("result===>", result);
    }));
});
//todo: ####################
//todo:  includes Routes
//todo: ####################
app.use("/", IndexRoute_1.default);
app.use("/", LoginRouter_1.default);
app.use("/", BoardRoutes_1.default);
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Server is running on PORT ${PORT}`);
});
