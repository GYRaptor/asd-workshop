const { clearCache } = require('./cacheMiddleware');

function invalidateCache(req, res, next) {
    res.on('finish', () => {
        if (res.statusCode >= 200 && res.statusCode < 300) {
            clearCache();
        }
    });

    next();
}

module.exports = invalidateCache;