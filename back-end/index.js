import express from "express";
import FileUpload from "express-fileupload";
import cors from "cors";
import UserRoute from "./routes/userRoute.js";
import AppRoute from "./routes/appRoute.js";
const app = express();


//  apply all requiremnet to able receive request and do response
app.use(cors());
app.use(express.json());
app.use(FileUpload());
// make folder public on the backend ore server is public or can be access from outside
app.use(express.static("public"));

// using the routes that already declare
app.use(UserRoute);
app.use(AppRoute);

app.listen(3000, ()=> console.log("Running Server..."));