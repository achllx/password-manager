import User from "../models/user.js";

export const getAllUser = async(req, res)=>{
    try {
        const response = await User.findAll();
        res.json(response)
    } catch (error) {
        console.log(error.message)
    }
}

export const getUserByLogin = async(req, res)=>{
    try {
        const response = await User.findOne({
            where: {
                user_name: req.params.username,
                user_password: req.params.password
            }
        });
        res.json(response)
    } catch (error) {
        console.log(error.message)
    }
}

export const createUser = (req, res)=>{

}

export const updateUser = (req, res)=>{
    
}