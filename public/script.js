document.addEventListener('DOMContentLoaded', function() {
    const chatMessages = document.getElementById('chat-messages');
    const userInput = document.getElementById('user-input');
    const sendBtn = document.getElementById('send-btn');
    
    function addMessage(text, isUser, messageId = null) {
        const messageDiv = document.createElement('div');
        messageDiv.classList.add('message');
        messageDiv.classList.add(isUser ? 'user-message' : 'bot-message');
        
        if (isUser) {
            messageDiv.innerHTML = `<i class="fas fa-user"></i> ${text}`;
        } else {
            messageDiv.innerHTML = `<i class="fas fa-robot"></i> ${text}`;
            if (messageId) {
                messageDiv.id = messageId;
            }
        }
        
        chatMessages.appendChild(messageDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;
        return messageDiv;
    }

    function updateMessage(id, newText) {
        const messageDiv = document.getElementById(id);
        if (messageDiv) {
            messageDiv.innerHTML = `<i class="fas fa-robot"></i> ${newText}`;
        }
    }

    async function getAIResponse(question) {
        try {
            const response = await fetch('http://localhost:5000/ask', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ message: question })
            });
            
            if (!response.ok) {
                throw new Error(`API error: ${response.status}`);
            }
            
            const data = await response.json();
            return data.response || data.error;
        } catch (error) {
            console.error('Fetch error:', error);
            return "⚠️ I'm having trouble connecting to the medical AI. Please ensure the bridge server is running.";
        }
    }
    
    sendBtn.addEventListener('click', sendMessage);
    userInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            sendMessage();
        }
    });

    async function sendMessage() {
        const question = userInput.value.trim();
        if (question) {
            addMessage(question, true);
            userInput.value = '';
            userInput.disabled = true;
            sendBtn.disabled = true;
            
            
            const messageId = 'msg-' + Date.now();
            addMessage("Analyzing your medical question...", false, messageId);
            
            try {
                const response = await getAIResponse(question);
                updateMessage(messageId, response);
            } catch (error) {
                console.error('Error:', error);
                updateMessage(messageId, "⚠️ Error processing your request");
            } finally {
                userInput.disabled = false;
                sendBtn.disabled = false;
                userInput.focus();
            }
        }
    }
    
    
    setTimeout(() => {
        addMessage("Hello! I'm MediGuide, your medical information assistant. I can provide information on symptoms, conditions, treatments, and preventive care. How may I assist you today? Remember: I provide informational support only, not medical advice.", false);
    }, 500);
});

    
