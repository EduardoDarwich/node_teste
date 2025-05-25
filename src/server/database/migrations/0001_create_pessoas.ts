import type { Knex } from "knex";
import { ETablenames } from "../ETablenames";


export async function up(knex: Knex) {
    return knex.schema.createTable(ETablenames.pessoa, table =>{
        table.bigIncrements('id').primary().index();
        table.string('nomeCompleto', ).index().notNullable();
        table.string('email', ).unique().notNullable();
        table.bigInteger('cidadeId', ).index().notNullable().references('id').inTable(ETablenames.cidade).onUpdate('CASCADE').onDelete('RESTRICT');

        table.comment('tabela usada para armazenar as pessoas');

    })
    .then(() => {
        console.log(`# Create table ${ETablenames.pessoa}`)
    });
    
}


export async function down(knex: Knex) {
    return knex.schema.dropTable(ETablenames.pessoa).then(() => {
        console.log(`# Drop table ${ETablenames.pessoa}`)
    })
}
