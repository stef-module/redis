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
Object.defineProperty(exports, "__esModule", { value: true });
const redis = require("redis");
/**
 * @author stefanus adhie
 * @since 0.0.1
 * @see https://www.npmjs.com/package/redis
 * @version 4.5.1
 * @class MyRedis
 * @description
 * class for redis database
 *
 * @constructor
 *
 * @param {string} host
 * @param {number} port
 */
class MyRedis {
    constructor(param) {
        this.host = param.host || "localhost";
        this.port = param.port || 6379;
        this.connected = false;
        this.SET = null;
        this.HSET = null;
        this.GET = null;
        this.HGET = null;
        this.HGETALL = null;
        this.DEL = null;
    }
    /**
     * @description
     * create connection to redis
     *
     * @returns {function}
     */
    connection() {
        const client = redis.createClient({
            socket: {
                host: this.host,
                port: this.port,
            },
        });
        client.connect();
        /**
         * @description
         * redis on connect
         */
        client.on("connect", () => {
            this.connected = true;
            client["connected"] = true;
            this.SET = (key, value, options) => {
                return client.set(key, value, options);
            };
            this.HSET = (key, field, value) => {
                return client.hSet(key, field, value);
            };
            this.GET = (key) => {
                return client.get(key);
            };
            this.HGET = (key, field) => {
                return client.hGet(key, field);
            };
            this.HGETALL = (key) => {
                return client.hGetAll(key);
            };
            this.DEL = (key) => {
                return client.del(key);
            };
            console.log("redis connect"); // logger
        });
        /**
         * @description
         * redis on ready
         */
        client.on("ready", () => {
            console.log("redis is ready"); // logger
        });
        /**
         * @description
         * redis on reconnect
         */
        client.on("reconnecting", (options) => {
            console.log("reconnecting"); // logger
        });
        /**
         * @description
         * redis on error
         */
        client.on("error", (options) => {
            this.connected = false;
            client["connected"] = false;
            console.log(options.message); // logger
        });
        /**
         * @description
         * redis on end
         */
        client.on("end", (options) => {
            console.log("redis end"); // logger
        });
        /**
         * @description
         * redis on warning
         */
        client.on("warning", (options) => {
            console.log("redis warning"); // logger
        });
        return client;
    }
    /**
     * @description
     * test redis server connection
     *
     * @returns {string}  PONG
     *
     * @example
     * const MyRedis = require("./src/connection/redis.class");
     * const redis = new MyRedis(host, port);
     *
     * redis.ping();
     */
    ping() {
        return __awaiter(this, void 0, void 0, function* () {
            const client = this.connection();
            yield this.timeout(100);
            return client.ping();
        });
    }
    timeout(ms) {
        return new Promise((resolve) => setTimeout(resolve, ms));
    }
}
exports.default = MyRedis;
