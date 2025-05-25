import {Router} from 'express';
import {StatusCodes} from 'http-status-codes';
import { CidadesController, PessoasController, UsuariosController } from '../controllers';
import{ensureAuthenticated} from '../shared/middlewares'



const router = Router();

router.post('/cidades', ensureAuthenticated, CidadesController.createValidation, CidadesController.create);
router.get('/cidades', ensureAuthenticated, CidadesController.getAllValidation, CidadesController.getAll);
router.get('/cidades/:id', ensureAuthenticated, CidadesController.getByIdValidation, CidadesController.getById);
router.delete('/cidades/:id', ensureAuthenticated, CidadesController.deleteValidation, CidadesController.deleteById);
router.put('/cidades/:id', ensureAuthenticated, CidadesController.updateByIdValidation, CidadesController.updateById);

router.post('/pessoas', ensureAuthenticated, PessoasController.createValidation, PessoasController.create);
router.get('/pessoas', ensureAuthenticated, PessoasController.getAllValidation, PessoasController.getAll, );
router.get('/pessoas/:id', ensureAuthenticated, PessoasController.getByIdValidation, PessoasController.getById);
router.delete('/pessoas/:id', ensureAuthenticated, PessoasController.deleteByIdValidation, PessoasController.deleteById);
router.put('/pessoas/:id', ensureAuthenticated, PessoasController.updateByIdValidation, PessoasController.updateById);

router.post('/cadastrar', UsuariosController.signUpValidation, UsuariosController.signUp);
router.post('/entrar', UsuariosController.signInValidation, UsuariosController.signIn);



router.get('/', (req, res) => {
    return res.send('felipe é gay')

});

export {router};