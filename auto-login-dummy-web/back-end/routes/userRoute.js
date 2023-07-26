import express from "express";
import{checkApp, loginDummy} from "../controller/userController.js";

const router = express.Router();

router.get('/dummy/:username/:password', loginDummy);
router.get('/check/dummy/:id', checkApp);

export default router;