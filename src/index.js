require('dotenv').config();  // Loads environment variables from .env
const { token } = process.env;  // Bot token loaded from .env
const { Client, GatewayIntentBits } = require('discord.js');  // Import Discord.js
const fs = require('fs');  // File system module (if needed for commands or files)

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,               // For general guild events
        GatewayIntentBits.GuildMembers,         // For tracking member joins
        GatewayIntentBits.MessageContent,       // For reading message content
        GatewayIntentBits.GuildMessages,        // For handling messages in guilds
    ]
});

const userNames = new Map();//declaring variable to store usernames
const commands = JSON.parse(fs.readFileSync('commands.json'));//file to read commands from



client.once('ready', () => {
    console.log('Bot is online!');
});



// Event listener for when a new member joins the server
client.on('guildMemberAdd', member => {
    const channel = member.guild.channels.cache.find(ch => ch.name === 'general');
    if (!channel) return;
    channel.send(`Hello, ${member.user.username}! Welcome to the server!`);
});

// Event listener for the '!hello' command
client.on('messageCreate', (message) => {
    if (message.author.bot) return;  // Ignore messages from bots
    if (!message.content.startsWith('!')) return;  // Ignore messages that don't start with '!'
    const args = message.content.slice(1).trim().split(/ +/);//formating the message content into arguments
    const command = args.shift().toLowerCase();

    switch (command) {
        case 'hello':
            hello(message);
            break;
        case 'setname':
            setUserName(message,args.join(' '));//calls setUserName function with the message and the rest of the arguments as the username
            break;
        case 'getname':
            getUserName(message);//calls getUserName function with the author's id
            break;
        case 'help':
            displayHelp(message);//calls displayHelp function to show the available commands
        default:
            // If the command is not recognized, you can handle it here
            message.reply("Unknown command. Try '!help'.");
            break;
    }

    

});

function hello(message){
    message.reply(`Hello, ${message.author.username}!`);
}

function setUserName(message, userName) {//setting the username for the user in the userNames map
    if(userName.length > 0) {
        userNames.set(message.author.id, userName);
        message.reply(`Your username has been set to: ${userName}`);
        return;
    }else{
        message.reply("Please provide a valid username.");
        return;
    }
}

function getUserName(message) {
    const userName = userNames.get(message.author.id); // Get the username from the map using the author's ID
    if (userName) {
            message.channel.send(`Your name is ${userName}, ${message.author.username}!`);
    }
    else {
        message.channel.send(`You have not set a username yet, ${message.author.username}. Use !setname <your name> to set one.`);
    }
}

function displayHelp(message) {
    let helpMessage = 'Here are the available commands:\n';

    // Loop through all the commands and add them to the help message
    commands.commands.forEach(command => {
        helpMessage += `!${command.name} - ${command.description}\n`;
    });

    message.channel.send(helpMessage);
}


// Log in to Discord with your app's token
client.login(token);