require('dotenv').config();  // Loads environment variables from .env
const { OpenAI } = require('openai');

const openai = new OpenAI({
    apiKey: process.env.openai_api_key,  // OpenAI API key loaded from .env
});


async function getGPTResponse(message,Option) {
    try {


        if(Option === 'message') {
            const response = await openai.responses.create({     
            model: "gpt-4.1",  // Specify the model to use
            input: message,
        });
        return(response.output_text);   
        }else if(Option === 'image') {
            const response = await openai.responses.create({     
            model: "gpt-4.1",  // Specify the model to use
            input: message,
            tools: [{type: "image_generation"}],
            //size: "1024x1024",  // Specify the size of the image
        });
        const imageUrl = response.data[0].url;
        return({ content: "Here you go!", files: [imageUrl] });
        }

             //return response.data.choices[0].text.trim();  // Return the generated text
    } catch (error) {
        console.error('Error fetching GPT response:', error);
        return 'Sorry, I am unable to respond at the moment.';
    }
}

module.exports = {getGPTResponse};  // Export the function for use in other files
