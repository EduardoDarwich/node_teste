import { StatusCodes } from "http-status-codes";
import { testServer } from "../jest.setup";
import { number } from "yup";



describe('Cidades - Create', ()  => {
    it('cria registro', async () =>{


        const res1 = await testServer.post('/cidades').send({
            nome: 'testekk'
        });

        expect(res1.statusCode).toEqual(StatusCodes.CREATED);
        expect(typeof res1.body).toEqual('number');

    });
     it('Tenta criar registro com nome curto', async () =>{

        const res1 = await testServer.post('/cidades').send({ nome: 'ca' });

        expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST);
        expect(res1.body).toHaveProperty('errors.body.nome')

    });
   
});

describe('Cidades - Delete', () => {
    it('Deletado com sucesso', async () =>{
        const res1 = await testServer.post('/cidades').send({nome: 'dqwdwqdqwd'});
        expect(res1.statusCode).toEqual(StatusCodes.CREATED);
        expect(typeof res1.body).toEqual('number');

        const resDelet = await testServer.delete(`/cidades/${res1.body}`).send();
        expect(resDelet.statusCode).toEqual(StatusCodes.NO_CONTENT);
    });
    it('não encontrado', async () => {
        const resDelet = await testServer.delete('/cidades/99').send();
        expect(resDelet.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR);
        expect(resDelet.body).toHaveProperty('errors.default');

    });

});

describe('Cidades - Update', () => {
    it('Atualizado com sucesso', async () => {
        const res1 = await testServer.post(`/cidades`).send({nome: 'eduardo'});
        expect(res1.statusCode).toEqual(StatusCodes.CREATED);
       

        const resUpdate = await testServer.put(`/cidades/${res1.body}`).send({nome: 'caxias'});
        expect(resUpdate.statusCode).toEqual(StatusCodes.NO_CONTENT);
        

    });
    it('nnão encontrado updt', async () =>{
        const res1 = await testServer.put('/cidades/99').send({nome: 'caxias'});
        expect(res1.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR);
        expect(res1.body).toHaveProperty('errors.default');

    });

});

describe('Cidades - getAll', () =>{
    it('buscar todos os registros', async () => {
        const res1 = await testServer.post('/cidades').send({nome: 'caxias do sul'});
        expect(res1.statusCode).toEqual(StatusCodes.CREATED);

        const resBusca = await testServer.get('/cidades').send();

        expect(Number(resBusca.header['x-total-count'])).toBeGreaterThan(0);
        expect(resBusca.statusCode).toEqual(StatusCodes.OK);
        expect(resBusca.body.length).toBeGreaterThan(0);

    }); 

});

describe('Cidades - getId', () => {
    it('buscadi com sucesso', async () =>{
        const res1 = await testServer.post('/cidades').send({nome: 'cias do sul'});
        expect(res1.statusCode).toEqual(StatusCodes.CREATED);

        const resGet = await testServer.get(`/cidades/${res1.body}`).send();
        expect(resGet.statusCode).toEqual(StatusCodes.OK);
        expect(resGet.body).toHaveProperty('nome');
    });
    it('não encontrado', async () => {
        const resget = await testServer.get('/cidades/99').send();
        expect(resget.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR);
        expect(resget.body).toHaveProperty('errors.default');

    });

});


