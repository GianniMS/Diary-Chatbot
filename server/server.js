import express from "express";
import { ChatOpenAI } from "@langchain/openai";
import cors from "cors";
import bodyParser from "body-parser";

// node --env-file=.env server.js
// nodemon --env-file=.env server.js

const app = express();
const port = 3000;

app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
    extended: true}));
app.use(cors());

const model = new ChatOpenAI({
    azureOpenAIApiKey: process.env.AZURE_OPENAI_API_KEY,
    azureOpenAIApiVersion: process.env.OPENAI_API_VERSION,
    azureOpenAIApiInstanceName: process.env.INSTANCE_NAME,
    azureOpenAIApiDeploymentName: process.env.ENGINE_NAME,
});

// Middleware to parse incoming request bodies
app.use(express.json());

//You can use this to check if your server is working
app.get('/', (req, res)=>{
    res.send("Diary chatbot in progress <3")
})

// Endpoint to handle POST requests to '/chat'
app.post('/chat', async (req, res) => {
    try {
        // console.log(req.body.query);
        // Get the user query from the request body
        const userQuery = req.body.query;
        let engineeredPrompt = `Summarize the following journal entry from the I-person: ${userQuery} as short as you can.`
        // Invoke the model with the user query
        const response = await model.invoke(engineeredPrompt, {
            max_tokens: 30,
        });

        // Send the model's response back to the client
        res.json({ response: response.content });
    } catch (error) {
        console.error("Error fetching response:", error);
        res.status(500).json({ error: "Error fetching response" });
    }
});

// Endpoint to handle GET requests to '/joke'
let jokePrompt = "Tell me a joke about a car";
app.get('/joke', async (req, res) => {
    try {
        const joke = await model.invoke(jokePrompt);
        res.json({ joke: joke.content });
    } catch (error) {
        console.error("Error fetching joke:", error);
        res.status(500).json({ error: "Error fetching joke:" });
    }
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
