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

export const getAppById = async(req, res)=>{
    try{
        const response = await App.findOne({
            where: {
                app_id: req.params.id
            }
        });
        res.json(response);
    }catch(error) {
        console.log(error);
    }
}

export const getAppByUserId = async(req, res)=>{
    try{
        const response = await App.findAll({
            where: {
                userUserId: req.params.id
            }
        });
        res.json(response);
    }catch(error){
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

export const updateApp = async(req, res)=>{
    const appName = req.body.name;
    const appType = req.body.type;
    const appLink = req.body.link;
    const appUsername = req.body.username;
    const appPassword = req.body.password;
    const appEmail = req.body.email;

    try{
        await App.update({
            app_name: appName,
            app_type: appType,
            app_link: appLink,
            app_username: appUsername,
            app_password: appPassword,
            app_email: appEmail
        },{
            where: {
                app_id: req.params.id
            }
        });

        res.status(200).json({msg: 'app updated'});
    }catch(error) {
        console.log(error.message);
    }
}