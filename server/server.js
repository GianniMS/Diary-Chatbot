import express from "express";
import { ChatOpenAI } from "@langchain/openai";

const app = express();
const port = 3000;

const model = new ChatOpenAI({
    azureOpenAIApiKey: process.env.AZURE_OPENAI_API_KEY,
    azureOpenAIApiVersion: process.env.OPENAI_API_VERSION,
    azureOpenAIApiInstanceName: process.env.INSTANCE_NAME,
    azureOpenAIApiDeploymentName: process.env.ENGINE_NAME,
});

app.get('/joke', async (req, res) => {
    try {
        const joke = await model.invoke("Tell me a Javascript joke!");
        res.send(joke.content);
    } catch (error) {
        console.error("Error fetching joke:", error);
        res.status(500).send("Error fetching joke");
    }
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});

//npm install cors
//import cors from "cors"
//app.use(cors())