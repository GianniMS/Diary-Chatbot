// Load the history from local storage when the page loads
let entryHistory = JSON.parse(localStorage.getItem('entryHistory')) || [];
// Declare Journal-UI buttons
const undoButton = document.querySelector(`.undo-button`);
const deleteButton = document.querySelector(`.delete-button`);

undoButton.addEventListener("click", function (event) {
    // Undo last entry
    entryHistory.pop();
    // Update the displayed history
    historyDisplay();
})

deleteButton.addEventListener("click", function (event) {
    // Clear all entries
    entryHistory = [];
    // Update the displayed history
    historyDisplay();
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

        entryHistory.push(responseData.response);

        // Limit the history length to 31 entries
        if (entryHistory.length > 31) {
            entryHistory.shift();
        }

        localStorage.setItem('entryHistory', JSON.stringify(entryHistory));

        historyDisplay();
    } catch (error) {
        console.error("Error fetching response:", error);
    } finally {
        submitButton.style.display = 'block';
        loadingSpinner.style.display = 'none';
    }

    // AI Usecase
    document.querySelector('.entry-input').value = '';
}

document.querySelector('form').addEventListener('submit', handleSubmit);

// Call historyDisplay to display the history when the page loads
historyDisplay();