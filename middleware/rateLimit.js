const requireAuth = require('./middleware/auth');
const blockchainRateLimit = require('./middleware/blockchainRateLimit');
const rateLimitMap = new Map();

const RATE_LIMIT_WINDOW = 60 * 1000; // 1 minute
const MAX_REQUESTS = 10;

module.exports = (req, res, next) => {
  const address = req.user?.address?.toLowerCase();
  if (!address) return res.status(401).json({ error: 'Blockchain auth required' });

  const now = Date.now();
  const record = rateLimitMap.get(address) || { count: 0, startTime: now };

  if (now - record.startTime < RATE_LIMIT_WINDOW) {
    if (record.count >= MAX_REQUESTS) {
      return res.status(429).json({ error: 'Rate limit exceeded. Slow down.' });
    }
    record.count += 1;
  } else {
    // reset window
    record.count = 1;
    record.startTime = now;
  }

  rateLimitMap.set(address, record);
  next();
};
