const crypto = require('crypto');

function hashLogEntry(logEntry) {
  const hash = crypto.createHash('sha256').update(JSON.stringify(logEntry)).digest('hex');
  return hash;
}

module.exports = (req, res, next) => {
  const user = req.user?.id || req.user?.address || 'anonymous';
  const logEntry = {
    user,
    tool: req.originalUrl,
    timestamp: new Date().toISOString(),
    ip: req.ip,
    method: req.method,
  };

  const hash = hashLogEntry(logEntry);
  req.contextLog = { ...logEntry, hash };

  console.log(`[LOG] ${logEntry.timestamp} | ${user} | ${req.method} ${req.originalUrl} | Hash: ${hash}`);

  // Optionally: Push `logEntry` + `hash` to blockchain or IPFS here
  next();
};
