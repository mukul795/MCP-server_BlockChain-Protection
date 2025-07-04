// File: server.js
const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const { ethers } = require('ethers');

const app = express();
const PORT = 4000;
const JWT_SECRET = 'super-secret-key';

app.use(cors());
app.use(express.json());

const nonces = {}; // Temporarily store nonces

// Route 1: Get nonce for address
app.get('/auth/nonce/:address', (req, res) => {
  const address = req.params.address.toLowerCase();
  const nonce = Math.floor(Math.random() * 1000000).toString();
  nonces[address] = nonce;
  res.json({ nonce });
});

// Route 2: Verify signature and issue token
app.post('/auth/verify', (req, res) => {
  const { address, signature } = req.body;
  const nonce = nonces[address.toLowerCase()];

  if (!nonce) return res.status(400).json({ error: 'Nonce not found' });

  try {
    const recoveredAddress = ethers.utils.verifyMessage(nonce, signature).toLowerCase();
    if (recoveredAddress !== address.toLowerCase()) {
      return res.status(401).json({ error: 'Signature mismatch' });
    }

    delete nonces[address.toLowerCase()];
    const token = jwt.sign({ address }, JWT_SECRET, { expiresIn: '1h' });
    res.json({ token });
  } catch (error) {
    res.status(500).json({ error: 'Verification failed' });
  }
});

// Auth middleware
function requireAuth(req, res, next) {
  const token = req.headers['authorization']?.split(' ')[1];
  if (!token) return res.status(401).json({ error: 'Token required' });

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch {
    res.status(403).json({ error: 'Invalid token' });
  }
}

// Protected route example
app.get('/protected', requireAuth, (req, res) => {
  res.json({ message: 'Access granted', user: req.user });
});

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));