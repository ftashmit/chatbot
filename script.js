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

const generateResponse = (userMessage) => {
    let response = "I'm sorry, I don't understand. Can you please rephrase?";
    
    if (userMessage.toLowerCase().includes("hello") || userMessage.toLowerCase().includes("hi")) {
        response = "Hello! How can I assist you today?";
    } else if (userMessage.toLowerCase().includes("how are you")) {
        response = "I'm just a computer program, so I don't have feelings, but thanks for asking!";
    } else if (userMessage.toLowerCase().includes("thank")) {
        response = "You're welcome!";
    } else if (userMessage.toLowerCase().includes("bye")) {
        response = "Goodbye! Have a great day!";
    } else if (userMessage.toLowerCase().includes("calculate")) {
        response = performCalculation(userMessage);
    }

    return response;
};

const performCalculation = (userMessage) => {
    let result = "Sorry, I couldn't perform the calculation.";

    try {
        const expression = userMessage.split("calculate")[1].trim();
        result = eval(expression).toString();
    } catch (error) {
        result = "Invalid expression.";
    }

    return result;
};

const handleChat = () => {
    const userMessage = chatInput.value.trim();
    if (!userMessage) return;

    chatInput.value = "";
    chatInput.style.height = `${inputInitHeight}px`;

    const chatElement = createChatLi(userMessage, "outgoing");
    chatbox.appendChild(chatElement);
    chatbox.scrollTo(0, chatbox.scrollHeight);

    setTimeout(() => {
        const responseMessage = generateResponse(userMessage);
        const responseElement = createChatLi(responseMessage, "incoming");
        chatbox.appendChild(responseElement);
        chatbox.scrollTo(0, chatbox.scrollHeight);
    }, 1000);
};

chatInput.addEventListener("input", () => {
    chatInput.style.height = `${inputInitHeight}px`;
    chatInput.style.height = `${chatInput.scrollHeight}px`;
});

chatInput.addEventListener("keydown", (e) => {
    if(e.key === "Enter" && !e.shiftKey && window.innerWidth > 800) {
        e.preventDefault();
        handleChat();
    }
});

sendChatBtn.addEventListener("click", handleChat);
closeBtn.addEventListener("click", () => document.body.classList.remove("show-chatbot"));
chatbotToggler.addEventListener("click", () => document.body.classList.toggle("show-chatbot"));
