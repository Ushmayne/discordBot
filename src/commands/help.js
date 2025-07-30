module.exports = {
    name: 'help',
    description: 'Displays a list of all available commands.',
    execute(message) {
        const helpMessage = `
        Here are the available commands:
        !hello - Says hello to the user.
        !setname <name> - Set your name.
        !getname - Tells you your stored name.
        !gptchat <message> - Chat with the bot using GPT-4.
        !gptimage <image description> - Ask GPT-4 to generate an image for you
        !channelpoints - Displays how many channel points you have and how many messages you have sent in the discord
        !roulette <amount to bet>- Gamble your channel points and play roulette with the bot
        `;
        message.channel.send(helpMessage);
    }
};