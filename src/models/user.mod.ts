import sequelize from '../db/connection';

export const Usuario=sequelize.define('seg_usuario',{},{schema:'ipp',tableName:'seg_usuario',timestamps:false});