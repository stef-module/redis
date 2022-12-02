import MyRedis from "./lib/myredis.class";

interface IMariaDB {
  host: string;
  port?: number;
}

module.exports = (param: IMariaDB) => {
  return new MyRedis(param);
};
