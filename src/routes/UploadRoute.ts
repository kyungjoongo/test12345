import express, {NextFunction, Request, Response} from "express";
import boardModel from "../model/BoardModel";
import {httpStatus} from "../config/httpStatus";
import upload from "./multer";
import fileModel from "../model/FileModel";

const uploadRouter = express.Router();

//todo: Create
uploadRouter.post("/upload", upload.single('image'), async (req: any, res: Response, next: NextFunction) => {
    console.log("filefile===>", req.file);

    console.log("location===>", req.file.location);
    const result = await fileModel.create({
        fileName:  req.file.location,
        createDate: new Date(),
        author: "sdlkfsdkflk3333",
    });
    return res.status(Number(httpStatus.CREATED)).json({data: {result}});
});




//todo: GetAll Data
uploadRouter.get("/upload", async (req: Request, res: Response, next: NextFunction) => {
    try {
        let results = await boardModel.find();

        console.log(results);
        return res.json(results);
    } catch (error: any) {
        return res.status(Number(httpStatus.INTERNAL_SERVER_ERROR)).json({error: error.toString()});
    }
});


uploadRouter.get("/upload/:id", async (req: Request, res: Response, next: NextFunction) => {
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

uploadRouter.put("/upload/:id", async (req: Request, res: Response, next: NextFunction) => {
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


export default uploadRouter;

