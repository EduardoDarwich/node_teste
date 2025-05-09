import { RequestHandler } from "express";
import { StatusCodes } from "http-status-codes";
import {ObjectSchema, ValidationError} from 'yup';

type TValidation = (getAllSchemas: TGetAllSchemas) => RequestHandler;
type TallSchemas = Record<Tproperty, ObjectSchema<any>>;
type TGetAllSchemas = (getSchema: TGetSchema) => Partial<TallSchemas>;
type TGetSchema = <T extends object>(Schema: ObjectSchema<T>) => ObjectSchema<T>;

type Tproperty = 'body'|'header'|'params'|'query';

export const validation: TValidation = (getAllSchemas) => async (req, res, next) =>{
    const schemas = getAllSchemas(schema => schema);

    const errorsResult: Record<string, Record<string, string>> = {};
    Object.entries(schemas).forEach(([key, schema])=>{

        try {
            schema.validateSync(req[key as Tproperty], {abortEarly: false});
            return next();
             
        } catch (err) {
            const yupError = err as ValidationError;
            const errors: Record<string, string> = {};
            
            yupError.inner.forEach(error=>{
                if (error.path === undefined) return;
                errors[error.path] = error.message;
    
            });
    
            errorsResult[key] = errors;
    
        }

    });

    if(Object.entries(errorsResult).length === 0) {
        return next();
    } else {
        return res.status(StatusCodes.BAD_REQUEST).json({errors: errorsResult});
    }

};

