const redis = require("redis");

interface IConstructor {
  host: string;
  port?: number;
}
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
  host: string;
  port: number;
  connected: boolean;
  SET: null | any;
  HSET: null | any;
  GET: null | any;
  HGET: null | any;
  HGETALL: null | any;
  DEL: null | any;

  constructor(param: IConstructor) {
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

      /**
       * @description
       * set the string value of a key
       *
       * @example
       * const MyRedis = require("./src/connection/redis.class");
       * const redis = new MyRedis(host, port);
       *
       * redis.SET(key, value, options);
       */
      this.SET = (key: string, value: string, options: any) => {
        return client.set(key, value, options);
      };

      /**
       * @description
       * set the string value of a hash field
       *
       * @example
       * const MyRedis = require("./src/connection/redis.class");
       * const redis = new MyRedis(host, port);
       *
       * redis.HSET(key, field, value);
       */

      this.HSET = (key: string, field: string, value: string) => {
        return client.hSet(key, field, value);
      };

      /**
       * @description
       * get the value of a key
       *
       * @example
       * const MyRedis = require("./src/connection/redis.class");
       * const redis = new MyRedis(host, port);
       *
       * redis.GET(key);
       */
      this.GET = (key: string) => {
        return client.get(key);
      };

      /**
       * @description
       * get the value of a hash field
       *
       * @example
       * const MyRedis = require("./src/connection/redis.class");
       * const redis = new MyRedis(host, port);
       *
       * redis.HGET(key, field);
       */
      this.HGET = (key: string, field: string) => {
        return client.hGet(key, field);
      };

      /**
       * @description
       * get all the field and values a key
       *
       * @example
       * const MyRedis = require("./src/connection/redis.class");
       * const redis = new MyRedis(host, port);
       *
       * redis.HGETALL(key);
       */
      this.HGETALL = (key: string) => {
        return client.hGetAll(key);
      };

      /**
       * @description
       * delete a key
       *
       * @example
       * const MyRedis = require("./src/connection/redis.class");
       * const redis = new MyRedis(host, port);
       *
       * redis.DEL(key);
       */
      this.DEL = (key: string) => {
        return client.del(key);
      };

      console.log({ redis: "redis connect" }); // logger
    });

    /**
     * @description
     * redis on ready
     */
    client.on("ready", () => {
      console.log({ redis: "redis is ready" }); // logger
    });

    /**
     * @description
     * redis on reconnect
     */
    client.on("reconnecting", (options: any) => {
      console.log({ redis: "reconnecting" }); // logger
    });

    /**
     * @description
     * redis on error
     */
    client.on("error", (options: any) => {
      this.connected = false;
      client["connected"] = false;
      console.log({ redis: options.message }); // logger
    });

    /**
     * @description
     * redis on end
     */
    client.on("end", (options: any) => {
      console.log({ redis: "redis end" }); // logger
    });

    /**
     * @description
     * redis on warning
     */
    client.on("warning", (options: any) => {
      console.log({ redis: "redis warning" }); // logger
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
  async ping() {
    const client = this.connection();
    await this.timeout(100);

    return client.ping();
  }

  timeout(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
}

export default MyRedis;
