import express, {NextFunction, Request, Response} from "express";
import boardModel from "../model/BoardModel";
import {httpStatus} from "../config/httpStatus";
import {authMiddleware} from "./authMiddleware";

const boardRoutes = express.Router();

//todo: GetAll Data
boardRoutes.get("/", async (req: Request, res: Response, next: NextFunction) => {
    try {
        let results = await boardModel.find();

        console.log(results);
        return res.json(results);
    } catch (error: any) {
        return res.status(Number(httpStatus.INTERNAL_SERVER_ERROR)).json({error: error.toString()});
    }
});

//todo: Create
boardRoutes.post("/", authMiddleware, async (req: Request, res: Response, next: NextFunction) => {
    const result = await boardModel.create(
        req.body
    );
    return res.status(Number(httpStatus.CREATED)).json({data: {result}});
});

boardRoutes.get("/:id", async (req: Request, res: Response, next: NextFunction) => {
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


export default boardRoutes;
