import{Router} from 'express';
import { getUsers, loginUser, newUser } from '../controllers/user.con';
import validateToken from './validate-token';

const router=Router();
router.get('/',validateToken,getUsers);
router.post('/new',newUser);
router.post('/login',loginUser);

export default router;