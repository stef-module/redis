"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const myredis_class_1 = __importDefault(require("./lib/myredis.class"));
module.exports = (param) => {
    return new myredis_class_1.default(param);
};
