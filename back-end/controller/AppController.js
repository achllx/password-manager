import App from "../models/app.js";
import User from "../models/user.js";

export const getAllApp = async(req, res)=>{
    try {
        const response = await App.findAll();
        res.json(response);
    }catch(error) {
        console.log(error.message);
    }
}

export const createApp = async(req,res)=>{
    try {
        const user = await User.findOne({
            where:{
                user_id: req.body.user_id
            }
        });

        if (user) {
            App.create({
                userUserId: req.body.user_id,
                app_name: req.body.app_name,
                app_type: req.body.app_type,
                app_link: req.body.app_link,
                app_username: req.body.app_username,
                app_password: req.body.app_password,
                app_email: req.body.app_email
            });
            res.status(201).json({msg: 'App createtd Succcessfully'});
        }
    }catch (error){
        console.log(error.message);
    }
}