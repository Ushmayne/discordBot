module.exports = {
    name: 'setname',
    description: 'Sets a name for the user.',
    execute(message, args) {
        const userName = args.join(' ');
        if (userName) {
            message.client.userNames.set(message.author.id, userName);
            message.channel.send(`Your name has been set to: ${userName}`);
        } else {
            message.channel.send('Please provide a name!');
        }
    }
};