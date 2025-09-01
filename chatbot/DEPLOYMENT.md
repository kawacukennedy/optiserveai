# OptiServe AI Chatbot - Deployment Guide

## ✅ Setup Complete!

Your OptiServe AI chatbot is now ready for deployment. All tests have passed and the system is configured correctly.

## 🚀 Quick Start

### 1. Start the Backend Server

```bash
cd chatbot
npm start
```

The server will start on port 3001 and you'll see:
```
OptiServe AI Chatbot server running on port 3001
Environment: development
```

### 2. Test the Chat Widget

Open your browser and go to: `http://localhost:3001`

You'll see the demo page with the chat bubble in the bottom-right corner. Click it to test the chat functionality.

## 📝 Integration with Your Landing Page

### Method 1: Copy Widget Files

1. Copy the entire `frontend` folder to your web server
2. Add the following to your landing page:

```html
<!-- In your <head> section -->
<link rel="stylesheet" href="/chatbot/frontend/css/chat-widget.css">
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">

<!-- Before closing </body> tag -->
<div id="optiserve-chat-widget">
    <!-- Copy the entire widget HTML from frontend/chat-widget-embed.html -->
</div>

<script src="/chatbot/frontend/js/chat-widget.js"></script>
```

### Method 2: CDN-Style Integration

Host the chatbot files on your server and reference them:

```html
<link rel="stylesheet" href="https://yourdomain.com/chatbot/frontend/css/chat-widget.css">
<script src="https://yourdomain.com/chatbot/frontend/js/chat-widget.js"></script>
```

## ⚙️ Configuration

### Update Cal.com Booking Link

1. Edit `frontend/js/chat-widget.js`
2. Find the `createDemoButton()` method
3. Replace the placeholder URL with your actual Cal.com link:

```javascript
button.href = 'https://cal.com/your-actual-calendar-link';
```

### Customize Brand Colors

Add custom CSS variables to match your brand:

```css
:root {
    --primary-color: #your-brand-color;
    --primary-hover: #your-brand-hover-color;
    --bg-dark: #your-background-color;
}
```

### Update API Endpoint

If your backend is on a different domain, update in `chat-widget.js`:

```javascript
this.apiEndpoint = 'https://your-backend-domain.com/chat';
```

## 🌐 Production Deployment

### Backend Server

1. **Environment Setup:**
```bash
NODE_ENV=production
GEMINI_API_KEY=your_actual_api_key
PORT=3001
```

2. **Process Manager (PM2):**
```bash
npm install -g pm2
pm2 start backend/server.js --name "optiserve-chatbot"
pm2 startup
pm2 save
```

3. **Nginx Reverse Proxy:**
```nginx
location /chat {
    proxy_pass http://localhost:3001;
    proxy_http_version 1.1;
    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Connection 'upgrade';
    proxy_set_header Host $host;
    proxy_cache_bypass $http_upgrade;
}
```

### Frontend Assets

Deploy the frontend files to your web server or CDN:

```bash
# Copy to web server
cp -r frontend/* /var/www/html/chatbot/

# Or upload to CDN
aws s3 sync frontend/ s3://your-bucket/chatbot/
```

## 📊 Monitoring

### Health Check

The server includes a health check endpoint:
```
GET /health
```

Returns:
```json
{
    "status": "OK",
    "service": "OptiServe AI Chatbot"
}
```

### Logs

Server logs include:
- Chat message processing
- API errors
- Connection status

### Analytics

The widget tracks these events:
- `chat_opened`
- `chat_closed`
- `message_sent_user`
- `message_sent_ai`
- `demo_button_clicked`

## 🔧 Troubleshooting

### Common Issues

1. **Chat not responding:**
   - Check backend server is running
   - Verify Gemini API key is correct
   - Check browser console for errors

2. **Styling issues:**
   - Ensure CSS file is loading
   - Check for CSS conflicts
   - Verify font loading

3. **CORS errors:**
   - Update CORS settings in server.js
   - Check domain configuration

### Debug Mode

Enable debug logging:
```javascript
localStorage.setItem('optiserve-debug', 'true');
```

## 📱 Mobile Optimization

The chatbot is fully responsive and includes:
- Touch-friendly controls
- Mobile-specific layouts
- Optimized animations
- Accessible design

## 🔒 Security

- API key stored server-side only
- Input sanitization
- XSS protection
- CORS configuration

## 📈 Performance

- Lightweight footprint (~50KB)
- Lazy loading
- Efficient animations
- Message batching

## 🎯 Features Summary

✅ **AI-Powered Conversations** - Google Gemini AI integration  
✅ **Modern UI** - Dark theme with smooth animations  
✅ **Responsive Design** - Works on all devices  
✅ **Lead Generation** - Cal.com demo booking integration  
✅ **Professional Personality** - Warm, helpful AI receptionist  
✅ **Easy Customization** - Brand colors and styling  
✅ **Analytics Ready** - Built-in event tracking  
✅ **Production Ready** - Secure, scalable architecture  

## 🔄 Updates

To update the chatbot:

1. Pull latest changes
2. Run `npm install` for new dependencies
3. Restart the server
4. Update frontend files if needed

## 💡 Next Steps

1. **Test thoroughly** on your landing page
2. **Customize the branding** to match your design
3. **Update the Cal.com link** with your booking page
4. **Monitor usage** through analytics
5. **Optimize responses** based on user feedback

---

🎉 **Your OptiServe AI chatbot is ready to transform visitor engagement on your landing page!**

For support or questions, refer to the README.md file or contact the development team.
