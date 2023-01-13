import {key_config} from "../config/key_config";

const jwt = require('jsonwebtoken');


export const authMiddleware = async (req: any, res: any, next: any) => {
    const accessToken = req.header('Authorization');
    if (accessToken == null) {
        res.status(403).json({success: false, errormessage: 'Authentication fail'});
    } else {
        try {
            //todo: 인증이 성공 로직..
            const tokenInfo = await new Promise((resolve, reject) => {
                jwt.verify(accessToken, key_config.secret,
                    (err: any, decoded: any) => {
                        if (err) {
                            reject(err);
                        } else {
                            resolve(decoded);
                        }
                    });
            });
            req.tokenInfo = tokenInfo;
            next();
        } catch (err) {
            console.log(err);
            res.status(403).json({success: false, errormessage: 'Authentication fail'});
        }
    }
}
