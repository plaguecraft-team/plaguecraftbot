const Discord = require('discord.js');

module.exports = {
    name: 'unmute',
    description: "PCN Unmute Command",
    execute(message, args) {

        if(message.member.roles.cache.some(r => r.name === "Mod Bot User")){

            if(!args.length) {
                return message.reply(`You didn't specify a user to unmute!`);
            }
                    const target = message.mentions.users.first();
        if(target){
            let muteRole = message.guild.roles.cache.find(role => role.name === 'Muted');

            let memberTarget = message.guild.members.cache.get(target.id);

            memberTarget.roles.remove(muteRole.id);
            message.reply('That user has been unmuted.')  
            console.log(`UID ${memberTarget} has been unmuted!`)          
        } else{
            message.reply('I could not find that member!')
        }
    } else{
        message.reply('You do not have the permissions to use this command!')
    }


    }
}