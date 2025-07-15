const messageCountSchema = require('../messageCountSchema');
const mongoose = require('mongoose');

module.exports = {
    name: 'setname',
    description: 'Sets a name for the user.',
    async execute(message, args) {

        const userName = args.join(' ');
        const userId = message.author.id;

        if (userName&&userName!== ' ') {
            try{
                let user = await messageCountSchema.findOne({userId: userId}); // Find the user by userId
                if(!user) {
                    user = new messageCountSchema({ userId: userId, userName: userName }); // Create a new user if not found
                    await user.save(); // Save the new user to the database
                }else{
                    user.userName = userName; // Update the user's name
                    await user.save(); // Save the updated user to the database
                }

                message.channel.send(`Your name has been set to: ${userName}`);
                
            }catch (error) {
                console.error('Error setting user name:', error);
                message.channel.send('An error occurred while setting your name.');
                return;
            }

        } else {
            message.channel.send('Please provide a name!');
        }
    }
};