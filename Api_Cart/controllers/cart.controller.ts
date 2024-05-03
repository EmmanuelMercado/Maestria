import { Request,Response, NextFunction } from "express";
import { MongoClient } from "mongodb";
import paginate from "jw-paginate"

export default {
    health: async (req: Request,res:Response,next:NextFunction) =>{
        const start: Date = new Date();
        try {
            res.status(200).json({
                ok: true,
                rateLog: { start, end: new Date(), time: (new Date().getTime() - start.getTime()) /100 }
            })
        } catch (error) {
            res.status(500).json({
                error: error,
                rateLog: { start, end: new Date(), time: (new Date().getTime() - start.getTime()) /100 }
            })
        } finally {

        }
    },
    getProductsByCategory: async (req: Request,res:Response,next:NextFunction) =>{

    }
}
