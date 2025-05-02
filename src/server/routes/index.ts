import {Router} from 'express';
import {StatusCodes} from 'http-status-codes';

const router = Router();

router.post('/', (req, res) => {
    console.log(req.body);

    return res.status(StatusCodes.ACCEPTED).json(req.body);
});

router.post('/', (req, res) => {
    return res.send('aoba')

});

export {router};