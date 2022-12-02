const redis = require("./connection/redis");

(async () => {
  try {
    // check connection
    const ping = await redis.ping();
    console.log({ ping });
    // return { ping: "PONG" };

    // create connection
    await redis.connection();

    // check redis connection
    const check_redis_connection = setInterval(async () => {
      if (redis.connected) {
        clearInterval(check_redis_connection);

        const string = await redis.GET("key");
        console.log({ string });
      }
    }, 100);
  } catch (error) {
    console.log({ error });
  }
})();
