import { Sequelize } from "sequelize";

const db = new Sequelize('pagerdb', 'root', '', {
    host: 'localhost',
    dialect: 'mysql'
})

export default db;