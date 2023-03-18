import express, {NextFunction, Request, Response} from "express";
import {keyConfig} from "../config/keyConfig";

//const jwt = require('jsonwebtoken');
import jwt from 'jsonwebtoken'
import {httpStatus} from "../config/httpStatus";

const indexRoutes = express.Router();


indexRoutes.get("/", async (req: Request, res: Response, next: NextFunction) => {

    /*return res.render('index', {
        data : [
            {
                name: 'kyungjoon',
                age: 40,
            },
            {
                name: 'kyungjoon2',
                age: 32,
            },
            {
                name: 'kyungjoon3',
                age: 46,
            },
        ]
    })*/

    return res.status(Number(httpStatus.OK)).json({message:"server health is ok!!"});
});


export default indexRoutes;
