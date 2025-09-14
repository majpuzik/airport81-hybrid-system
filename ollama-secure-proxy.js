const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const cors = require('cors');
const app = express();

// Konfigurace
const API_KEY = process.env.OLLAMA_API_KEY || 'your-secret-api-key-here';
const OLLAMA_URL = process.env.OLLAMA_URL || 'http://localhost:11434';
const PORT = process.env.PORT || 3456;
const ALLOWED_ORIGINS = process.env.ALLOWED_ORIGINS?.split(',') || ['https://your-website.com'];

// CORS konfigurace
app.use(cors({
    origin: ALLOWED_ORIGINS,
    credentials: true
}));

// API key middleware
app.use((req, res, next) => {
    const apiKey = req.headers['x-api-key'] || req.query.api_key;
    
    if (apiKey !== API_KEY) {
        return res.status(401).json({ error: 'Unauthorized' });
    }
    
    next();
});

// Rate limiting
const rateLimit = require('express-rate-limit');
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minut
    max: 100 // limit 100 požadavků
});
app.use(limiter);

// Proxy k Ollama
app.use('/', createProxyMiddleware({
    target: OLLAMA_URL,
    changeOrigin: true,
    ws: true,
    onProxyReq: (proxyReq, req, res) => {
        // Odstranit API key z hlaviček před předáním Ollama
        delete proxyReq.headers['x-api-key'];
    }
}));

app.listen(PORT, () => {
    console.log(`Secure Ollama proxy listening on port ${PORT}`);
    console.log(`Proxying to: ${OLLAMA_URL}`);
    console.log(`CORS allowed origins: ${ALLOWED_ORIGINS.join(', ')}`);
});

// Použití z webové stránky:
// fetch('https://your-server.com:3456/api/generate', {
//     method: 'POST',
//     headers: {
//         'Content-Type': 'application/json',
//         'x-api-key': 'your-secret-api-key-here'
//     },
//     body: JSON.stringify({
//         model: 'llama3.2',
//         prompt: 'Hello from web'
//     })
// })