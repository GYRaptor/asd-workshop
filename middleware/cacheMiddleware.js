const cache = new Map();

const TTL = 60 * 1000;

function cacheMiddleware(req, res, next) {
    const key = req.originalUrl;

    const cached = cache.get(key);

    if (cached) {
        const age = Date.now() - cached.createdAt;

        if (age < TTL) {
            res.set('X-Cache', 'HIT');
            return res.json(cached.data);
        }

        cache.delete(key);
    }

    res.set('X-Cache', 'MISS');

    res.locals.cacheKey = key;

    res.locals.saveToCache = (data) => {
        cache.set(key, {
            data: data,
            createdAt: Date.now()
        });
    };

    next();
}

function clearCache() {
    cache.clear();
}

module.exports = {
    cacheMiddleware,
    clearCache
};