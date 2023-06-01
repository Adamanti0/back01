import { Router } from 'express';
import { getSegUsuario, loginSegUsuario, newSegUsuario } from '../controllers/seg_usuario.con';
import validateToken from './validate-token';

const router = Router();
router.post('/login', loginSegUsuario);
router.post('/new', newSegUsuario);
router.get('/get', validateToken, getSegUsuario);

export default router;