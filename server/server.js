import express from "express";
import { ChatOpenAI } from "@langchain/openai";
import cors from "cors";
import bodyParser from "body-parser";
// nodemon --env-file=.env server.js

const app = express();
const port = 3000;

app.use( bodyParser.json() );
app.use(bodyParser.urlencoded({
    extended: true}));
app.use(cors());

const model = new ChatOpenAI({
    azureOpenAIApiKey: process.env.AZURE_OPENAI_API_KEY,
    azureOpenAIApiVersion: process.env.OPENAI_API_VERSION,
    azureOpenAIApiInstanceName: process.env.INSTANCE_NAME,
    azureOpenAIApiDeploymentName: process.env.ENGINE_NAME,
});

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
app.get('/', (req, res)=>{
    res.send("Journal App using OpenAI API to summarize the journal entry")
})

// Endpoint to handle POST requests to '/chat'
app.post('/chat', async (req, res) => {
    try {
        // Get the journal entry from the request body
        const journalEntry = req.body.query;
        // Summarize the entry by using ${userQuery} ${formattedToday}
        let engineeredPrompt = `Summarize the following journal entry as short as you can in the I-person: ${journalEntry}. Start of by stating: "${currentDate}:"`
        // Invoke the model with the engineered prompt
        const response = await model.invoke(engineeredPrompt, {
            // Make it extra short
            max_tokens: 15,
        });

        // Send the response to the client side
        res.json({ response: response.content });
    } catch (error) {
        console.error("Error fetching response:", error);
        res.status(500).json({ error: "Error fetching response" });
    }
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
