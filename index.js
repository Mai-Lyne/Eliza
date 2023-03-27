// CREATE A DISCORD BOT USING OPENAI API THAT INTERACTS ON THE DISCORD SERVER
require('dotenv').config();

// PREPARE TO CONNECT TO THE DISCORD API
const {Client, GatewayIntentBits} = require('discord.js');
const client = new Client({intents: [
    GatewayIntentBits.Guild,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent
]})

// PREPARE CONNECTION TO OPENAI API
const {Configuration, OpenAIApi} = require('openai');
const configuration = new Configuration({
    organization: process.env.OPENAI_KEY,
    apiKey: process.env.OPENAI_ORG,
});
 openai = new OpenAIApi(configuration);

// CHECK FOR WHEN A MESSAGE ON DISCORD IS SENT
client.on('messageCreate', async function(message){
    try {
        // DON'T RESPOND TO YOURSELF OR OTHER BOTS
        if(message.author.bot) return;

        const gptResponse = await openai.createCompletion({
            model: "davinci",
            prompt: `ChatGPT is a friendly chatbot.\n\
            ChatGPT: Hello, how are you ?\n\
            ${message.author.username}: ${message.content}\n\
            ChatGPT:`,
            temperature: 0.9,
            max_tokens: 100,
            stop: ["ChatGPT:", "Mai-Lyne Verger"],
        })

        message.reply(`${gptResponse.data.choices[0].text}`);
        return;
    } catch(err){
        console.log(err)
    }
});

// LOG THE BOT INTO DISCORD
client.login(process.env.DISCORD_TOKEN);
console.log("ChatGPT Bot is Online on Discord")