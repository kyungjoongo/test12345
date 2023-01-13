import {keyConfig} from "../config/keyConfig";
import Express from 'express';

const jwt = require('jsonwebtoken');


export const authMiddleware = async (req: Express.Request, res: Express.Response, next: any) => {
    const accessToken = req.header('Authorization');

    if (accessToken == null) {
        res.status(403).json({success: false, errormessage: 'Authentication fail'});
    } else {
        try {
            //todo: 인증이 성공 로직..
            const tokenInfo = await new Promise((resolve, reject) => {
                jwt.verify(accessToken, keyConfig.secret, (err: any, decoded: any) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(decoded);
                    }
                });
            });

            console.log("tokenInfo==>", tokenInfo)

            //req.tokenInfo = tokenInfo;
            next();
        } catch (err) {
            console.log(err);
            res.status(403).json({success: false, errormessage: 'Authentication fail'});
        }
    }
}
