import { ETablenames } from "../../ETablenames";
import { IUsuario } from "../../models";
import { Knex } from "../../Knex";

export const getByEmail = async (email: string): Promise<IUsuario | Error> => {
    try {
        const result = await Knex(ETablenames.usuario).select('*').where('email', '=', email).first();

        if (result) return result;
        return new Error ('Registro não encontrado ');
    } catch (error) {
        console.log(error);
        return new Error('Erro ao consultar registro')
    }
}