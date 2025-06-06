import {query, Request, RequestHandler, Response} from 'express'
import { StatusCodes } from 'http-status-codes'
import * as yup from 'yup';
import{validation} from '../../shared/middlewares';
import { CidadesProvider } from '../../database/providers/cidade';


interface IQueryProps{
    id?: number;
    page?: number;
    limit?: number;
    filter?: string;
    

    
}

export const getAllValidation = validation((getSchema) =>({
    
    query: getSchema<IQueryProps>(yup.object().shape({
        page: yup.number().optional().moreThan(0),
        limit: yup.number().optional().moreThan(0),
        id: yup.number().integer().optional().default(0),
        filter: yup.string().optional().min(3),

    
    })),    
}));


export const getAll = async (req:Request<{}, {}, {}, IQueryProps>, res:Response) => {

    
    const result = await CidadesProvider.getAll(req.query.page || 1, req.query.limit || 7, req.query.filter || '', Number(req.query.id || 0));
    const count = await CidadesProvider.count(req.query.filter);

    if (result instanceof Error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            errors: {default: result.message}
        });
    } else if (count instanceof Error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            errors: { default: count.message}
        })
    }

    res.setHeader('access-contro-expose-headers', 'x-total-count');
    res.setHeader('x-total-count', 1);
    

    
 
    

    console.log(req.query);

   
    return res.status(StatusCodes.OK).json(result);
};