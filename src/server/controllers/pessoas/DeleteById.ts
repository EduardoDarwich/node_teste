import { StatusCodes } from "http-status-codes";
import { validation } from "../../shared/middlewares";
import { PessoasProvider } from "../../database/providers/pessoas";
import * as yup from 'yup'
import { Request, Response } from "express";




interface IParamProps{
    id?: number;
}
export const deleteByIdValidation = validation(get => ({
    params: get<IParamProps>(yup.object().shape({
        id: yup.number().integer().required().moreThan(0),
    })),
}));

export const deleteById = async (req: Request<IParamProps>, res: Response) => {
    if (!req.params.id) {
        return res.status(StatusCodes.BAD_REQUEST).json({
            errors: {
                default: 'o parametro "id" precisa ser informado'
            }
        });
    }

    const result = await PessoasProvider.deleteById(req.params.id);
    if (result instanceof Error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            errors: {
                default: result.message
            }
        });
    }
    return res.status(StatusCodes.NO_CONTENT).send();

};