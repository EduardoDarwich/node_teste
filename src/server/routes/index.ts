import {Router} from 'express';
import {StatusCodes} from 'http-status-codes';
import { CidadesController } from '../controllers';



const router = Router();

router.post('/cidades',  CidadesController.createValidation, CidadesController.create);
router.get('/cidades', CidadesController.getAllValidation, CidadesController.getAll);
router.get('/cidades/:id', CidadesController.getByIdValidation, CidadesController.getById);
router.delete('/cidades/:id', CidadesController.deleteValidation, CidadesController.deleteById);
router.put('/cidades/:id', CidadesController.updateByIdValidation, CidadesController.updateById);

router.get('/', (req, res) => {
    return res.send('felipe é gay')

});

export {router};