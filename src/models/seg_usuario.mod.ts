import sequelize from '../db/connection';

export const SegUsuario = sequelize.define('seg_usuario', {}, { schema: 'ipp', tableName: 'seg_usuario' });