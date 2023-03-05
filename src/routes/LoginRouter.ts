import jwt from "jsonwebtoken";
import {keyConfig} from "../config/keyConfig";
import express from "express";
const loginRouter = express.Router();

loginRouter.post('/login', function (req, res, next) {
    let memberList = [
        {id: "lance77", password: "ka1114", name: "고경준"},
        {id: "testid2", password: "testpwd2", name: "김철수"},
        {id: "testid3", password: "testpwd3", name: "이영희"}];

    console.log("REST API Post Method - Member Login And JWT Sign");
    const memberId = req.body.id;
    const memberPassword = req.body.password;

    let count = 0;
    let memberItem = memberList.find(object => {
        if (object.id == memberId) {
            count++
        }
        return object;
    });

    console.log((memberItem))

    if (count > 0) {
        if (memberItem?.password == memberPassword) {

            jwt.sign({
                    memberId: memberItem?.id,
                    memberName: memberItem?.name
                },
                keyConfig.secret,
                {
                    expiresIn: '1d'
                },
                (err: any, token: any) => {
                    if (err) {
                        console.log(err);
                        res.status(401).json({success: false, errormessage: 'token sign fail'});
                    } else {
                        console.log(token)

                        res.json({success: true, accessToken: token});
                    }
                }
            );
        } else {
            res.status(401).json({success: false, errormessage: 'id and password are not identical'});
        }
    } else {
        res.status(401).json({success: false, errormessage: 'id and password are not identical'});
    }
});

export default loginRouter;
