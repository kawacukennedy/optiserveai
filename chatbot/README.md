# OptiServe AI Chatbot

A professional AI receptionist chatbot for your landing page, built with modern web technologies and Google's Gemini AI.

## Features

- 🤖 **AI-Powered Conversations** - Uses Google Gemini AI for natural, intelligent responses
- 💬 **Modern Chat Interface** - Sleek, dark-themed UI with smooth animations
- 📱 **Fully Responsive** - Works perfectly on desktop, tablet, and mobile
- ⚡ **Real-time Typing** - Shows typing indicators and smooth message animations
- 🎯 **Lead Generation** - Guides visitors to book demos through Cal.com integration
- 🎨 **Customizable Design** - Easy to match your brand colors and style
- 🔒 **Secure Backend** - API keys are safely stored server-side

## Quick Start

### 1. Backend Setup

```bash
cd chatbot
npm install
```

Create `.env` file from the example:
```bash
cp .env.example .env
```

Update your `.env` file with your Gemini API key:
```env
GEMINI_API_KEY=your_actual_api_key_here
PORT=3001
```

Start the server:
```bash
npm run dev
```

### 2. Frontend Integration

Copy the widget files to your web server and include them in your landing page:

```html
<!-- In your <head> section -->
<link rel="stylesheet" href="/chatbot/frontend/css/chat-widget.css">
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">

<!-- Before closing </body> tag -->
<div id="optiserve-chat-widget">
    <!-- Widget HTML (see chat-widget-embed.html for complete code) -->
</div>

<script src="/chatbot/frontend/js/chat-widget.js"></script>
```

### 3. Configuration

Update these settings in the code:

1. **Cal.com Link** - In `frontend/js/chat-widget.js`, update the booking URL:
   ```javascript
   button.href = 'https://cal.com/your-actual-calendar-link';
   ```

2. **API Endpoint** - If backend runs on different domain, update in `chat-widget.js`:
   ```javascript
   this.apiEndpoint = 'https://your-backend-domain.com/chat';
   ```

3. **Brand Colors** - Customize CSS variables in `chat-widget.css`:
   ```css
   :root {
       --primary-color: #your-brand-color;
       --primary-hover: #your-hover-color;
   }
   ```

## Project Structure

```
chatbot/
├── backend/
│   └── server.js          # Express server with Gemini AI integration
├── frontend/
│   ├── css/
│   │   └── chat-widget.css    # Modern styling with dark theme
│   ├── js/
│   │   └── chat-widget.js     # Interactive chat functionality
│   ├── index.html             # Demo page
│   └── chat-widget-embed.html # Integration guide
├── package.json           # Dependencies and scripts
├── .env.example          # Environment variables template
└── README.md             # This file
```

## API Endpoints

### POST /chat
Handles chat messages and returns AI responses.

**Request:**
```json
{
  "message": "Hello, tell me about your services",
  "conversationHistory": [
    {"role": "user", "content": "Previous message"},
    {"role": "assistant", "content": "Previous response"}
  ]
}
```

**Response:**
```json
{
  "reply": "AI response text",
  "showDemoButton": true,
  "timestamp": "2024-01-01T12:00:00.000Z"
}
```

### GET /health
Returns server status for monitoring.

## Customization

### Chat Behavior
The AI receptionist is configured to:
- Be professional, warm, and helpful
- Guide conversations toward demo bookings
- Answer questions about OptiServe AI services
- Maintain context throughout the conversation

### Styling
The widget uses CSS custom properties for easy theming:
```css
:root {
    --primary-color: #6366f1;      /* Main brand color */
    --primary-hover: #5855eb;      /* Hover state color */
    --bg-dark: #0f0f1a;           /* Dark background */
    --bg-secondary: #1a1a2e;      /* Secondary background */
    --text-primary: #ffffff;       /* Primary text color */
    --border-radius: 16px;         /* Rounded corners */
}
```

### Mobile Optimization
The widget automatically adapts to mobile devices:
- Full-screen chat panel on mobile
- Touch-friendly controls
- Optimized typography sizes
- Responsive animations

## Deployment

### Development
```bash
npm run dev  # Uses nodemon for auto-restart
```

### Production
```bash
npm start    # Runs server in production mode
```

### Environment Variables
- `GEMINI_API_KEY` - Your Google Gemini AI API key (required)
- `PORT` - Server port (default: 3001)
- `NODE_ENV` - Environment (development/production)

## Browser Support

- Chrome/Edge 88+
- Firefox 85+
- Safari 14+
- Mobile Safari 14+
- Android Chrome 88+

## Performance

- Lightweight footprint (~50KB total)
- Lazy loading of AI responses
- Efficient message batching
- Optimized animations with CSS transforms

## Security Features

- API key stored securely server-side
- Input validation and sanitization
- XSS protection for chat messages
- CORS configuration for domain security

## Analytics Integration

The widget includes built-in event tracking:
```javascript
// Track chat events
trackEvent('chat_opened');
trackEvent('message_sent_user');
trackEvent('demo_button_clicked');
```

Integrates with:
- Google Analytics 4
- Custom analytics platforms
- Event tracking systems

## Troubleshooting

### Common Issues

1. **Chat bubble not appearing**
   - Check console for JavaScript errors
   - Verify CSS file is loading
   - Ensure HTML structure is correct

2. **No AI responses**
   - Check backend server is running
   - Verify Gemini API key is set
   - Check network tab for API errors

3. **Styling issues**
   - Clear browser cache
   - Check CSS custom properties
   - Verify font loading

4. **CORS errors**
   - Update CORS settings in server.js
   - Check domain configuration
   - Verify API endpoint URLs

### Debug Mode
Enable debug logging by adding to localStorage:
```javascript
localStorage.setItem('optiserve-debug', 'true');
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

MIT License - feel free to modify and use for your projects.

## Support

For technical support or questions:
- Check the troubleshooting section
- Review the integration guide
- Contact the development team

---

**Built with ❤️ for OptiServe AI**
