const wafMiddleware = require('./middleware/waf');
const requireAuth = require('./middleware/auth');

const crypto = require('crypto');
// Simulated blockchain logger (real implementation would push to Ethereum or IPFS)
function logToBlockchain(data) {
  const hash = crypto.createHash('sha256').update(JSON.stringify(data)).digest('hex');
  console.log(`[BLOCKCHAIN LOG] Hash: ${hash}`);
  // TODO: Push to smart contract or IPFS
}

const wafPatterns = [
  /<script.*?>.*?<\/script>/gi,       // XSS
  /('|").*?(--|\bOR\b|\bAND\b).*?('|")/gi, // SQLi
  /rm\s+-rf\s+\//gi,                  // Shell attack
];

module.exports = (req, res, next) => {
  const body = JSON.stringify(req.body);
  const query = JSON.stringify(req.query);
  const headers = JSON.stringify(req.headers);

  for (const pattern of wafPatterns) {
    if (pattern.test(body) || pattern.test(query) || pattern.test(headers)) {
      const logEntry = {
        address: req.user?.address || 'unknown',
        route: req.originalUrl,
        time: new Date().toISOString(),
        type: 'WAF_VIOLATION',
        body,
        query,
      };

      logToBlockchain(logEntry);

      return res.status(403).json({ error: 'Blocked by WAF: Suspicious input detected' });
    }
  }

  next();
};
