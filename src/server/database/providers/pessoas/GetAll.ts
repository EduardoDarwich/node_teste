import { ETablenames } from "../../ETablenames";
import { Knex } from "../../Knex";
import { IPessoa } from "../../models";



export const getAll = async (page: number, limit: number, filter: string): Promise<IPessoa[] | Error> => {
    
     
    try {
       
        const result = await Knex(ETablenames.pessoa).select('*').where('nomeCompleto', 'like', `%${filter}%`).offset((page -1) * limit).limit(limit);
        
        return result;
        
    } catch (error) {
         
        console.log(error)
        return new Error('Erro ao consultar os registros')
        
    }
};

