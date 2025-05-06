import {Router} from 'express';
import {StatusCodes} from 'http-status-codes';
import { CidadesController } from '../controllers';
import { createBodyValidator, createQueryValidator } from '../controllers/cidades/Create';


const router = Router();

router.post('/cidades', CidadesController.createBodyValidator, CidadesController.create, CidadesController.createQueryValidator);

router.get('/', (req, res) => {
    return res.send('aoba')

});

export {router};