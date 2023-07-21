import express from 'express';
import {
    getUserByLogin,
    createUser,
    changePasswordUser,
    getAllUser,
    getUserByFace,
    logoutUser,
} from '../controller/UserController.js';

const router = express.Router();

router.get('/user', getAllUser);
router.get('/user/:username/:password', getUserByLogin);
router.post('/user', createUser);
router.patch('/user/update/:id', changePasswordUser);
router.patch('/user/face', getUserByFace);
router.patch('/user/logout/:id', logoutUser);

export default router;