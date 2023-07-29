import { response } from "express";
import User from "../models/user.js";

export const loginDummy = async(req, res)=>{
    try {
        const user = await User.findOne({
            where:{
                username: req.params.username,
                password: req.params.password
            }
        });
        if(user){
            await User.update({islogin: 'true'},{
                where:{
                    id: user.id
                }
            });

            res.json({url: `http://localhost:4269/dummy/app/${user.id}`});
        }
    } catch(error){
        console.log(error.message)
    }
}

export const checkApp = async(req,res)=>{
    try {
        const user = await User.findOne({
            where: {
                id: req.params.id
            }
        });
    res.status(200).json(user)
    } catch (error) {
        console.log(error.message)
    }
}