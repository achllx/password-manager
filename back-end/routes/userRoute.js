import express from 'express';
import {
    getUserByLogin,
    createUser,
    changePasswordUser,
    getAllUser
} from '../controller/UserController.js';

const router = express.Router();

router.get('/user', getAllUser);
router.get('/user/:username/:password', getUserByLogin);
router.post('/user', createUser);
router.patch('/update/user/:id', changePasswordUser);

export default router;