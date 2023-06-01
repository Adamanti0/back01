"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SegUsuario = void 0;
const connection_1 = __importDefault(require("../db/connection"));
exports.SegUsuario = connection_1.default.define('seg_usuario', {}, { schema: 'ipp', tableName: 'seg_usuario' });
