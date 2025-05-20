import {Request, RequestHandler, Response} from 'express'
import { StatusCodes } from 'http-status-codes'
import * as yup from 'yup';
import{validation} from '../../shared/middlewares';


interface Icidade{
    nome: string;
    
}


export const createValidation = validation((getSchema) =>({
    
    body: getSchema<Icidade>(yup.object().shape({
        nome: yup.string().required().min(3),
    
    }))
}));


export const create = async (req:Request<{}, {}, Icidade>, res:Response) => {
    

    
 
    

    console.log(req.body);


    return res.status(StatusCodes.CREATED).json(1);
};