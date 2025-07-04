const crypto = require('crypto');

const chain = [];

function hashData(data) {
  return crypto.createHash('sha256').update(JSON.stringify(data)).digest('hex');
}

function addBlock(data) {
  const previousHash = chain.length ? chain[chain.length - 1].hash : '0';
  const block = {
    index: chain.length + 1,
    timestamp: new Date().toISOString(),
    data,
    previousHash,
    hash: ''
  };
  block.hash = hashData(block);
  chain.push(block);
  return block;
}

function getChain() {
  return chain;
}

module.exports = { addBlock, getChain };
