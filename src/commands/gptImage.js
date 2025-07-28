const {getGPTResponse} = require('../functions/openAI');  // Import the OpenAI GPT function

module.exports = {
    name: 'gptimage',
    description: 'Get Image from GPT-4.',
    async execute(message) {
        const userMessage = "Generate an image of "+ message.content;  // Get the content of the user message
        Option = 'image';  // Set the option to 'image' for image generation
        try {
            message.channel.send(await getGPTResponse(userMessage,Option));//respond with the GPT-generated message
        } catch (error) {
            console.error('Error in GPT chat:', error);
            message.channel.send('There was an error while trying to chat with GPT.');
        }
    }
};