import express from "express";
import bodyParser from "body-parser";
import http from "http";
import connectMongo from "./src/config/mongoConnect";
import indexRoutes from "./src/routes/IndexRoute";
import boardRoutes from "./src/routes/BoardRoutes";
import loginRouter from "./src/routes/LoginRouter";
import commentRouter from "./src/routes/CommentRoutes";
import uploadRouter from "./src/routes/UploadRoute";
// @ts-ignore
const path = require('path');
const main = express();
const server = http.createServer(main);
const {Server} = require("socket.io");
const io = new Server(server);

//todo: ####################
//todo: Production enviroment
//todo: ####################
const isProduction = process.env.NODE_ENV === "production";

main.set('view engine', 'ejs');
main.set('views', 'src/views');
main.use(bodyParser.json());
main.use(bodyParser.urlencoded({extended: true}));
main.use(express.static(path.join(__dirname, 'public')));

//todo: ####################
//todo: Connect Mongo
//todo: ####################
connectMongo().then(() => {
    console.log("Connected MongoDB====>");
});

io.on('connection', (socket: any) => {
    console.log('a user connected');
    socket.on('chat_message', async (msg: any) => {
        console.log('message: ' + msg);
        io.emit('chat_message', msg)

        let messageOne = {
            userName: msg.userName,
            roomName: msg.roomName,
            message: msg.message,
            createdAt: new Date(),
        }
        /*const result = await chatMessageModel.create(
            messageOne
        );*/
        //console.log("result===>", result);
    });

});


//todo: ####################
//todo:  includes Routes
//todo: ####################
main.use("/", indexRoutes);
main.use("/", loginRouter);
main.use("/", boardRoutes);
main.use("/", commentRouter);
main.use("/", uploadRouter);

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
    console.log(`#################################`);
    console.log(`#################################`);
    console.log(`Server is running on PORT ${PORT}`);
    console.log(`#################################`);
    console.log(`#################################`);
});



