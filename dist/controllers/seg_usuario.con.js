"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSegUsuario = exports.newSegUsuario = exports.loginSegUsuario = void 0;
const seg_usuario_mod_1 = require("../models/seg_usuario.mod");
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../db/connection"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const loginSegUsuario = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { login, password } = req.body;
    const usuario = yield seg_usuario_mod_1.SegUsuario.findOne({ where: { login: login }, attributes: ['login', 'password'] });
    if (!usuario)
        return res.status(400).json({ msg: `No existe el usuario ${login}` });
    const crypto = require('crypto');
    const passwordEnviada = crypto.createHash('md5').update(password).digest('hex');
    if (usuario.dataValues.password != passwordEnviada)
        return res.status(400).json({ msg: 'Password incorrecto' });
    const token = jsonwebtoken_1.default.sign({ login: login }, process.env.SECRET_KEY || 'pepito123', { expiresIn: '90000' });
    res.json(token);
});
exports.loginSegUsuario = loginSegUsuario;
const newSegUsuario = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { login, password } = req.body;
    const usuario = yield seg_usuario_mod_1.SegUsuario.findOne({ where: { login: login }, attributes: ['login'] });
    if (usuario)
        return res.status(400).json({ msg: `Ya existe el usuario ${login}` });
    const crypto = require('crypto');
    const hashedPassword = crypto.createHash('md5').update(password).digest('hex');
    yield connection_1.default.query(`insert into ipp.seg_usuario(login,password,apiestado,usucre,feccre) 
         values('${login}','${hashedPassword}','ELABORADO','stag',now())`, { type: sequelize_1.QueryTypes.SELECT });
    res.json({ msg: `Usuario ${login} creado` });
});
exports.newSegUsuario = newSegUsuario;
const getSegUsuario = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const lista = yield seg_usuario_mod_1.SegUsuario.findAll({
        attributes: ['id_usuario', 'login', 'password'],
        where: {
            'apiestado': 'ELABORADO'
        },
        order: [['id_usuario', 'DESC']]
    });
    res.json(lista);
});
exports.getSegUsuario = getSegUsuario;
