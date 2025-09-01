import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';

// Initialize Gemini AI
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

// System prompt for OptiServe AI receptionist
const SYSTEM_PROMPT = `You are the AI receptionist for OptiServe AI, a cutting-edge artificial intelligence solutions company specializing in AI-powered dispatch systems for home service professionals (HVAC, plumbing, electrical).

Key information about OptiServe AI:
- We provide AI-powered dispatch automation for home service businesses
- Our AI handles customer calls, qualifies leads, schedules appointments, and dispatches technicians 24/7
- We help HVAC, plumbing, and electrical companies win more jobs and improve customer satisfaction
- Our solutions reduce operational costs and increase revenue through intelligent automation
- We offer personalized consultations and demos to understand each client's unique needs

Your personality:
- Professional yet approachable and warm
- Knowledgeable about AI automation and home service business operations
- Enthusiastic about helping business owners discover how AI can transform their operations
- Always guide conversations toward booking a demo when appropriate

Guidelines:
- Keep responses concise but informative (2-3 sentences max unless explaining complex topics)
- Always stay in character as OptiServe AI's receptionist
- When visitors show interest in our services or ask about demos, offer the demo booking option
- Answer questions about features, use cases, and benefits clearly
- If asked about specific pricing, mention that pricing is customized based on business size and needs, and suggest a demo
- Focus on how our AI dispatch system helps home service businesses grow
- Be encouraging about the potential of AI for their business

Remember: Your goal is to create a positive first impression and guide qualified prospects toward booking a demo consultation.`;

interface ConversationMessage {
  role: 'user' | 'assistant';
  content: string;
}

interface ChatRequestBody {
  message: string;
  conversationHistory?: ConversationMessage[];
}

export async function POST(request: NextRequest) {
  try {
    if (!process.env.GEMINI_API_KEY) {
      console.error('GEMINI_API_KEY is not configured');
      return NextResponse.json(
        { 
          error: 'Server configuration error',
          reply: 'I apologize, but I\'m experiencing technical difficulties. Please contact us directly for assistance.' 
        },
        { status: 500 }
      );
    }

    const body: ChatRequestBody = await request.json();
    const { message, conversationHistory = [] } = body;

    if (!message || typeof message !== 'string') {
      return NextResponse.json(
        { error: 'Message is required and must be a string' },
        { status: 400 }
      );
    }

    // Get generative model
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

    // Build conversation context
    let conversationContext = SYSTEM_PROMPT + '\n\nConversation history:\n';
    
    // Add previous messages for context
    conversationHistory.forEach((msg) => {
      conversationContext += `${msg.role === 'user' ? 'User' : 'Assistant'}: ${msg.content}\n`;
    });
    
    conversationContext += `User: ${message}\nAssistant:`;

    // Generate response
    const result = await model.generateContent(conversationContext);
    const response = await result.response;
    const aiReply = response.text();

    // Check if response should include demo booking button
    const lowerMessage = message.toLowerCase();
    const lowerReply = aiReply.toLowerCase();
    
    const shouldShowDemoButton = 
      lowerReply.includes('demo') || 
      lowerReply.includes('consultation') ||
      lowerReply.includes('meeting') ||
      lowerReply.includes('schedule') ||
      lowerReply.includes('book') ||
      lowerMessage.includes('demo') ||
      lowerMessage.includes('book') ||
      lowerMessage.includes('schedule') ||
      lowerMessage.includes('pricing') ||
      lowerMessage.includes('cost') ||
      lowerMessage.includes('price');

    // Log for monitoring (remove in production)
    console.log(`Chat interaction: ${message.substring(0, 50)}... -> ${aiReply.substring(0, 50)}...`);

    return NextResponse.json({
      reply: aiReply,
      showDemoButton: shouldShowDemoButton,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('Error processing chat message:', error);
    
    // Return user-friendly error
    return NextResponse.json(
      {
        error: 'Sorry, I encountered an issue. Please try again.',
        reply: 'I apologize, but I\'m experiencing technical difficulties. Please refresh the page and try again, or contact us directly for assistance.',
        showDemoButton: false,
        timestamp: new Date().toISOString()
      },
      { status: 500 }
    );
  }
}

// Handle unsupported methods
export async function GET() {
  return NextResponse.json(
    { error: 'Method not allowed. Use POST to send chat messages.' },
    { status: 405 }
  );
}

export async function PUT() {
  return NextResponse.json(
    { error: 'Method not allowed. Use POST to send chat messages.' },
    { status: 405 }
  );
}

export async function DELETE() {
  return NextResponse.json(
    { error: 'Method not allowed. Use POST to send chat messages.' },
    { status: 405 }
  );
}
