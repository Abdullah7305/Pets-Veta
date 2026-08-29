const redisClient = require('../config/redis.config');
const { RedisStore } = require('rate-limit-redis');
const { rateLimit } = require('express-rate-limit');

const createRedisStore = (prefix) => {
    if (!redisClient) {
        return undefined;
    }

    return new RedisStore({
        sendCommand: (...args) => redisClient.sendCommand(args),
        prefix,
    });
}

const authLimiter = rateLimit({
    store: createRedisStore('rl:auth:'),
    windowMs: 1 * 60 * 1000, // Reduced from 5 min to 1 min
    limit: 10,
    standardHeaders: 'draft-8',
    legacyHeaders: false,
    message: {
        status: 429,
        error: "Too many Auth attempts. Please try again in a minute."
    }
});

const adminLimiter = rateLimit({
    store: createRedisStore('rl:admin:'),
    windowMs: 1 * 60 * 1000, // Reduced from 10 min to 1 min
    limit: 50,
    standardHeaders: 'draft-8',
    legacyHeaders: false,
    message: {
        status: 429,
        error: "Admin resource limit reached. Try again after a minute."
    }
});

const petOwnerLimiter = rateLimit({
    store: createRedisStore('rl:petOwner:'),
    windowMs: 1 * 60 * 1000, // Reduced from 10 min to 1 min
    limit: 50,
    standardHeaders: 'draft-8',
    legacyHeaders: false,
    message: {
        status: 429,
        error: "Resource limit reached. Please wait a minute."
    }
});

const globalUserLimiter = rateLimit({
    store: createRedisStore('rl:global:'),
    windowMs: 1 * 60 * 1000, // Reduced from 10 min to 1 min
    limit: 150,
    legacyHeaders: false,
    standardHeaders: 'draft-8',
    message: {
        status: 429,
        error: "Too many requests from this device. Please slow down."
    }
});

const doctorLimiter = rateLimit({
    store: createRedisStore('rl:doctor:'), // Added missing Redis store
    windowMs: 1 * 60 * 1000, // Reduced from 10 min to 1 min
    limit: 100,
    standardHeaders: 'draft-8',
    legacyHeaders: false,
    message: {
        status: 429,
        error: "Too many requests. Please wait a minute before proceeding."
    }
});

module.exports = {
    adminLimiter,
    globalUserLimiter,
    authLimiter,
    petOwnerLimiter,
    doctorLimiter
}