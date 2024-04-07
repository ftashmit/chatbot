const chatbotToggler = document.querySelector(".chatbot-toggler");
const closeBtn = document.querySelector(".close-btn");
const chatbox = document.querySelector(".chatbox");
const chatInput = document.querySelector(".chat-input textarea");
const sendChatBtn = document.querySelector(".chat-input span");

const inputInitHeight = chatInput.scrollHeight;

const createChatLi = (message, className) => {
    const chatLi = document.createElement("li");
    chatLi.classList.add("chat", `${className}`);
    let chatContent = className === "outgoing" ? `<p>${message}</p>` : `<span class="material-symbols-outlined">smart_toy</span><p></p>`;
    chatLi.innerHTML = chatContent;
    chatLi.querySelector("p").textContent = message;
    return chatLi;
}

const generateResponse = async (userMessage) => {
    let response = "I'm sorry, I don't understand. Can you please rephrase?";
    
    const lowercaseMessage = userMessage.toLowerCase();

    if (lowercaseMessage.includes("hello") || lowercaseMessage.includes("hi")) {
        response = "Hello! How can I assist you today?";
    } else if (lowercaseMessage.includes("how are you")) {
        response = "I'm just a computer program, so I don't have feelings, but thanks for asking!";
    } else if (lowercaseMessage.includes("thank")) {
        response = "You're welcome!";
    } else if (lowercaseMessage.includes("bye")) {
        response = "Goodbye! Have a great day!";
    } else if (lowercaseMessage.includes("calculate")) {
        response = performCalculation(userMessage);
    } else if (lowercaseMessage.includes("tell me a joke")) {
        response = "Why don't scientists trust atoms? Because they make up everything!";
    } else if (lowercaseMessage.includes("tell me a fact")) {
        response = "Did you know? Honey never spoils. Archaeologists have found pots of honey in ancient Egyptian tombs that are over 3,000 years old and still perfectly edible!";
    } else if (lowercaseMessage.includes("weather")) {
        response = "I'm sorry, I cannot provide real-time weather information. Please check a weather website or app for the current weather.";
    } else if (lowercaseMessage.includes("time")) {
        const currentDate = new Date();
        const currentTime = currentDate.toLocaleTimeString();
        response = `The current time is ${currentTime}.`;
    } else if (lowercaseMessage.includes("help")) {
        response = "You can ask me to calculate math expressions, tell jokes or facts, or check the current time. If you want to find information from Google, just use the word 'google' followed by your query. How can I assist you?";
    } else if (lowercaseMessage.includes("movie")) {
        const query = lowercaseMessage.replace("movie", "").trim();
        response = await searchGoogle(query);
    } else if (lowercaseMessage.includes("define")) {
        const query = lowercaseMessage.replace("define", "").trim();
        response = await searchGoogle(query);
    } else if (lowercaseMessage.includes("news")) {
        const query = lowercaseMessage.replace("news", "").trim();
        response = await searchGoogle(query);
    } else if (lowercaseMessage.includes("music")) {
        const query = lowercaseMessage.replace("music", "").trim();
        response = await searchGoogle(query);
    } else if (lowercaseMessage.includes("who are you")) {
        response = "I am Intellibot, a helpful assistant here to assist you with calculations, jokes, facts, and more. How can I assist you today?";
    } else if (lowercaseMessage.includes("google")) {
        const query = lowercaseMessage.replace("google", "").trim();
        response = await searchGoogle(query);
    }

    return response;
};

const searchGoogle = async (query) => {
    const API_KEY = "AIzaSyBGI87nzRPepRib-K0vk2Oj40KquY9z_fk"; 
    const SEARCH_ENGINE_ID = "254cd26a4f3554e07";
    const API_URL = `https://www.googleapis.com/customsearch/v1?q=${query}&key=${API_KEY}&cx=${SEARCH_ENGINE_ID}`;
    
    try {
        const response = await fetch(API_URL);
        const data = await response.json();
        
        if (data.items && data.items.length > 0) {
            const searchResults = data.items.map(item => item.title).join(", ");
            return `Here are some Google search results for "${query}": ${searchResults}`;
        } else {
            return "I couldn't find any relevant information on Google.";
        }
    } catch (error) {
        console.error("Error searching Google:", error);
        return "Oops! Something went wrong while searching Google. Please try again.";
    }
};

const performCalculation = (userMessage) => {
    let result;
    try {
        const expression = userMessage.split("calculate")[1].trim();
        result = eval(expression).toString();
    } catch (error) {
        result = "Invalid expression.";
    }
    return result;
};

const handleChat = async () => {
    const userMessage = chatInput.value.trim();
    if (!userMessage) return;

    chatInput.value = "";
    chatInput.style.height = `${inputInitHeight}px`;

    const chatElement = createChatLi(userMessage, "outgoing");
    chatbox.appendChild(chatElement);
    chatbox.scrollTo(0, chatbox.scrollHeight);

    try {
        const responseMessage = await generateResponse(userMessage);
        const responseElement = createChatLi(responseMessage, "incoming");
        chatbox.appendChild(responseElement);
        chatbox.scrollTo(0, chatbox.scrollHeight);
    } catch (error) {
        console.error("Error:", error);
    }
};

chatInput.addEventListener("input", () => {
    chatInput.style.height = `${inputInitHeight}px`;
    chatInput.style.height = `${chatInput.scrollHeight}px`;
});

chatInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter" && !e.shiftKey && window.innerWidth > 800) {
        e.preventDefault();
        handleChat();
    }
});

sendChatBtn.addEventListener("click", handleChat);
closeBtn.addEventListener("click", () => document.body.classList.remove("show-chatbot"));
chatbotToggler.addEventListener("click", () => document.body.classList.toggle("show-chatbot"));
