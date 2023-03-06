import express from "express";
import bodyParser from "body-parser";
import http from "http";
import connectMongo from "./config/mongoConnect";
import indexRoutes from "./routes/IndexRoute";
import boardRoutes from "./routes/BoardRoutes";
import loginRouter from "./routes/LoginRouter";
// @ts-ignore
const path = require('path');
const app = express();
const server = http.createServer(app);
const {Server} = require("socket.io");
const io = new Server(server);

//todo: ####################
//todo: Production enviroment
//todo: ####################
const isProduction = process.env.NODE_ENV === "production";

app.set('view engine', 'ejs');
app.set('views', 'src/views');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

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

app.use("/", indexRoutes);
app.use("/", loginRouter);
app.use("/", boardRoutes);


const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`#################################`);
    console.log(`#################################`);
    console.log(`Server is running on PORT ${PORT}`);
    console.log(`#################################`);
    console.log(`#################################`);
});



