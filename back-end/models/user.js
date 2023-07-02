import { Sequelize } from "sequelize";
import db from "../config/database.js";

const {DataTypes} = Sequelize;

const User = db.define('user', {
    user_id: {
        type: DataTypes.INTEGER(13),
        primaryKey: true,
        autoIncrement: true
    },
    user_name: {
        type: DataTypes.STRING(20).BINARY,
        allowNull: false,
        unique: true
    },
    user_password: {
        type: DataTypes.STRING(20),
        allowNull: false
    },
    user_email: {
        type: DataTypes.STRING(255),
        allowNull: true,
        unique: true
    },
    user_picture: {
        type: DataTypes.STRING(255),
    }
},
{
    freezeTableName: true   
})

export default User;

(async()=>{
    await db.sync();
})