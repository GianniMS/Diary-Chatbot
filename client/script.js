// Load the history from local storage when the page loads
let entryHistory = JSON.parse(localStorage.getItem('entryHistory')) || [];
// Load the history from local storage when the page loads
let chatHistory = JSON.parse(localStorage.getItem('chatHistory')) || [];

// Declare Journal-UI buttons
const undoButton = document.querySelector(`.undo-button`);
const deleteButton = document.querySelector(`.delete-button`);
const deleteChatButton = document.querySelector(`.delete-chat-button`);

undoButton.addEventListener("click", function (event) {
    // Undo last entry
    entryHistory.pop();
    // Update the displayed history
    historyDisplay();
})

deleteButton.addEventListener("click", function (event) {
    // Clear all entries
    entryHistory = [];
    // Update the displayed journal history
    historyDisplay();
});

deleteChatButton.addEventListener("click", function (event) {
    // Clear chat history
    chatHistory = [];
    // Update the displayed chat history
    chatHistoryDisplay();
});

function historyDisplay() {
    const ulElement = document.querySelector('.journal-content ul');
    ulElement.innerHTML = '';

    entryHistory.forEach((entry, index) => {
        const listItem = document.createElement('li');
        listItem.textContent = entry;
        ulElement.appendChild(listItem);

        // AI Usecase
        if (index < entryHistory.length - 1) {
            ulElement.appendChild(document.createElement('br'));
        }
    });
}

function chatHistoryDisplay() {
    const chatHistoryElement = document.querySelector('.chat-history');
    chatHistoryElement.value = '';

    chatHistory.forEach((message) => {
        chatHistoryElement.value += `${message.senderRole}: ${message.content}\n`;
    });
}

async function handleSubmitLocation(event) {
    event.preventDefault();

    try {
        const locationInput = document.querySelector('.location-input').value;
        const response = await fetch('http://localhost:3000/location', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({location: locationInput})
        });

    } catch (error) {
        console.error("Error getting location:", error);
    }
}

async function handleSubmit(event) {
    event.preventDefault();

    const submitButton = document.querySelector('.submit-button');
    const loadingSpinner = document.querySelector('.loading-spinner');
    submitButton.style.display = 'none';
    loadingSpinner.style.display = 'block';

    try {
        const userInput = document.querySelector('.entry-input').value;
        const response = await fetch('http://localhost:3000/chat', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({query: userInput})
        });
        const responseData = await response.json();

        // Add request and response to journal- and chat history
        chatHistory.push({content: userInput, senderRole: 'User'});
        chatHistory.push({content: responseData.response, senderRole: 'OpenAI API'});
        entryHistory.push(responseData.response);

        // Limit the history length to 31 entries
        if (entryHistory.length > 31) {
            entryHistory.shift();
        }

        localStorage.setItem('chatHistory', JSON.stringify(chatHistory));
        localStorage.setItem('entryHistory', JSON.stringify(entryHistory));

        chatHistoryDisplay();
        historyDisplay();
    } catch (error) {
        console.error("Error fetching response:", error);
    } finally {
        submitButton.style.display = 'block';
        loadingSpinner.style.display = 'none';
    }

    // AI Usecase empty textarea
    document.querySelector('.entry-input').value = '';
    document.querySelector('.location-input').value = '';
}

document.querySelector('.location-form').addEventListener('submit', handleSubmitLocation);
document.querySelector('.entry-form').addEventListener('submit', handleSubmit);

// Call display functions to display journal- and chat history on load of the page
historyDisplay();
chatHistoryDisplay();