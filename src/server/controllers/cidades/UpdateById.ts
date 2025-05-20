import {Request, Response} from 'express';
import {StatusCodes} from 'http-status-codes';
import * as yup from 'yup';
import{validation} from '../../shared/middlewares/';

interface IparamProps{
    id?: number;
}
interface IBodyProps{
    nome: string;
}

export const updateByIdValidation = validation(getSchema =>({
    body: getSchema<IBodyProps>(yup.object().shape({
        nome: yup.string().required().min(3),

    })),
    params: getSchema<IparamProps>(yup.object().shape({
        id: yup.number().required().min(3).moreThan(0),
    })),
}));

export const updateById = async (req:Request<IparamProps, {}, IBodyProps>, res: Response) =>  {

    if (Number(req.params.id) === 99) return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        errors:{
            default: "n encontrado"
        }

    });

    console.log(req.params);
    console.log(req.body);

    return res.status(StatusCodes.NO_CONTENT).send()
};
