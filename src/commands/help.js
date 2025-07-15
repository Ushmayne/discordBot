module.exports = {
    name: 'help',
    description: 'Displays a list of all available commands.',
    execute(message) {
        const helpMessage = `
        Here are the available commands:
        !hello - Says hello to the user.
        !setname <name> - Set your name.
        !getname - Tells you your stored name.
        `;
        message.channel.send(helpMessage);
    }
};