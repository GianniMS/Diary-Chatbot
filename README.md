Installation:
1: Open the terminal in your code editor and clone the repository by using the following command:
git clone https://github.com/GianniMS/Diary-Chatbot

2: Navigate to the projects directory using the following terminal command: <br>
cd Diary-Chatbot

3: Now navigate to the server directory using the following terminal command: <br>
cd server

4: Now install the dependencies using the following terminal command: <br>
npm install

Configuration:
1: Configure the environment variables in your .env file, you'll need an OpenAI API key and an OpenWeather API key. And you'll need to enter the OpenAI API type, the OpenAI API version and the OpenAI API base. 
The deployment name and engine are set already, you'll also need to fill in the instance name. <br>
Template: <br> 
OPENAI_API_TYPE________ <br>
OPENAI_API_VERSION=________ <br>
OPENAI_API_BASE=________ <br>
AZURE_OPENAI_API_KEY=_____________________________ <br>
OPENWEATHER_API_KEY=_____________________________ <br>
DEPLOYMENT_NAME=deploy-text-embedding-ada <br>
ENGINE_NAME=deploy-gpt-35-turbo <br>
INSTANCE_NAME=________ <br>

Usage:
1: Start the server using the following terminal command (Make sure your in the server directory before executing the command): <br>
 nodemon --env-file=.env server.js

The terminal should now display that the server is running. Error cd server thingy

2: Open your webbrowser and navigate to http://localhost:3000 <br>
It should display: <br>
Journal App using OpenAI API and OpenWeather API to summarize the journal entry

3: Serve the index.html file, one way to do this is to navigate to the index.html file from inside your files and then open it in the browser by double clicking it

Now that you have the server running and the client side UI infront of you, you can start journaling!

Journaling:

