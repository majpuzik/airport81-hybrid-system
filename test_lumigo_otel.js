// Test Lumigo OpenTelemetry with LiteLLM

const lumigo = require('@lumigo/opentelemetry');
const axios = require('axios');
const express = require('express');

// Create Express app
const app = express();
app.use(express.json());

// Configuration
const LITELLM_URL = 'http://localhost:4000';
const LITELLM_KEY = 'sk-1234567890abcdef';

// Test endpoint that calls LiteLLM
app.post('/test-chat', async (req, res) => {
    console.log('📨 Received request for chat completion');
    
    try {
        const { message = 'Hello, how are you?', model = 'mistral-7b' } = req.body;
        
        console.log(`🤖 Using model: ${model}`);
        console.log(`💬 Message: ${message}`);
        
        // Call LiteLLM API
        const response = await axios.post(
            `${LITELLM_URL}/v1/chat/completions`,
            {
                model: model,
                messages: [
                    { role: 'user', content: message }
                ],
                temperature: 0.7,
                max_tokens: 500
            },
            {
                headers: {
                    'Authorization': `Bearer ${LITELLM_KEY}`,
                    'Content-Type': 'application/json'
                }
            }
        );
        
        const aiResponse = response.data.choices[0].message.content;
        console.log(`✅ AI Response: ${aiResponse.substring(0, 100)}...`);
        
        res.json({
            success: true,
            model: model,
            response: aiResponse,
            usage: response.data.usage
        });
        
    } catch (error) {
        console.error('❌ Error:', error.message);
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
});

// Health check endpoint
app.get('/health', (req, res) => {
    res.json({ 
        status: 'healthy', 
        service: 'lumigo-otel-test',
        litellm: LITELLM_URL 
    });
});

// Start server
const PORT = 3333;
app.listen(PORT, () => {
    console.log(`
╔══════════════════════════════════════════════╗
║     Lumigo OpenTelemetry Test Server        ║
╚══════════════════════════════════════════════╝

🚀 Server running on http://localhost:${PORT}

📊 Endpoints:
   • GET  /health      - Health check
   • POST /test-chat   - Test LiteLLM with tracing

📝 Test with:
   curl -X POST http://localhost:${PORT}/test-chat \\
     -H "Content-Type: application/json" \\
     -d '{"message": "What is OpenTelemetry?", "model": "mistral-7b"}'

🔍 OpenTelemetry tracing: ${process.env.LUMIGO_TRACER_TOKEN ? 'ENABLED' : 'LOCAL MODE (no token)'}
    `);
});