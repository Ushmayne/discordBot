const {getGPTResponse} = require('../functions/openAI');  // Import the OpenAI GPT function

module.exports = {
    name: 'gptchat',
    description: 'Chat with the bot using GPT-3/4.',
    async execute(message) {
        const userMessage = message.content;  // Get the content of the user message

        
        try {
            message.channel.send(await getGPTResponse(userMessage));//respond with the GPT-generated message
        } catch (error) {
            console.error('Error in GPT chat:', error);
            message.channel.send('There was an error while trying to chat with GPT.');
        }
    }
};