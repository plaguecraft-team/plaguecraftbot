const Discord = require('discord.js');

module.exports = {
    name: 'unmute',
    description: "PCN Unmute Command",
    execute(messages, args) {

        if(message.member.roles.cache.some(r => r.name === "Mod Bot User")){
                    const target = messages.mentions.users.first();
        if(target){
            let muteRole = messages.guild.roles.cache.find(role => role.name === 'Muted');

            let memberTarget = messages.guild.members.cache.get(target.id);

            memberTarget.roles.remove(muteRole.id);
            messages.reply('That user has been unmuted.')            
        } else{
            messages.reply('I could not find that member!')
        }
    } else{
        messages.reply('You do not have the permissions to use this command!')
    }


    }
}