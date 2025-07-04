const express = require('express');
const helmet = require('helmet');
const morgan = require('morgan');

const auth = require('./middleware/auth');
const rateLimit = require('./middleware/rateLimit');
const waf = require('./middleware/waf');
const logger = require('./middleware/logger');
const blockchain = require('./blockchain/localChain');

const app = express();
app.use(helmet());
app.use(express.json());
app.use(morgan('dev'));

app.post('/run-tool', auth, rateLimit, waf, logger, (req, res) => {
  const result = "Model Output Here";

  const log = {
    ...req.contextLog,
    result,
    versionHash: require('crypto').createHash('sha256').update("tool-v1.0.0").digest('hex')
  };

  const block = blockchain.addBlock(log);
  res.json({ result, block });
});

app.get('/chain', (req, res) => {
  res.json(blockchain.getChain());
});

app.listen(3000, () => console.log('🚀 Server on http://localhost:3000'));
