import express from "express";
import {ChatOpenAI} from "@langchain/openai";
import {OpenWeatherAPI} from "openweather-api-node";
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

const model = new ChatOpenAI({
    azureOpenAIApiKey: process.env.AZURE_OPENAI_API_KEY,
    azureOpenAIApiVersion: process.env.OPENAI_API_VERSION,
    azureOpenAIApiInstanceName: process.env.INSTANCE_NAME,
    azureOpenAIApiDeploymentName: process.env.ENGINE_NAME,
});

// State the current weather conditions and store it in currentWeather to pass it to the prompt
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

app.post('/location', async (req, res) => {
    try {
        // Get the location from the request body
        locationName = req.body.location;

        let weather = new OpenWeatherAPI({
            key: process.env.OPENWEATHER_API_KEY,
            locationName: locationName,
            units: "imperial"
        });

        weather.getCurrent().then(data => {
            currentWeather = `Current weather in ${locationName} is: ${data.weather.description}`;
            console.log(currentWeather);
        });

    } catch (error) {
        console.error("Error getting location:", error);
    }
});

// Endpoint to handle POST requests to '/chat'
// AI Usecase excluding prompt engineering
app.post('/chat', async (req, res) => {
    try {
        // Get the journal entry from the request body
        const journalEntry = req.body.query;
        // Summarize the entry by using ${userQuery} ${formattedToday}
        let engineeredPrompt = `Summarize the following journal entry as short as you can in the I-person: ${journalEntry}. 
        Start of by stating: "${currentDate}:". Make a comment about the weather and location using the following info: "${currentWeather}"`
        // Invoke the model with the engineered prompt
        const response = await model.invoke(engineeredPrompt, {
            // Make it extra short
            max_tokens: 15,
        });

        // Send the response to the client side
        res.json({response: response.content});
    } catch (error) {
        console.error("Error fetching response:", error);
        res.status(500).json({error: "Error fetching response"});
    }
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});

