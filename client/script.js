// Load the history from localStorage when the page loads
let entryHistory = JSON.parse(localStorage.getItem('entryHistory')) || [];

function historyDisplay() {
    const ulElement = document.querySelector('.journal-content ul');
    ulElement.innerHTML = '';

    entryHistory.forEach((entry, index) => {
        const listItem = document.createElement('li');
        listItem.textContent = entry;
        ulElement.appendChild(listItem);

        if (index < entryHistory.length - 1) {
            ulElement.appendChild(document.createElement('br'));
        }
    });
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

        // Add the response directly to the entryHistory array
        entryHistory.push(responseData.response);

        // Limit the history length to 31
        if (entryHistory.length > 31) {
            entryHistory.shift(); // Remove the oldest entry if the history exceeds the limit
        }

        // Save the updated history to localStorage
        localStorage.setItem('entryHistory', JSON.stringify(entryHistory));

        // Update the displayed history
        historyDisplay();
    } catch (error) {
        console.error("Error fetching response:", error);
    } finally {
        submitButton.style.display = 'block';
        loadingSpinner.style.display = 'none';
    }

    document.querySelector('.entry-input').value = '';
}

document.querySelector('form').addEventListener('submit', handleSubmit);

// Call historyDisplay to initially display the history when the page loads
historyDisplay();