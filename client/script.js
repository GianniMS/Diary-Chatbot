// Function to handle form submission
async function handleSubmit(event) {
    event.preventDefault(); // Prevent the default form submission

    // Get the user input from the form
    const userInput = document.querySelector('.entry-input').value;

    // Make a POST request to your server with the user input
    const response = await fetch('http://localhost:3000/chat', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ query: userInput }) // Send the user input as JSON
    });

    // Parse the JSON response
    const responseData = await response.json();

    // Update the journal content with the response from the server
    document.querySelector('.entry-chat').textContent = responseData.response;

    // Clear the input field
    document.querySelector('.entry-input').value = '';
}

// Add event listener to the form for form submission
document.querySelector('form').addEventListener('submit', handleSubmit);
