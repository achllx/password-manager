import {Sequelize} from "sequelize";
import db from "../config.js";

const {DataTypes} = Sequelize;

const User = db.define('user', {
    id: {
        type: DataTypes.INTEGER(13),
        primaryKey: true,
        autoIncrement: true
    },
    app: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    username:{
        type: DataTypes.STRING(255),
        allowNull: false,
        unique: true
    },
    password:{
        type: DataTypes.STRING(255),
        allowNull: false,
    },
    email:{
        type: DataTypes.STRING(255),
        allowNull: true,
        unique: true
    },
    islogin:{
        type: DataTypes.STRING(255),
        defaultValue: 'false'
    }
},
{
    freezeTableName: true
});

export default User;

(async()=>{
    await db.sync();
})