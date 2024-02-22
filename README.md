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
The deployment name and engin
Template:
OPENAI_API_TYPE=____
OPENAI_API_VERSION=_______
OPENAI_API_BASE=________
AZURE_OPENAI_API_KEY=____________________________
OPENWEATHER_API_KEY=_____________________________
DEPLOYMENT_NAME=deploy-text-embedding-ada
ENGINE_NAME=deploy-gpt-35-turbo
INSTANCE_NAME=_______

Usage:
1: Start the server using the following terminal command (Make sure your in the server directory before executing the command):
 nodemon --env-file=.env server.js

The terminal should now display that the server is running. Error cd server thingy

2: Open your webbrowser and navigate to http://localhost:3000
It should display:
Journal App using OpenAI API and OpenWeather API to summarize the journal entry

3: Serve the index.html file, one way to do this is to navigate to the index.html file from inside your files and then open it in the browser by double clicking it

Now that you have the server running and the client side UI infront of you, you can start journaling!

Journaling:

