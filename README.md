# 🛡️ MCP-server_BlockChain-Protection

### A Zero-Trust Security Framework for Model Context Protocol (MCP) Using Blockchain Auditing

![License](https://img.shields.io/badge/license-MIT-green.svg)
![Status](https://img.shields.io/badge/status-Research%20Prototype-blue)
![Tech](https://img.shields.io/badge/blockchain-Hyperledger%20%7C%20Ethereum-orange)

## 📄 About the Project

This project implements a **layered AI security architecture** for the [Model Context Protocol (MCP)](https://www.anthropic.com/news/model-context-protocol), integrating **blockchain-based audit logging** to address modern AI threat vectors such as:

- Tool poisoning
- Command injection
- Token theft
- Sandbox escapes
- Version downgrade attacks

The framework follows **NIST SP 800-207 Zero Trust Architecture** and includes:

- 🧠 Context-aware WAF rules
- 🔑 OAuth 2.1 with PKCE + JWT auth
- 📊 Blockchain logging (IPFS + Merkle tree + Ethereum testnet)
- ✅ Formal protocol verification (π-calculus under Dolev-Yao)

---

## 📘 Included Paper

> 📥 [`IEEE Research Paper`](./IEEE{Research%20paper%20}.pdf)

We have documented the full design, threat model, and validation in an IEEE-format paper:
**“MCP Security Architecture: Layered AI Defense with Blockchain Logging”**

Read it to explore:
- Theoretical threat modeling
- Formal validation with π-calculus
- Real-world case studies
- 38% improvement in tamper detection vs. OAuth2 systems

---

## 🔧 Features

- ✅ **Zero Trust Middleware** (WAF, rate-limiting, microsegmentation)
- ⛓️ **Blockchain Audit Logs** (Ethereum / Hyperledger Fabric)
- 🧪 **Formal Security Verification**
- 📦 Sigstore-based installer validation
- 📉 <15ms average system latency with full logging

---

## 📂 Project Structure
├── middleware/
│ ├── waf.js
│ ├── auth.js
│ ├── blockchainRateLimit.js
├── models/
├── utils/
├── app.js
├── README.md
└── IEEE{Research paper }.pdf
