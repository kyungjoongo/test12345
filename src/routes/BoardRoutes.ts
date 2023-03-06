import express, {NextFunction, Request, Response} from "express";
import boardModel from "../model/BoardModel";
import {httpStatus} from "../config/httpStatus";

const boardRoutes = express.Router();


//todo: GetAll Data
boardRoutes.get("/board", async (req: Request, res: Response, next: NextFunction) => {
    try {
        let results = await boardModel.find();

        console.log(results);
        return res.json(results);
    } catch (error: any) {
        return res.status(Number(httpStatus.INTERNAL_SERVER_ERROR)).json({error: error.toString()});
    }
});


//todo: Create
boardRoutes.post("/board", async (req: Request, res: Response, next: NextFunction) => {
    console.log("body===>", req.body);

    const result = await boardModel.create(
        req.body
    );
    return res.status(Number(httpStatus.CREATED)).json({data: {result}});
});

boardRoutes.get("/board/:id", async (req: Request, res: Response, next: NextFunction) => {
    let _id = req?.params?.id

    try {
        let results = await boardModel.findById({
            _id: _id
        });
        return res.json(results);
    } catch (error: any) {
        return res.status(Number(httpStatus.INTERNAL_SERVER_ERROR)).json({error: error.toString()});
    }
});

boardRoutes.put("/board/:id", async (req: Request, res: Response, next: NextFunction) => {
    let _id = req?.params?.id
    let _body: any = req.body

    try {

        let result = await boardModel.updateOne(
            {_id: _id},
            {
                $set: {
                    name: _body.name,
                    contents: _body.contents,
                    title: _body.title,
                    createDate: new Date(),
                    pwd: _body.pwd,

                }
            }
        );

        return res.json(result);
    } catch (error: any) {
        return res.status(Number(httpStatus.INTERNAL_SERVER_ERROR)).json({error: error.toString()});
    }
});


export default boardRoutes;


//todo: GetAll Data
//todo; authMiddleware
// boardRoutes.get("/board", authMiddleware, async (req: Request, res: Response, next: NextFunction) => {
//     try {
//         let results = await boardModel.find();
//
//         console.log(results);
//         return res.json(results);
//     } catch (error: any) {
//         return res.status(Number(httpStatus.INTERNAL_SERVER_ERROR)).json({error: error.toString()});
//     }
// });
