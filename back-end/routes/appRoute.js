import express from "express";

import{
    createApp,
    getAllApp
} from '../controller/AppController.js';

const router = express.Router();

router.get('/app', getAllApp);
router.post('/create/app', createApp);

export default router;