require('dotenv').config();  // Loads environment variables from .env

const { OpenAI } = require('openai');

const openai = new OpenAI({
    apiKey: process.env.openai_api_key,  // OpenAI API key loaded from .env
});


async function getGPTResponse(message) {
    try {
        const response = await openai.chat.completions.create({
            model: 'gpt-3.5-turbo',  // Specify the model to use
            messages: [{ role: 'user', content: message }],
        });

        return response.data.choices[0].text.trim();  // Return the generated text
    } catch (error) {
        console.error('Error fetching GPT response:', error);
        return 'Sorry, I am unable to respond at the moment.';
    }
}

module.exports = {getGPTResponse};  // Export the function for use in other files
