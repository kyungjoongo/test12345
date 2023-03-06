import express, {NextFunction, Request, Response} from "express";
import commentModel from "../model/CommentModel";
import {httpStatus} from "../config/httpStatus";

const commentRouter = express.Router();


//todo: fetch all
commentRouter.get("/comment", async (req: Request, res: Response, next: NextFunction) => {
    try {
        let results = await commentModel.find();

        console.log(results);
        return res.json(results);
    } catch (error: any) {
        return res.status(Number(httpStatus.INTERNAL_SERVER_ERROR)).json({error: error.toString()});
    }
});


//todo: Create one
commentRouter.post("/comment", async (req: Request, res: Response, next: NextFunction) => {
    console.log("body===>", req.body);

    const result = await commentModel.create(
        req.body
    );
    return res.status(Number(httpStatus.CREATED)).json({data: {result}});
});


//todo get comment one
commentRouter.get("/comment/:id", async (req: Request, res: Response, next: NextFunction) => {
    let _boardId = req?.params?.id
    try {
        let results = await commentModel.find({
            boardId: _boardId
        });
        return res.json(results);
    } catch (error: any) {
        return res.status(Number(httpStatus.INTERNAL_SERVER_ERROR)).json({error: error.toString()});
    }
});


//todo: modify comment
commentRouter.put("/comment/:id", async (req: Request, res: Response, next: NextFunction) => {
    let _id = req?.params?.id
    let _body: any = req.body

    try {

        let result = await commentModel.updateOne(
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


export default commentRouter;
