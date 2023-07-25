import { Sequelize } from "sequelize";

const db = new Sequelize('dummy', 'root', '', {
    host: 'localhost',
    dialect: 'mysql'
})

export default db;