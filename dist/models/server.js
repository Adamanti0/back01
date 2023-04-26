"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_rou_1 = __importDefault(require("../routes/user.rou"));
class Server {
    constructor() {
        this.app = (0, express_1.default)();
        this.port = process.env.PORT || '3000';
        this.listen();
        this.midlewares();
        this.routes();
    }
    listen() {
        this.app.listen(this.port, () => {
            console.log(`Puerto ${this.port}`);
        });
    }
    routes() {
        this.app.use('/api/user', user_rou_1.default);
    }
    midlewares() {
        this.app.use(express_1.default.json());
    }
}
exports.default = Server;
