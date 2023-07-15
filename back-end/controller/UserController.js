import User from "../models/user.js";
import path from 'path';

export const getAllUser = async(req, res)=>{
    try {
        const response = await User.findAll();
        res.json(response);
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
    if (req.files === null) return res.status(400).json({msg: 'No File Uploaded'});

    const picture = req.files.file;
    const fileSize = picture.data.length;
    const ext = path.extname(picture.name);
    const fileName = picture.md5 + ext;
    const url = `${req.protocol}://${req.get("host")}/images/${fileName}`;

   
    const allowType = '.jpeg';

    if(!allowType.includes(ext.toLocaleLowerCase())) return res.status(422).json({msg: 'Invalid Image'});
    if(fileSize > 5000000) return res.status(422).json({msg: 'Image must be less than 5 MB'});

    picture.mv(`./public/images/${fileName}`, async(err)=>{
        if(err) return res.status(500).json({msg: 'err.message'});

        try {
            await User.create({
                user_name: req.body.username, 
                user_password: req.body.password,
                user_email: req.body.email,
                user_picture: url
            });
            res.status(201).json({msg: 'user created successfully'})
        }catch(error) {
            console.log(error.message);
        }
    });

}

export const changePasswordUser = async(req, res)=>{
    const newPassword = req.body.password;
    try {
        await User.update({user_password: newPassword}, {
            where:{
                user_id: req.params.id
            }
        });
        res.status(200).json({msg: 'password change'});
    }catch(error){
        console.log(error.message);
    }
}