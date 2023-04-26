"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_con_1 = require("../controllers/user.con");
const validate_token_1 = __importDefault(require("./validate-token"));
const router = (0, express_1.Router)();
router.get('/', validate_token_1.default, user_con_1.getUsers);
router.post('/new', user_con_1.newUser);
router.post('/login', user_con_1.loginUser);
exports.default = router;
