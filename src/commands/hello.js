module.exports = {
    name: 'hello',
    description: 'Says hello to the user.',
    execute(message) {
        message.channel.send(`Hello, ${message.author.username}!`);
    }
};