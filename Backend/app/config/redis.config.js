const { createClient } = require('redis');

const redisUrl = process.env.REDIS_URL;
let redisClient = null;

if (redisUrl) {
    redisClient = createClient({
        url: redisUrl,
        socket: {
            reconnectStrategy: false,
        },
    })

    redisClient.on('connect', () => {
        console.log("Redis Connected")
    })

    redisClient.on('error', (err) => {
        console.error("Error is Redi Connection", err.message)
    });

    (async () => {
        try {
            await redisClient.connect();

        } catch (error) {
            console.error("Failed To Connect to Redis", error.message)
        }
    })()
} else {
    console.warn("REDIS_URL not set. Using in-memory rate limiting.");
}


module.exports = redisClient;
