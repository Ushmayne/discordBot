const messageCountSchema = require('../messageCountSchema');  // Import the message count schema 
const mongoose = require('mongoose');

module.exports = {
    name: 'channelpoints',
    description: 'gets the users channel points from the database',
    async execute(message) {
        const userId = message.author.id;//gets user id for the user
        try{
            const user = await messageCountSchema.findOne({ userId: userId }); // Find the user by userId      
            message.channel.send(`Your channel points: ${user.userPoints} \n Number of messages sent: ${user.messageCount}`);
        }catch{//if there is an error it will display the error
            console.error('Error fetching points:', error);
            message.channel.send('An error occurred while fetching your points.');
            return;
        }
    }
};