// Function to toggle chatbot visibility
function toggleChat() {
    var chat = document.getElementById("chat-container");
    chat.style.display = (chat.style.display === "none" || chat.style.display === "") ? "block" : "none";
}

// Function to send a message to OpenAI API
async function sendMessage() {
    let userInput = document.getElementById("user-input").value;
    if (!userInput) return;

    addMessage(userInput, "user");
    document.getElementById("user-input").value = ""; // Clear input

    try {
        const response = await fetch("https://api.openai.com/v1/chat/completions", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer YOUR_OPENAI_API_KEY" // Replace with your actual API key
            },
            body: JSON.stringify({
                model: "gpt-3.5-turbo",
                messages: [{ role: "user", content: userInput }]
            })
        });

        const data = await response.json();
        addMessage(data.choices[0].message.content, "bot");
    } catch (error) {
        console.error("Error:", error);
        addMessage("Oops! Something went wrong. Try again later.", "bot");
    }
}

// Function to add messages to the chatbox
function addMessage(text, sender) {
    let chatBox = document.getElementById("chat-box");
    let messageDiv = document.createElement("div");
    messageDiv.classList.add("message", sender);
    messageDiv.textContent = text;
    chatBox.appendChild(messageDiv);
    chatBox.scrollTop = chatBox.scrollHeight; // Auto-scroll
}

// Event listener for send button
document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("send-btn").addEventListener("click", sendMessage);
});
