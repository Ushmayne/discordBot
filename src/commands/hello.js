module.exports = {//a simple hello command
    name: 'hello',
    description: 'Says hello to the user.',
    execute(message) {
        message.channel.send(`Hello, ${message.author.username}!`);
    }
};