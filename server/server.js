import express from "express";
import { ChatOpenAI } from "@langchain/openai";
import { OpenWeatherAPI } from "openweather-api-node";
import cors from "cors";
import bodyParser from "body-parser";

// nodemon --env-file=.env server.js

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(cors());

// Initialize OpenAI API
const model = new ChatOpenAI({
    azureOpenAIApiKey: process.env.AZURE_OPENAI_API_KEY,
    azureOpenAIApiVersion: process.env.OPENAI_API_VERSION,
    azureOpenAIApiInstanceName: process.env.INSTANCE_NAME,
    azureOpenAIApiDeploymentName: process.env.ENGINE_NAME,
});

// Initiate journal entries array
let journalEntries = [];

// Initiate weather condition variables
let locationName = '';
let currentWeather = '';

// State the current date to pass it to the prompt
const today = new Date();
const yyyy = today.getFullYear();
let mm = today.getMonth() + 1;
let dd = today.getDate();

if (dd < 10) dd = '0' + dd;
if (mm < 10) mm = '0' + mm;

const currentDate = dd + '/' + mm + '/' + yyyy;

// Middleware to parse incoming request bodies
app.use(express.json());

// Check if the server is live
app.get('/', (req, res) => {
    res.send("Journal App using OpenAI API and OpenWeather API to summarize the journal entry")
})

// Endpoint to handle POST request to '/location'
app.post('/location', async (req, res) => {
    try {
        // Get the location from the request body
        locationName = req.body.location;

        // Initiate OpenWeatherAPI
        let weather = new OpenWeatherAPI({
            key: process.env.OPENWEATHER_API_KEY,
            locationName: locationName,
            units: "imperial"
        });

        // Set currentWeather variable to string displaying location and weather description
        weather.getCurrent().then(data => {
            currentWeather = `Current weather in ${locationName} is: ${data.weather.description}`;
            console.log(currentWeather);
        });

    } catch (error) {
        console.error("Error getting location:", error);
    }
});

// Function to summarize journal entry
async function summarizeJournalEntry(journalEntry) {
    // Add previous entries as context
    let context = '';
    for (let entry of journalEntries) {
        context += ` ${entry}`;
    }

    // Summarize the entry by using ${userQuery} ${currentDate} ${currentWeather} and ${chatContext}
    let engineeredPrompt = `Summarize the following journal entry as short as you can in the I-person: ${journalEntry}.
        Start of by stating: "${currentDate}:". Make a comment about the weather and location using the following info: "${currentWeather}".
        If the entry contains a reference to a previous day use this as context: ${context}`;

    // Invoke the model with the engineered prompt
    const response = await model.invoke(engineeredPrompt, {
        // Make it extra short
        max_tokens: 15,
    });

    return response.content;
}

// Endpoint to handle POST requests to '/chat'
// AI Usecase handle post request serverside
app.post('/chat', async (req, res) => {
    try {
        // Get the journal entry from the request body
        const journalEntry = req.body.query;

        // Execute function to summarize journal entry
        const response = await summarizeJournalEntry(journalEntry);

        // Add summarized entry to journal entries array
        journalEntries.push(response);

        // Limit the journal entries array to 31 items
        if (journalEntries.length > 31) {
            journalEntries.shift(); // Remove the oldest entry
        }

        // Send the response with the chat roles
        res.json({ response, senderRole: 'OpenAI API' });
    } catch (error) {
        console.error('Error fetching response:', error);
        res.status(500).json({ error: 'Error fetching response' });
    }
});

app.listen(port, () => {
    console.log(`Journal App listening on port ${port}`);
});

