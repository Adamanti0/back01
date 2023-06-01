import { Request, Response } from "express"
import { SegUsuario } from "../models/seg_usuario.mod";
import { QueryTypes } from "sequelize";
import sequelize from "../db/connection";
import jwt from 'jsonwebtoken';

export const loginSegUsuario = async (req: Request, res: Response) => {
    const { login, password } = req.body;
    const usuario = await SegUsuario.findOne({ where: { login: login }, attributes: ['login', 'password'] });
    if (!usuario)
        return res.status(400).json({ msg: `No existe el usuario ${login}` });
    const crypto = require('crypto');
    const passwordEnviada = crypto.createHash('md5').update(password).digest('hex');
    if (usuario.dataValues.password != passwordEnviada)
        return res.status(400).json({ msg: 'Password incorrecto' });
    const token = jwt.sign(
        { login: login },
        process.env.SECRET_KEY || 'pepito123',
        { expiresIn: '90000' }
    )
    res.json(token);
}
export const newSegUsuario = async (req: Request, res: Response) => {
    const { login, password } = req.body;
    const usuario = await SegUsuario.findOne({ where: { login: login }, attributes: ['login'] });
    if (usuario)
        return res.status(400).json({ msg: `Ya existe el usuario ${login}` });
    const crypto = require('crypto');
    const hashedPassword = crypto.createHash('md5').update(password).digest('hex');
    await sequelize.query(
        `insert into ipp.seg_usuario(login,password,apiestado,usucre,feccre) 
         values('${login}','${hashedPassword}','ELABORADO','stag',now())`,
        { type: QueryTypes.SELECT });
    res.json({ msg: `Usuario ${login} creado` });
}
export const getSegUsuario = async (req: Request, res: Response) => {
    const lista = await SegUsuario.findAll(
        {
            attributes: ['id_usuario', 'login', 'password'],
            where: {
                'apiestado': 'ELABORADO'
            },
            order: [['id_usuario', 'DESC']]
        }
    );
    res.json(lista);
}