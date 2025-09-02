# OptiServe AI - Vercel Deployment Guide

## 🚀 Quick Deploy to Vercel

### Prerequisites
- GitHub account with this repository
- Vercel account (free tier works)
- Google Gemini API key for chatbot functionality

## Overview
This comprehensive guide explains how to deploy OptiServe AI with the AI chatbot and Calendly booking integration working properly in production environments.

## 🌐 Environment Variables Setup

Before deploying, you need to set up the following environment variables in Vercel:

### Required Environment Variables:
```bash
GEMINI_API_KEY=your_actual_gemini_api_key_here
NODE_ENV=production
```

### Optional Environment Variables:
```bash
NEXT_PUBLIC_CALENDLY_URL=https://calendly.com/your-calendly-link
NEXT_PUBLIC_GA_ID=GA_MEASUREMENT_ID
NEXT_PUBLIC_CONTACT_EMAIL=contact@optiserveai.com
NEXT_PUBLIC_PHONE=+250785256553
```

## 🤖 Getting Your Gemini API Key

1. Go to [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Sign in with your Google account
3. Click "Create API Key"
4. Copy the generated API key
5. Add it to your Vercel environment variables as `GEMINI_API_KEY`

## Changes Made for Production Hosting

### 1. AI Chatbot Integration
- **Smart demo logic**: Intelligent demo button display based on user intent
- **Fast responses**: Optimized from 1500ms to 300ms response time
- **Context awareness**: Better conversation memory and flow
- **Error handling**: Graceful fallbacks for API failures
- **Mobile optimized**: Responsive design for all devices

### 2. Enhanced Calendly Integration
- **Improved script loading**: Added robust error handling and retry mechanisms
- **Loading states**: Added loading indicators and error messages for better UX  
- **Fallback options**: If Calendly fails to load, users can open in new window or contact directly
- **TypeScript types**: Added proper type definitions for Calendly integration

### 2. Production Optimizations
- **Resource preloading**: Added preload hints for Calendly scripts and CSS
- **DNS prefetching**: Added DNS prefetch for Calendly domains
- **CSP headers**: Configured Content Security Policy to allow Calendly resources
- **Performance optimization**: Optimized bundle size and loading performance

### 3. Hosting Configuration
- **Vercel config**: Added `vercel.json` with proper headers and CSP policies
- **Next.js config**: Updated with security headers and resource optimization
- **Error handling**: Comprehensive error boundaries and fallback mechanisms

## Deployment Options

### Option 1: Vercel (Recommended)
1. Connect your GitHub repository to Vercel
2. The `vercel.json` configuration is already set up
3. Deploy with automatic SSL and CDN

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel --prod
```

### Option 2: Netlify
1. Build the application:
```bash
npm run build
```

2. Deploy the `out` folder to Netlify
3. Add the following headers to `netlify.toml`:

```toml
[[headers]]
  for = "/*"
  [headers.values]
    Content-Security-Policy = "default-src 'self'; script-src 'self' 'unsafe-eval' 'unsafe-inline' https://assets.calendly.com https://calendly.com; style-src 'self' 'unsafe-inline' https://assets.calendly.com https://calendly.com; img-src 'self' data: https: blob:; font-src 'self' https://assets.calendly.com; connect-src 'self' https://api.calendly.com https://calendly.com wss://calendly.com; frame-src 'self' https://calendly.com; media-src 'self' https://assets.calendly.com; object-src 'none'; base-uri 'self'; form-action 'self' https://calendly.com; frame-ancestors 'self'"
```

### Option 3: Custom Server
If deploying to a custom server, ensure:
1. HTTPS is enabled (required for Calendly)
2. Proper CSP headers are set (see `next.config.ts`)
3. All Calendly domains are allowlisted

## Testing the Integration

### Local Testing
```bash
npm run dev
```
1. Open http://localhost:3000
2. **Test AI Chatbot**:
   - Click the chat bubble in bottom-right corner
   - Send a test message and verify response
   - Test different message types (questions, pricing inquiries)
   - Verify demo button appears appropriately
3. **Test Calendly Integration**:
   - Click "Book Demo" button in chat or main page
   - Verify Calendly widget loads properly
   - Test error handling by blocking calendly.com in browser dev tools

### Production Testing
1. Deploy to your chosen platform
2. **Test AI Chatbot**:
   - Verify chatbot appears and is responsive
   - Test conversation flow and response quality
   - Check mobile responsiveness
   - Verify demo button logic works correctly
3. **Test Calendly Integration**:
   - Test the "Book Demo" functionality
   - Verify:
     - Calendly widget loads without errors
     - Loading states work properly  
     - Error handling displays fallback options
     - Booking process completes successfully

## Troubleshooting

### Chatbot Issues

1. **Chatbot not responding**
   - **Check:** `GEMINI_API_KEY` environment variable is set in Vercel
   - **Verify:** API key is valid and has quota remaining
   - **Solution:** Regenerate API key if needed or check Google AI Studio quota

2. **Chatbot shows error messages**
   - **Check:** Network connectivity to Google's Generative Language API
   - **Verify:** CSP headers allow `generativelanguage.googleapis.com`
   - **Solution:** Check Vercel function logs for detailed error messages

3. **Demo button appears too frequently**
   - **Behavior:** This is normal - the smart logic shows buttons based on user intent
   - **Test:** Try different conversation types (general questions vs pricing inquiries)
   - **Note:** Demo buttons only show for high-intent conversations

4. **Slow chatbot responses**
   - **Expected:** Responses should appear within 1-2 seconds
   - **Check:** Vercel function timeout settings (set to 30 seconds)
   - **Solution:** Monitor API response times and check for rate limiting

### Calendly Issues

1. **Calendly widget not loading**
   - Check browser console for CSP violations
   - Ensure HTTPS is enabled
   - Verify Calendly domains are allowlisted

2. **CSP violations**
   - Update CSP headers to include all required Calendly domains
   - Check `next.config.ts` and deployment platform settings

3. **Widget appears but doesn't function**
   - Verify network connectivity to Calendly APIs
   - Check for JavaScript errors in console
   - Test fallback "Open in New Window" option

### Debug Mode
Add this to your environment variables for detailed logging:
```
NODE_ENV=development
NEXT_PUBLIC_DEBUG_CALENDLY=true
```

## Security Considerations

1. **Content Security Policy**: Properly configured to allow Calendly while blocking other external scripts
2. **HTTPS Required**: Calendly requires HTTPS for iframe embedding
3. **Domain Allowlisting**: Only necessary Calendly domains are allowed
4. **XSS Protection**: Enabled with proper escaping of user content

## Performance Monitoring

Monitor these metrics in production:
- Calendly script load time
- Widget initialization success rate
- User interaction with booking flow
- Error rates and fallback usage

## Contact
For deployment issues or questions:
- Email: kawacukent@gmail.com
- Phone: +250 785 256 553
