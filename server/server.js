import express from "express";
import { ChatOpenAI } from "@langchain/openai";
import cors from "cors";
import bodyParser from "body-parser";
// import { PromptTemplate } from "@langchain/openai";

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

const today = new Date();
const yyyy = today.getFullYear();
let mm = today.getMonth() + 1; // Months start at 0!
let dd = today.getDate();

if (dd < 10) dd = '0' + dd;
if (mm < 10) mm = '0' + mm;

const formattedToday = dd + '/' + mm + '/' + yyyy;

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
        let engineeredPrompt = `Summarize the following journal entry as short as you can in the I-person: ${userQuery}. Start of by stating: "${formattedToday}:"`
        // ${userQuery} ${formattedToday}
        // Invoke the model with the user query
        const response = await model.invoke(engineeredPrompt, {
            max_tokens: 15,
        });

        // Send the model's response back to the client
        res.json({ response: response.content });
    } catch (error) {
        console.error("Error fetching response:", error);
        res.status(500).json({ error: "Error fetching response" });
    }
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
