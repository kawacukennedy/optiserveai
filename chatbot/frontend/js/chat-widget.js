/**
 * OptiServe AI Chat Widget
 * Interactive chat functionality with typing indicators, smooth animations, and demo booking
 */

class OptiServeChatWidget {
    constructor() {
        this.conversationHistory = [];
        this.isOpen = false;
        this.isTyping = false;
        this.apiEndpoint = '/chat';
        
        this.initializeElements();
        this.bindEvents();
        this.initializeChat();
    }

    initializeElements() {
        this.chatBubble = document.getElementById('chat-bubble');
        this.chatPanel = document.getElementById('chat-panel');
        this.chatMessages = document.getElementById('chat-messages');
        this.chatForm = document.getElementById('chat-form');
        this.chatInput = document.getElementById('chat-input');
        this.sendButton = document.getElementById('send-button');
        this.closeButton = document.getElementById('close-chat');
        this.typingIndicator = document.getElementById('typing-indicator');
    }

    bindEvents() {
        // Chat bubble click
        this.chatBubble.addEventListener('click', () => this.toggleChat());
        
        // Close button click
        this.closeButton.addEventListener('click', () => this.closeChat());
        
        // Form submission
        this.chatForm.addEventListener('submit', (e) => this.handleSubmit(e));
        
        // Input focus/blur effects
        this.chatInput.addEventListener('focus', () => this.onInputFocus());
        this.chatInput.addEventListener('blur', () => this.onInputBlur());
        
        // Enter key handling
        this.chatInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                this.handleSubmit(e);
            }
        });

        // Click outside to close (optional)
        document.addEventListener('click', (e) => {
            if (this.isOpen && !this.chatPanel.contains(e.target) && !this.chatBubble.contains(e.target)) {
                // Uncomment the line below if you want click-outside-to-close functionality
                // this.closeChat();
            }
        });

        // Escape key to close
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.isOpen) {
                this.closeChat();
            }
        });
    }

    initializeChat() {
        // Set initial focus when opening
        this.chatInput.focus();
    }

    toggleChat() {
        if (this.isOpen) {
            this.closeChat();
        } else {
            this.openChat();
        }
    }

    openChat() {
        this.isOpen = true;
        this.chatPanel.style.display = 'flex';
        this.chatPanel.classList.remove('closing');
        this.chatPanel.classList.add('opening', 'active');
        
        // Focus input after animation
        setTimeout(() => {
            this.chatInput.focus();
            this.scrollToBottom();
        }, 100);

        // Hide bubble pulse when chat is open
        this.chatBubble.style.opacity = '0.8';
        
        // Track opening event (for analytics if needed)
        this.trackEvent('chat_opened');
    }

    closeChat() {
        this.isOpen = false;
        this.chatPanel.classList.remove('opening', 'active');
        this.chatPanel.classList.add('closing');
        
        setTimeout(() => {
            this.chatPanel.style.display = 'none';
            this.chatPanel.classList.remove('closing');
        }, 300);

        // Show bubble pulse again
        this.chatBubble.style.opacity = '1';
        
        // Track closing event
        this.trackEvent('chat_closed');
    }

    async handleSubmit(e) {
        e.preventDefault();
        
        const message = this.chatInput.value.trim();
        if (!message || this.isTyping) return;

        // Add user message to chat
        this.addMessage(message, 'user');
        this.chatInput.value = '';
        
        // Update conversation history
        this.conversationHistory.push({ role: 'user', content: message });
        
        // Show typing indicator
        this.showTypingIndicator();
        
        // Disable input while processing
        this.setInputState(false);

        try {
            // Send message to backend
            const response = await this.sendMessageToAPI(message);
            
            // Hide typing indicator
            this.hideTypingIndicator();
            
            // Add AI response
            await this.addAIMessage(response.reply, response.showDemoButton);
            
            // Update conversation history
            this.conversationHistory.push({ role: 'assistant', content: response.reply });
            
        } catch (error) {
            console.error('Chat error:', error);
            this.hideTypingIndicator();
            this.addMessage('Sorry, I encountered an issue. Please try again.', 'ai');
        } finally {
            // Re-enable input
            this.setInputState(true);
            this.chatInput.focus();
        }
    }

    async sendMessageToAPI(message) {
        const response = await fetch(this.apiEndpoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                message: message,
                conversationHistory: this.conversationHistory.slice(-10) // Keep last 10 messages for context
            }),
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        return await response.json();
    }

    addMessage(content, sender) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${sender}-message`;
        
        const messageContent = document.createElement('div');
        messageContent.className = 'message-content';
        messageContent.innerHTML = this.formatMessage(content);
        
        messageDiv.appendChild(messageContent);
        this.chatMessages.appendChild(messageDiv);
        
        this.scrollToBottom();
        
        // Track message event
        this.trackEvent(`message_sent_${sender}`, { content_length: content.length });
    }

    async addAIMessage(content, showDemoButton = false) {
        const messageDiv = document.createElement('div');
        messageDiv.className = 'message ai-message';
        
        const messageContent = document.createElement('div');
        messageContent.className = 'message-content';
        
        // Type out the message character by character
        await this.typeMessage(messageContent, content);
        
        // Add demo button if needed
        if (showDemoButton) {
            const demoButton = this.createDemoButton();
            messageContent.appendChild(demoButton);
        }
        
        messageDiv.appendChild(messageContent);
        this.chatMessages.appendChild(messageDiv);
        
        this.scrollToBottom();
    }

    async typeMessage(element, text) {
        const formattedText = this.formatMessage(text);
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = formattedText;
        const textContent = tempDiv.textContent || tempDiv.innerText || '';
        
        element.innerHTML = '';
        
        // Type out character by character
        for (let i = 0; i < textContent.length; i++) {
            await new Promise(resolve => setTimeout(resolve, 20)); // Typing speed
            element.textContent = textContent.substring(0, i + 1);
            this.scrollToBottom();
        }
        
        // Set final formatted content
        element.innerHTML = formattedText;
    }

    createDemoButton() {
        const button = document.createElement('a');
        button.href = 'https://cal.com/your-calendar-link'; // Replace with your actual Cal.com link
        button.target = '_blank';
        button.className = 'demo-button';
        button.innerHTML = `
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M8 1V15M1 8H15" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
            </svg>
            Book Demo
        `;
        
        // Track demo button clicks
        button.addEventListener('click', () => {
            this.trackEvent('demo_button_clicked');
        });
        
        return button;
    }

    formatMessage(content) {
        // Convert line breaks to paragraphs
        return content
            .split('\n')
            .filter(line => line.trim())
            .map(line => `<p>${this.escapeHtml(line)}</p>`)
            .join('');
    }

    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    showTypingIndicator() {
        this.isTyping = true;
        this.typingIndicator.classList.add('active');
        this.scrollToBottom();
    }

    hideTypingIndicator() {
        this.isTyping = false;
        this.typingIndicator.classList.remove('active');
    }

    setInputState(enabled) {
        this.chatInput.disabled = !enabled;
        this.sendButton.disabled = !enabled;
        
        if (enabled) {
            this.chatInput.focus();
        }
    }

    onInputFocus() {
        // Visual feedback when input is focused
        this.chatInput.parentElement.style.borderColor = 'var(--primary-color)';
    }

    onInputBlur() {
        // Reset border when input loses focus
        this.chatInput.parentElement.style.borderColor = 'var(--border-color)';
    }

    scrollToBottom() {
        // Smooth scroll to bottom with slight delay for better UX
        setTimeout(() => {
            this.chatMessages.scrollTop = this.chatMessages.scrollHeight;
        }, 50);
    }

    trackEvent(eventName, properties = {}) {
        // Basic event tracking - you can integrate with your analytics platform
        console.log('Chat Event:', eventName, properties);
        
        // Example: Google Analytics 4
        if (typeof gtag !== 'undefined') {
            gtag('event', eventName, {
                event_category: 'chat_widget',
                ...properties
            });
        }
        
        // Example: Other analytics platforms
        if (typeof analytics !== 'undefined') {
            analytics.track(eventName, {
                category: 'chat_widget',
                ...properties
            });
        }
    }

    // Public method to programmatically send a message
    sendMessage(message) {
        this.chatInput.value = message;
        this.handleSubmit(new Event('submit'));
    }

    // Public method to check if chat is open
    ischatOpen() {
        return this.isOpen;
    }

    // Public method to clear conversation
    clearConversation() {
        this.conversationHistory = [];
        const messages = this.chatMessages.querySelectorAll('.message:not(.welcome-message .message)');
        messages.forEach(msg => msg.remove());
    }
}

// Widget Integration Helper
class ChatWidgetIntegration {
    constructor() {
        this.widget = null;
    }

    // Initialize the chat widget
    init(config = {}) {
        // Wait for DOM to be ready
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.createWidget(config));
        } else {
            this.createWidget(config);
        }
    }

    createWidget(config) {
        // Only create if widget doesn't exist
        if (document.getElementById('optiserve-chat-widget')) {
            this.widget = new OptiServeChatWidget();
            return;
        }

        // Create widget HTML if it doesn't exist
        const widgetHTML = this.generateWidgetHTML(config);
        document.body.insertAdjacentHTML('beforeend', widgetHTML);
        
        // Initialize widget
        this.widget = new OptiServeChatWidget();
    }

    generateWidgetHTML(config) {
        const calLink = config.calLink || 'https://cal.com/your-calendar-link';
        
        return `
            <div id="optiserve-chat-widget">
                <div id="chat-bubble" class="chat-bubble">
                    <div class="bubble-icon">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M20 2H4C2.9 2 2 2.9 2 4V22L6 18H20C21.1 18 22 17.1 22 16V4C22 2.9 21.1 2 20 2ZM20 16H5.17L4 17.17V4H20V16Z" fill="currentColor"/>
                            <circle cx="8" cy="10" r="1.5" fill="currentColor"/>
                            <circle cx="12" cy="10" r="1.5" fill="currentColor"/>
                            <circle cx="16" cy="10" r="1.5" fill="currentColor"/>
                        </svg>
                    </div>
                    <div class="bubble-pulse"></div>
                </div>
                <div id="chat-panel" class="chat-panel">
                    <!-- Panel content would be generated here -->
                </div>
            </div>
        `;
    }

    // Public API methods
    open() {
        if (this.widget) this.widget.openChat();
    }

    close() {
        if (this.widget) this.widget.closeChat();
    }

    sendMessage(message) {
        if (this.widget) this.widget.sendMessage(message);
    }

    clearChat() {
        if (this.widget) this.widget.clearConversation();
    }
}

// Initialize widget when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    // Only initialize if the widget elements exist
    if (document.getElementById('optiserve-chat-widget')) {
        window.optiServeChat = new OptiServeChatWidget();
    }
});

// Error handling for network issues
window.addEventListener('online', function() {
    console.log('Connection restored');
});

window.addEventListener('offline', function() {
    console.log('Connection lost');
});

// Export for use in other scripts
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { OptiServeChatWidget, ChatWidgetIntegration };
}

// Global access
window.OptiServeChatWidget = OptiServeChatWidget;
window.ChatWidgetIntegration = ChatWidgetIntegration;
