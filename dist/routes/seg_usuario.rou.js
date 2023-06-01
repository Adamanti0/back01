"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const seg_usuario_con_1 = require("../controllers/seg_usuario.con");
const validate_token_1 = __importDefault(require("./validate-token"));
const router = (0, express_1.Router)();
router.post('/login', seg_usuario_con_1.loginSegUsuario);
router.post('/new', seg_usuario_con_1.newSegUsuario);
router.get('/get', validate_token_1.default, seg_usuario_con_1.getSegUsuario);
exports.default = router;
