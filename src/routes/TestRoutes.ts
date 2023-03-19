import express, {NextFunction, Request, Response} from "express";
import testModel from "../model/TestModel";
import {httpStatus} from "../config/httpStatus";

const testRouter = express.Router();


//todo: fetch all
testRouter.get("/test", async (req: Request, res: Response, next: NextFunction) => {
    try {
        let results = await testModel.find();

        console.log(results);
        return res.json(results);
    } catch (error: any) {
        return res.status(Number(httpStatus.INTERNAL_SERVER_ERROR)).json({error: error.toString()});
    }
});


//todo: Create one
testRouter.post("/test", async (req: Request, res: Response, next: NextFunction) => {
    console.log("body===>", req.body);

    const result = await testModel.create(
        req.body
    );
    return res.status(Number(httpStatus.CREATED)).json({data: {result}});
});


//todo get comment one
testRouter.get("/test/:id", async (req: Request, res: Response, next: NextFunction) => {
    let _boardId = req?.params?.id
    try {
        let results = await testModel.find({
            boardId: _boardId
        });
        return res.json(results);
    } catch (error: any) {
        return res.status(Number(httpStatus.INTERNAL_SERVER_ERROR)).json({error: error.toString()});
    }
});


//todo: modify comment
testRouter.put("/test/:id", async (req: Request, res: Response, next: NextFunction) => {
    let _id = req?.params?.id
    let _body: any = req.body

    try {

        let result = await testModel.updateOne(
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


export default testRouter;
