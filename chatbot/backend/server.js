const express = require('express');
const cors = require('cors');
const { GoogleGenerativeAI } = require('@google/generative-ai');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;

// Initialize Gemini AI
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, '../frontend')));

// System prompt for OptiServe AI receptionist
const SYSTEM_PROMPT = `You are the AI receptionist for OptiServe AI, a cutting-edge artificial intelligence solutions company. Your role is to be professional, warm, and helpful while guiding visitors through their journey.

Key information about OptiServe AI:
- We provide enterprise AI solutions that optimize business operations
- We specialize in custom AI implementations, process automation, and intelligent analytics
- Our solutions help businesses reduce costs, increase efficiency, and make data-driven decisions
- We offer personalized consultations and demos to understand each client's unique needs

Your personality:
- Professional yet approachable and warm
- Knowledgeable about AI and business optimization
- Enthusiastic about helping potential clients discover how AI can transform their business
- Always guide conversations toward booking a demo when appropriate

Guidelines:
- Keep responses concise but informative
- Always stay in character as OptiServe AI's receptionist
- When visitors show interest in our services or ask about demos, offer the demo booking option
- Answer questions about features, use cases, and benefits clearly
- If asked about specific pricing, mention that pricing is customized based on needs and suggest a demo
- Be encouraging about the potential of AI for their business

Remember: Your goal is to create a positive first impression and guide qualified prospects toward booking a demo consultation.`;

// Chat endpoint
app.post('/chat', async (req, res) => {
    try {
        const { message, conversationHistory = [] } = req.body;

        if (!message) {
            return res.status(400).json({ error: 'Message is required' });
        }

        // Get generative model
        const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

        // Build conversation context
        let conversationContext = SYSTEM_PROMPT + '\n\nConversation history:\n';
        
        // Add previous messages for context
        conversationHistory.forEach((msg, index) => {
            conversationContext += `${msg.role}: ${msg.content}\n`;
        });
        
        conversationContext += `User: ${message}\nAssistant:`;

        // Generate response
        const result = await model.generateContent(conversationContext);
        const response = await result.response;
        const aiReply = response.text();

        // Check if response should include demo booking button
        const shouldShowDemoButton = aiReply.toLowerCase().includes('demo') || 
                                    aiReply.toLowerCase().includes('consultation') ||
                                    aiReply.toLowerCase().includes('meeting') ||
                                    message.toLowerCase().includes('demo') ||
                                    message.toLowerCase().includes('book') ||
                                    message.toLowerCase().includes('schedule');

        res.json({
            reply: aiReply,
            showDemoButton: shouldShowDemoButton,
            timestamp: new Date().toISOString()
        });

    } catch (error) {
        console.error('Error processing chat message:', error);
        res.status(500).json({ 
            error: 'Sorry, I encountered an issue. Please try again.',
            reply: 'I apologize, but I\'m experiencing technical difficulties. Please refresh the page and try again, or contact us directly for assistance.'
        });
    }
});

// Health check endpoint
app.get('/health', (req, res) => {
    res.json({ status: 'OK', service: 'OptiServe AI Chatbot' });
});

// Serve frontend files
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/index.html'));
});

app.listen(PORT, () => {
    console.log(`OptiServe AI Chatbot server running on port ${PORT}`);
    console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
});

module.exports = app;
