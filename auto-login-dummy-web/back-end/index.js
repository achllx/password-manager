import express from "express";
import cors from "cors";
import UserRoute from './routes/userRoute.js';
const app = express();

app.use(cors());
app.use(express.json());
app.use(UserRoute);

app.listen(4000, ()=> console.log("Running Server..."));