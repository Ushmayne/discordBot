const messageCountSchema = require('../messageCountSchema');  // Import the message count schema 
const mongoose = require('mongoose');

module.exports = {
    name: 'getname',
    description: 'gets the user name fronm the database',
    async execute(message) {
        const userId = message.author.id;//gets user id for the user
        try{
            const user = await messageCountSchema.findOne({ userId: userId }); // Find the user by userId      
            if (user&& user.userName!== ' ') {
                message.channel.send(`Your name is: ${user.userName}`);
            } else{
                message.channel.send('You have not set a name yet. Use !setname to set your name.');
            }
        }catch{
            console.error('Error fetching user name:', error);
            message.channel.send('An error occurred while fetching your name.');
            return;
        }
    }
};