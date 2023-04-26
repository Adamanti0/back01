import { Sequelize } from "sequelize";
const sequelize=new Sequelize('db_ipp01','postgres','admin',{host:'localhost',dialect:'postgres'});
export default sequelize;