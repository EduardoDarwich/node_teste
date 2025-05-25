import {Knex} from "../../Knex";
import { IUsuario } from "../../models";
import { ETablenames } from "../../ETablenames";
import { PasswordCrypto } from "../../../shared/middlewares/services";



export const create = async (usuario: Omit<IUsuario, 'id'>): Promise<number | Error> =>{

    try{
        
        const hashedPassword = await PasswordCrypto.hashPassword(usuario.senha);

        const [result] = await Knex(ETablenames.usuario).insert({...usuario, senha: hashedPassword}).returning('id');

        if(typeof result === 'object' ){
            return result.id;
        } else if(typeof result === 'number'){
            return result;
        }

        return new Error('erro ao cadstrar registro');
    } catch (error){

        return new Error('Erro ao cadastrar o registro')
    }


   
};