import * as updateById from './UpdateById';
import * as create from './Create';
import * as deleteById from './DeleteById';
import * as getAll from './GetAll';
import * as GetById from './GetById';

export const PessoasController = {
    ...GetById,
    ...create,
    ...updateById,
    ...deleteById,
    ...getAll,
}