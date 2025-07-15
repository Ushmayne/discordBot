require('dotenv').config();  // Loads environment variables from .env
const { token } = process.env;  // Bot token loaded from .env
const { Client, GatewayIntentBits } = require('discord.js');  // Import Discord.js
const fs = require('fs');  // File system module (if needed for commands or files)
const mongoose = require('mongoose');  // Import mongoose for MongoDB interactions
const commandHandler = require('./handler/commandHandler.js');
require('./handler/commandHandler.js');
//const messageCountSchema = require('./messageCountSchema');  // Import the message count schema

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,               // For general guild events
        GatewayIntentBits.GuildMembers,         // For tracking member joins
        GatewayIntentBits.MessageContent,       // For reading message content
        GatewayIntentBits.GuildMessages,        // For handling messages in guilds
    ]
});

client.userNames = new Map();//declaring variable to store usernames
//const commands = JSON.parse(fs.readFileSync('commands.json'));//file to read commands from

// Event listener for when the bot is ready
    client.once('ready', () => {
        console.log('Bot is online!');
        mongoose.connect(process.env.mongo_uri,{
            //keepAlive: true,
            keepAliveInitialDelay: 30000,
        });

        commandHandler(client);
    });
        




client.on('guildMemberAdd', member => {
    const channel = member.guild.channels.cache.find(ch => ch.name === 'general');
    if (!channel) return;
    channel.send(`Hello, ${member.user.username}! Welcome to the server!`);
});





// Event listener for when a new member joins the server





// Log in to Discord with your app's token
client.login(token);