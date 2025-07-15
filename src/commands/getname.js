module.exports = {
    name: 'getname',
    description: 'gets the user name',
    execute(message) {
        const userName = message.client.userNames.get(message.author.id);
        if (userName) {
            message.channel.send(`Your name is ${userName}, ${message.author.username}!`);
        }
        else {
        message.channel.send(`You have not set a username yet, ${message.author.username}. Use !setname <your name> to set one.`);
        }
    }
};