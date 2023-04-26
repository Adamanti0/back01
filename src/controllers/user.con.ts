import{Request,Response}from 'express';
import { Usuario } from '../models/user.mod';
import sequelize from '../db/connection';
import { Op, QueryTypes, Sequelize } from 'sequelize';
import jwt from 'jsonwebtoken';

export const getUsers=async(req:Request,res:Response)=>{
   const lista=await Usuario.findAll({attributes: ['login', 'password']});
   res.json(lista);
}
export const newUser=async(req:Request,res:Response)=>{
   const{login,password}=req.body;
   const usuario=await Usuario.findOne({where:{login:login},attributes: ['login']});
   if(usuario)
      return res.status(400).json({msg:`Ya existe el usuario ${login}`});
   const crypto=require('crypto');
   const hashedPassword=crypto.createHash('md5').update(password).digest('hex');
   const lista=await sequelize.query(
      `insert into ipp.seg_usuario(login,password,apiestado,usucre,feccre) 
       values('${login}','${hashedPassword}','ELABORADO','stag',now())`,
      { type: QueryTypes.SELECT });
   res.json({msg:`Usuario ${login} creado`});
}
export const loginUser=async(req:Request,res:Response)=>{
   const{login,password}=req.body;
   const usuario=await Usuario.findOne({where:{login:login},attributes: ['login','password']});
   if(!usuario)
      return res.status(400).json({msg:`No existe el usuario ${login}`});
   const crypto=require('crypto');
   const passwordEnviada=crypto.createHash('md5').update(password).digest('hex');
   if(usuario.dataValues.password!=passwordEnviada)
      return res.status(400).json({msg:'Password incorrecto'});
   const token=jwt.sign(
      {login:login},
      process.env.SECRET_KEY||'pepito123',
      {expiresIn:'90000'}
   )
   res.json(token);
}