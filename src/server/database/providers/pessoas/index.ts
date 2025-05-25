import * as create from './Create';
import * as count from './Count';
import * as Delete from './Delete';
import * as getAll from './GetAll';
import * as getbyId from './GetById';
import * as updateById from './UpdateById';



export const PessoasProvider = {
    
    ...create,
    ...count,
    ...Delete,
    ...getAll,
    ...getbyId,
    ...updateById,
    

}