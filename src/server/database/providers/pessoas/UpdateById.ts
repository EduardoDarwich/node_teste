import { ETablenames } from "../../ETablenames";
import { Knex } from "../../Knex";
import { IPessoa } from "../../models";



export const updateById = async (id: number, pessoa: Omit<IPessoa, 'id'>): Promise<void | Error> => {
    try {
        const [{count}] = await Knex(ETablenames.cidade).where('id', '=', pessoa.cidadeId).count<[{count: number}]>('* as count');

    if (count === 0) {
        return new Error('A cidade usada no cadastro não foi encontrada');
    }
    const result = await Knex(ETablenames.pessoa).update(pessoa).where('id', '=', id);

    if(result > 0) return;

    return new Error('Erro ao atualizar registro');
        
    } catch (error) {
        console.log(error);
        return new Error('Error ao atualizar registro');
        
    }
};