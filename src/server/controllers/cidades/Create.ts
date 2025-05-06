import {Request, RequestHandler, Response} from 'express'
import { StatusCodes } from 'http-status-codes'
import * as yup from 'yup';
import{validation} from '../../shared/middlewares';


interface Icidade{
    nome: string;
    estado: string;
}

interface Ifilter {
    filter?: string;
}

const bodyValidation: yup.ObjectSchema<Icidade> = yup.object().shape({

    nome: yup.string().required().min(3),
    estado: yup.string().required().min(3)

});

const queryValidation: yup.ObjectSchema<Ifilter> = yup.object().shape({

    filter: yup.string().required().min(3),

});

export const createBodyValidator: RequestHandler = async (req, res, next) => {
    try{

        await bodyValidation.validate(req.body, {abortEarly: false});
        return next();
 
     } catch (err) {
 
         const yupError = err as yup.ValidationError;
         const errors: Record<string, string> = {};
         yupError.inner.forEach( error =>{
             
             if(error.path === undefined ) return;
             errors[error.path] = error.message;
 
         });
 
         return res.status(StatusCodes.BAD_REQUEST).json({ errors: errors,});
 
     }
}

export const createQueryValidator: RequestHandler = async (req, res, next) => {
    try{

        await queryValidation.validate(req.query, {abortEarly: false});
        return next();
 
     } catch (err) {
 
         const yupError = err as yup.ValidationError;
         const errors: Record<string, string> = {};
         yupError.inner.forEach( error =>{
             
             if(error.path === undefined ) return;
             errors[error.path] = error.message;
 
         });
 
         return res.status(StatusCodes.BAD_REQUEST).json({ errors: errors,});
 
     }
}












export const createValidation = validation();


export const create = async (req:Request<{}, {}, Icidade>, res:Response) => {
    

    
 
    

    console.log(req.body);


    return res.send('create');
};