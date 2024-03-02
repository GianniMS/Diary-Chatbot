# Journal App

## Installation: <br>
### Step 1: <br>
Open the terminal in your code editor and clone the repository by using the following command: <br>
**git clone https://github.com/GianniMS/Diary-Chatbot**

### Step 2: <br>
Navigate to the projects directory using the following terminal command: <br>
**cd diary-chatbot**

### Step 3: <br>
Now navigate to the server directory using the following terminal command: <br>
**cd server**

### Step 4: <br>
Now install the dependencies using the following terminal command: <br>
**npm install**

## Configuration: <br>
### Step 1: <br>
Configure the environment variables in your **.env file**, you'll need an OpenAI API key and an OpenWeather API key. And you'll need to enter the OpenAI API type, the OpenAI API version and the OpenAI API base. 
The deployment name and engine are set already, you'll also need to fill in the instance name. <br>
Template: <br> 
OPENAI_API_TYPE=________ <br>
OPENAI_API_VERSION=________ <br>
OPENAI_API_BASE=________ <br>
AZURE_OPENAI_API_KEY=_____________________________ <br>
OPENWEATHER_API_KEY=_____________________________ <br>
DEPLOYMENT_NAME=deploy-text-embedding-ada <br>
ENGINE_NAME=deploy-gpt-35-turbo <br>
INSTANCE_NAME=________ <br>

## Usage: <br>
### Step 1: <br>
Start the server using the following terminal command (Make sure your in the server directory before executing the command): <br>
**npm start**

The terminal should now display:
_Journal App listening on port 3000_

If you encounter the error: <br>
_.env: not found <br>_

It means that you're not in the server directory, you can fix this by running the following terminal command: <br>
**cd server.js**

### Step 2: <br> 
Open your webbrowser and navigate to **http://localhost:3000** <br>
It should display: <br>
_Journal App using OpenAI API and OpenWeather API to summarize the journal entry_

### Step 3: <br>
Serve the index.html file: <br>
A way to do this is by navigating to your index.html file through your files. Once you've located the index.html file in your files, open it by double clicking said file.

***Now that you've installed, configured and opened the app. You can learn how to use the journal itself!***

## Journal entries: <br>
### Step 1: <br>
Enter the main location where you experienced the topics of your journal entry of the day in the **input field** that says: _"Enter your location..."_ <br>

### Step 2: <br>
Press the button on the right of the location input field with the GPS icon. <br>
This will send the name of the location to the server so the weather data can be retrieved, from the OpenWeather API, before summarizing the journal entry.

### Step 3: <br>
Enter a detailed description of your day and your emotions during the day in the **input field** that says: _"Write a journal entry..."_. <br>
The OpenAI API has access to the context of your last 31 journal entries, you can refer to these entries as you wish.

### Step 4: <br>
Press the send button below the journal entry input field with the upload icon. <br>
This will send the journal entry to the server so it can be summarized by the OpenAI API. It will also process the weather data mentioned previously in the summary.

## Journal
### Reading the journal: <br>
The journal history displays the **last 31 journal entries** submitted by the user. If you submit **1 journal entry per day**, you'll be able to read through all your entries up until **a month** ago.

### UI buttons: <br>
**The undo button: <br>**
The undo button will remove your **last submitted entry** from the journal. It is the button on the **bottom left**, with the **round arrow icon**.

**The clear button: <br>**
The clear button will remove **all submitted entries** from the journal. It is the button on the **bottom right**, with the **trashcan icon**.

## Chat History
### Reading the chat history: <br>
The chat history displays the chat interactions between the user and the OpenAI API. The roles of the sender of each message is stated at the start of the message. Scrolling up in the display allows you to see older messages from the chat history

### UI buttons: <br>
**The clear button: <br>**
The clear button will **remove all messages** in the chat history. It is the button on the **bottom**, with the **trashcan icon**.

***That was all, happy journaling!***
