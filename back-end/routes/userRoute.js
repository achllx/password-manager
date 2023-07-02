import express from 'express';
import {
    getUserByLogin,
    createUser,
    updateUser,
    getAllUser
} from '../controller/UserController.js';

const router = express.Router();

router.get('/user', getAllUser);
router.get('/user/:username/:password', getUserByLogin);
router.post('/user', createUser);
router.patch('/update/user/:id', updateUser);

export default router;