const messageCountSchema = require('../messageCountSchema');  // Import the message count schema 
const mongoose = require('mongoose');

module.exports = {
    name: 'roulette',
    description: 'the user can play roulette',
    async execute(message,args) {
        
        const userId = message.author.id;//gets user id for the user
        let bet= parseInt(args[0]);
        if (isNaN(bet)) {
            return message.reply("Please enter a valid number.");
        }
        try{
            const user = await messageCountSchema.findOne({ userId: userId }); // Find the user by userId      
            //message.channel.send(`Your channel points: ${user.userPoints} \n Number of messages sent: ${user.messageCount}`);
            if(user.userPoints!==0&&bet<=user.userPoints&&bet>0){
                const filter = (reaction, user) =>["🔴", "⚫", "🟢"].includes(reaction.emoji.name) && user.id === message.author.id;
                const betMessage = await message.channel.send("Place your bet!\n🔴 for Red\n⚫ for Black\n🟢 for Green") 
                
                await betMessage.react("🔴");
                await betMessage.react("⚫");
                await betMessage.react("🟢");
                const collector=betMessage.createReactionCollector({ filter, max: 1, time: 15000 });
                
                collector.on("collect", async (reaction) => {
                    let chosenColor;

                    switch (reaction.emoji.name) {
                        case "🔴":
                        chosenColor = "red";
                        break;
                        case "⚫":
                        chosenColor = "black";
                        break;
                        case "🟢":
                        chosenColor = "green";
                        break;
                        default:
                        break;
                    }
                    await message.channel.send(`You bet on **${chosenColor}**! Spinning the wheel... 🎲`);
                    bet=await playRoulette(message,user,bet,chosenColor);
                    user.userPoints += bet;
                    await user.save();
                });             
                

            }else{
                message.channel.send('Sorry you do not have enough cash please go to the ATM to collect some more');
            }

        }catch (error){//if there is an error it will display the error
            console.error('Error fetching points:', error);
            message.channel.send('Sorry this table is closed.');
            return;
        }
    }
};

async function playRoulette(message, user,bet,chosenColor) {

    if(bet>=0){
        let spinResult = Math.floor(Math.random() * 38) + 1;
        let redNumbers = [1,3,5,7,9,12,14,16,18,19,21,23,25,27,30,32,34,36];
        let color= '';
        //return redNumbers.includes(number) ? "Red" : "Black";
        if(spinResult===37 ||spinResult===38){//if it is green
            color='green';
            spinResult = Math.random() < 0.5 ? 0 : 1;
            if(spinResult===1){
                spinResult='00';
            }
        }else if(redNumbers.includes(spinResult)){//if it is red
            color='red';
        }else{//if it is black
            color='black';
        }   
        message.channel.send(`Ball stops at: ${color} ${spinResult}`);
        if(color===chosenColor){
            if(chosenColor==='green'){
                bet=bet*35;
            }
            message.channel.send(`🎉 CONGRATS YOU WON ${bet} 🎉`);
        }else{
            message.channel.send(`😢 Better luck next time. You lost 😢`);
            bet=bet*(-1);
        }

    }else{
        message.channel.send('Please enter a proper amount :)');
    }

    return (bet);
    
}