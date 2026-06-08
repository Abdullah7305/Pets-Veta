const redisClient = require('../config/redis.config');
const { RedisStore } = require('rate-limit-redis');
const { rateLimit } = require('express-rate-limit');

const authStore = new RedisStore({
    sendCommand: (...args) => redisClient.sendCommand(args),
    prefix: 'rl:auth:',
});

const adminStore = new RedisStore({
    sendCommand: (...args) => redisClient.sendCommand(args),
    prefix: 'rl:admin:'
});

const petOwnerStore = new RedisStore({
    sendCommand: (...args) => redisClient.sendCommand(args),
    prefix: 'rl:petOwner:'
});

const globalUserStore = new RedisStore({
    sendCommand: (...args) => redisClient.sendCommand(args),
    prefix: 'rl:global:'
})

const doctorStore = new RedisStore({
    sendCommand: (...args) => redisClient.sendCommand(args),
    prefix: 'rl:doctor:'
})


const authLimiter = rateLimit({
    store: authStore,
    windowMs: 5 * 60 * 1000,
    limit: 10,
    standardHeaders: 'draft-8',
    legacyHeaders: false,
    message: {
        status: 429,
        error: "To many Auth attempts"
    }
});

const adminLimiter = rateLimit({
    store: adminStore,
    windowMs: 10 * 60 * 1000,
    limit: 50,
    standardHeaders: false,
    message: {
        status: 429,
        error: "Admin resource limit reaached try again after some minutes"
    }
})

const petOwnerLimiter = rateLimit({
    store: petOwnerStore,
    windowMs: 10 * 60 * 1000,
    limit: 50,
    standardHeaders: 'draft-8',
    legacyHeaders: false,
    message: {
        status: 429,
        error: "Resource limite Reach Wait for few second"
    }
});

const globalUserLimiter = rateLimit({
    store: globalUserStore,
    windowMs: 10 * 60 * 1000,
    limit: 150,
    legacyHeaders: false,
    standardHeaders: 'draft-8',
    message: {
        status: 429,
        error: "Too many request from this device Please slow down"
    }
});

const doctorLimiter = rateLimit({
    limit: 100,
    windowMs: 10 * 60 * 1000,
    standardHeaders: 'draft-8',
    legacyHeaders: false,
    message: {
        status: 429,
        error: "Too many requests Please wait a minute only then proceed"
    }
})

module.exports = {
    adminLimiter,
    globalUserLimiter,
    authLimiter,
    petOwnerLimiter,
    doctorLimiter
}