import express from "express";
import FileUpload from "express-fileupload";
import cors from "cors";
import UserRoute from "./routes/userRoute.js";
import AppRoute from "./routes/appRoute.js";
const app = express();

app.use(cors());
app.use(express.json());
app.use(FileUpload());
app.use(express.static("public"));
app.use(UserRoute);
app.use(AppRoute);

app.listen(3000, ()=> console.log("Running Server..."));