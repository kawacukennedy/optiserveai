import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';

// Initialize Gemini AI with environment variable
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

// System prompt for OptiServe AI receptionist
const SYSTEM_PROMPT = `You are Kenneth, the AI receptionist for OptiServe AI, a cutting-edge artificial intelligence solutions company specializing in AI-powered dispatch systems for home service professionals (HVAC, plumbing, electrical).

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
- Natural and conversational - avoid being pushy or repetitive

Guidelines:
- Keep responses concise but informative (2-3 sentences max unless explaining complex topics)
- Always stay in character as OptiServe AI's receptionist
- Be conversational and helpful, focusing on answering the specific question asked
- Only mention demos when the user specifically asks about scheduling, pricing, or expresses strong interest
- Answer questions about features, use cases, and benefits clearly without always pushing for a demo
- If asked about specific pricing, mention that pricing is customized based on business size and needs
- Focus on providing valuable information about our AI dispatch system
- Avoid repetitive phrases and responses - vary your language naturally
- Don't assume every interaction needs to end with a demo offer

Demo offering strategy:
- Only suggest demos when users ask about: pricing, getting started, scheduling a call, or express strong purchase intent
- For general questions about features or benefits, provide helpful information without pushing demos
- Wait for clear buying signals before offering demo booking

Remember: Your goal is to be genuinely helpful and build trust through valuable conversations, not to push demos on every interaction.`;

interface ConversationMessage {
  role: 'user' | 'assistant';
  content: string;
}

interface ChatRequestBody {
  message: string;
  conversationHistory?: ConversationMessage[];
}

// Helper function to calculate if demo button should be displayed
function calculateDemoButtonDisplay(message: string, aiReply: string, conversationHistory: ConversationMessage[]): boolean {
  const lowerMessage = message.toLowerCase();
  const lowerReply = aiReply.toLowerCase();
  
  // Check if demo button was already shown recently
  const recentDemoShown = conversationHistory.slice(-4).some(msg => 
    msg.role === 'assistant' && msg.content.includes('DEMO_BUTTON')
  );
  
  // High-intent keywords that strongly indicate demo interest
  const highIntentKeywords = [
    'pricing', 'cost', 'price', 'how much', 'get started', 'sign up',
    'trial', 'demo', 'schedule', 'book', 'meeting', 'call',
    'interested in', 'want to try', 'ready to'
  ];
  
  // Medium-intent patterns that suggest potential interest
  const mediumIntentPatterns = [
    'how does it work', 'tell me more', 'sounds good', 'that\'s great',
    'impressive', 'helpful', 'exactly what', 'perfect for'
  ];
  
  // Check for high intent in user message or AI mentioning demo/consultation
  const hasHighIntent = highIntentKeywords.some(keyword => 
    lowerMessage.includes(keyword) || lowerReply.includes(keyword)
  );
  
  // Check for medium intent and conversation depth
  const hasMediumIntent = mediumIntentPatterns.some(pattern => 
    lowerMessage.includes(pattern)
  );
  
  // Only show demo button if:
  // 1. High intent is detected, OR
  // 2. Medium intent + conversation is progressing (3+ exchanges) + no recent demo shown
  return !recentDemoShown && (
    hasHighIntent || 
    (hasMediumIntent && conversationHistory.length >= 4)
  );
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

    // Check if client prefers streaming (from Accept header)
    const acceptsStream = request.headers.get('accept')?.includes('text/event-stream');
    
    if (acceptsStream) {
      try {
        // Try streaming approach first
        const result = await model.generateContentStream(conversationContext);
        
        // Create a readable stream
        const encoder = new TextEncoder();
        const stream = new ReadableStream({
          async start(controller) {
            let fullResponse = '';
            
            try {
              for await (const chunk of result.stream) {
                const chunkText = chunk.text();
                fullResponse += chunkText;
                
                // Send chunk to client
                controller.enqueue(encoder.encode(`data: ${JSON.stringify({ 
                  chunk: chunkText,
                  type: 'chunk'
                })}\n\n`));
              }
              
              // Smart demo button logic after full response is generated
              const shouldShowDemoButton = calculateDemoButtonDisplay(message, fullResponse, conversationHistory);
              
              // Send completion data
              controller.enqueue(encoder.encode(`data: ${JSON.stringify({ 
                type: 'complete',
                fullResponse,
                showDemoButton: shouldShowDemoButton,
                timestamp: new Date().toISOString()
              })}\n\n`));
              
              console.log(`Chat streaming: ${message.substring(0, 50)}... -> ${fullResponse.substring(0, 50)}...`);
              
            } catch (error) {
              console.error('Streaming error:', error);
              controller.enqueue(encoder.encode(`data: ${JSON.stringify({ 
                type: 'error',
                error: 'Sorry, I encountered an issue. Please try again.'
              })}\n\n`));
            } finally {
              controller.close();
            }
          }
        });

        return new Response(stream, {
          headers: {
            'Content-Type': 'text/event-stream',
            'Cache-Control': 'no-cache',
            'Connection': 'keep-alive',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'POST, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type, Accept'
          }
        });
      } catch (streamError) {
        console.warn('Streaming failed, falling back to regular response:', streamError);
        // Fall through to regular response
      }
    }

    // Fallback to regular response (for Vercel compatibility)
    const result = await model.generateContent(conversationContext);
    const response = await result.response;
    const aiReply = response.text();

    // Smart demo button logic
    const shouldShowDemoButton = calculateDemoButtonDisplay(message, aiReply, conversationHistory);

    console.log(`Chat regular: ${message.substring(0, 50)}... -> ${aiReply.substring(0, 50)}...`);

    return NextResponse.json({
      reply: aiReply,
      showDemoButton: shouldShowDemoButton,
      timestamp: new Date().toISOString()
    }, {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Accept'
      }
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

// Handle CORS preflight requests
export async function OPTIONS() {
  return new Response(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Accept',
      'Access-Control-Max-Age': '86400'
    }
  });
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
