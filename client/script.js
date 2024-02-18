let entryHistory = [];

function historyDisplay() {
    // Select the <ul> element inside the journal-content article
    const ulElement = document.querySelector('.journal-content ul');

    // Clear existing content in the <ul> element
    ulElement.innerHTML = '';

    // Loop through entryHistory and create a <li> element for each entry
    entryHistory.forEach((entry, index) => {
        const listItem = document.createElement('li');
        listItem.textContent = entry;
        ulElement.appendChild(listItem);

        // Add a <br> element after each <li> except the last one
        if (index < entryHistory.length - 1) {
            ulElement.appendChild(document.createElement('br'));
        }
    });
}

// Function to handle form submission
async function handleSubmit(event) {
    event.preventDefault(); // Prevent the default form submission

    // Get the submit button and loading spinner elements
    const submitButton = document.querySelector('.submit-button');
    const loadingSpinner = document.querySelector('.loading-spinner');

    // Hide the submit button and show the loading spinner
    submitButton.style.display = 'none';
    loadingSpinner.style.display = 'block';

    try {
        // Get the user input from the form
        const userInput = document.querySelector('.entry-input').value;

        // Make a POST request to your server with the user input
        const response = await fetch('http://localhost:3000/chat', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({query: userInput}) // Send the user input as JSON
        });

        // Parse the JSON response
        const responseData = await response.json();

        // Update the journal content with the response from the server
        document.querySelector('.entry-chat').textContent = responseData.response;

        // Update the history content with the response from the server
        entryHistory.push(responseData.response);
        // Limit the history length to 31
        if (entryHistory.length > 31) {
            entryHistory.shift(); // Remove the oldest entry if the history exceeds the limit
        }
        historyDisplay(); // Call historyDisplay to update the displayed history

    } catch (error) {
        console.error("Error fetching response:", error);
        // Handle error if request fails
    } finally {
        // Show the submit button and hide the loading spinner
        submitButton.style.display = 'block';
        loadingSpinner.style.display = 'none';
    }

    // Clear the input field
    document.querySelector('.entry-input').value = '';
}

// Add event listener to the form for form submission
document.querySelector('form').addEventListener('submit', handleSubmit);