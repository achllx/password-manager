import express from "express";
import{loginDummy} from "../controller/userController.js";

const router = express.Router();

router.get('/dummy/:username/:password', loginDummy);

export default router;