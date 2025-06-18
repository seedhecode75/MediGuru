document.addEventListener('DOMContentLoaded', function() {
    const connectionStatus = document.querySelector('#connection-status .status-text');
    const statusIndicator = document.querySelector('#connection-status .status-indicator');
    let isServerOnline = false;

    async function checkServerStatus() {
        try {
            const response = await fetch('http://localhost:5000/status', { 
                method: 'GET',
                cache: 'no-cache'
            });
            if (response.ok) {
                connectionStatus.textContent = "Connected to medical AI";
                statusIndicator.classList.add('connected');
                isServerOnline = true;
                return true;
            } else {
                throw new Error('Status not OK');
            }
        } catch (e) {
            console.log("Bridge server not responding");
            connectionStatus.textContent = "Medical AI offline - running in demo mode";
            statusIndicator.classList.remove('connected');
            isServerOnline = false;
            return false;
        }
    }

    // Initial check
    checkServerStatus();

    // Periodically check every 30 seconds
    setInterval(checkServerStatus, 30000);

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

    function getDemoResponse(question) {
        const responses = {
            "hi": "Hello! I'm MediAssist, your AI medical assistant. How can I help with your health concerns today?",
            "symptoms of flu": "Common flu symptoms include:\n\n• Fever\n• Chills\n• Cough\n• Sore throat\n• Runny or stuffy nose\n• Muscle or body aches\n• Headaches\n• Fatigue\n\nIf symptoms are severe, please consult a healthcare professional.",
            "what is diabetes": "Diabetes is a chronic health condition that affects how your body turns food into energy. There are three main types:\n\n1. Type 1 diabetes: An autoimmune condition\n2. Type 2 diabetes: Often related to lifestyle factors\n3. Gestational diabetes: Occurs during pregnancy\n\nProper management includes medication, diet, exercise, and regular monitoring.",
            "how to lower blood pressure": "To help lower blood pressure:\n\n• Reduce sodium intake\n• Exercise regularly\n• Maintain a healthy weight\n• Limit alcohol consumption\n• Manage stress\n• Quit smoking\n• Take prescribed medications as directed\n\nAlways consult with your doctor before making significant lifestyle changes.",
            "covid prevention": "To prevent COVID-19 infection:\n\n• Get vaccinated and boosted\n• Wear masks in crowded places\n• Practice good hand hygiene\n• Maintain physical distance\n• Improve ventilation indoors\n• Stay home if you feel unwell\n• Follow local public health guidelines"
        };
        
        const lowerQuestion = question.toLowerCase();
        
        for (const key in responses) {
            if (lowerQuestion.includes(key)) {
                return responses[key];
            }
        }
        
        return "I can provide information on a wide range of medical topics. Could you please be more specific about your health concern?";
    }

    async function getAIResponse(question) {
        if (!isServerOnline) {
            return getDemoResponse(question);
        }
        
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
        addMessage("Hello! I'm MediGuru, your medical information assistant. I can provide information on symptoms, conditions, treatments, and preventive care. How may I assist you today? Remember: I provide informational support only, not medical advice.", false);
    }, 500);
});

    
