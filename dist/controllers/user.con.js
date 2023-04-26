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
exports.loginUser = exports.newUser = exports.getUsers = void 0;
const user_mod_1 = require("../models/user.mod");
const connection_1 = __importDefault(require("../db/connection"));
const sequelize_1 = require("sequelize");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const getUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const lista = yield user_mod_1.Usuario.findAll({ attributes: ['login', 'password'] });
    res.json(lista);
});
exports.getUsers = getUsers;
const newUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { login, password } = req.body;
    const usuario = yield user_mod_1.Usuario.findOne({ where: { login: login }, attributes: ['login'] });
    if (usuario)
        return res.status(400).json({ msg: `Ya existe el usuario ${login}` });
    const crypto = require('crypto');
    const hashedPassword = crypto.createHash('md5').update(password).digest('hex');
    const lista = yield connection_1.default.query(`insert into ipp.seg_usuario(login,password,apiestado,usucre,feccre) 
       values('${login}','${hashedPassword}','ELABORADO','stag',now())`, { type: sequelize_1.QueryTypes.SELECT });
    res.json({ msg: `Usuario ${login} creado` });
});
exports.newUser = newUser;
const loginUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { login, password } = req.body;
    const usuario = yield user_mod_1.Usuario.findOne({ where: { login: login }, attributes: ['login', 'password'] });
    if (!usuario)
        return res.status(400).json({ msg: `No existe el usuario ${login}` });
    const crypto = require('crypto');
    const passwordEnviada = crypto.createHash('md5').update(password).digest('hex');
    if (usuario.dataValues.password != passwordEnviada)
        return res.status(400).json({ msg: 'Password incorrecto' });
    const token = jsonwebtoken_1.default.sign({ login: login }, process.env.SECRET_KEY || 'pepito123', { expiresIn: '90000' });
    res.json(token);
});
exports.loginUser = loginUser;
