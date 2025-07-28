const fs = require('fs');
const path = require('path');
const { Configuration, OpenAIApi } = require('openai');
const mongoose = require('mongoose');  // Import mongoose for MongoDB interactions
const messageCountSchema = require('../messageCountSchema');  // Import the message count schema
const { getGPTResponse } = require('../functions/openAI');

module.exports = (client) => {
    // load all command files
    client.commands = new Map();
    const commandFiles = fs.readdirSync(path.join(__dirname, '..', 'commands')).filter(file => file.endsWith('.js'));
    let Option = '';

    for (const file of commandFiles) {
        const command = require(path.join(__dirname, '..', 'commands', file));
        client.commands.set(command.name, command);  // Store each command in a Map
    }
    
    // Listen for incoming messages and execute commands
    client.on('messageCreate', (message) => {
        if (message.author.bot) return;  // Ignore messages from other bots
        updateMessageCount(message);  // Update message count for the user
        if (!message.content.startsWith('!')) return;  // Ignore messages that don't start with '!'

        const args = message.content.slice(1).trim().split(/ +/);  // Split command and arguments
        const commandName = args.shift().toLowerCase();  // Get the command name

        // Execute the command if it's found in the Map
        if (client.commands.has(commandName)) {
            const command = client.commands.get(commandName);
            command.execute(message, args);  // Execute the command's function
        } else {
            message.channel.send('Unknown command. Type !help for a list of commands.');
        }
    });

    async function updateMessageCount(message) {
        const userId = message.author.id;  // Get the user's ID

    try {
        // Find the user by userId
        let user = await messageCountSchema.findOneAndUpdate({
            userId: userId
        }, {
            $inc: { userPoints: 5, messageCount: 1}  // Increment the message count by 5 as these will be the channel points
        }, {
            new: true,  // Return the updated document
            upsert: true  // Create a new document if it doesn't exist
        });

        
    } catch (error) {
        console.error('Error incrementing message count:', error);
    }
    }
};