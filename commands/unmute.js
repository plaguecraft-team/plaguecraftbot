const Discord = require('discord.js');

module.exports = {
    name: 'unmute',
    description: "PCN Unmute Command",
    execute(message, args, Discord, client) {

        if(message.member.roles.cache.some(r => r.name === "Mod Bot User")){

            if(!args.length) {
                return message.reply(`You didn't specify a user to unmute!`);
            }
                    const target = message.mentions.users.first();
        if(target){
            
            let muteRole = message.guild.roles.cache.find(role => role.name === 'Muted');
            let memberTarget = message.guild.members.cache.get(target.id);

            memberTarget.roles.remove(muteRole.id);
            message.channel.send(`${memberTarget} has been unmuted.`)  
            console.log(`UID ${memberTarget} has been unmuted!`)     
            
            const channel = client.channels.cache.find(channel => channel.name === "punishments")

            const unmuteEmbed = new Discord.MessageEmbed()
            
            .setTitle('Unmuted!')
            .setThumbnail('https://plaguecraft.xyz/assets/img/logo.png')
            .setDescription(`${message.author} has unmuted ${memberTarget}!`)
            .setColor('#03fc41')  
            .setFooter(`PCN Unmutes`)
            .setTimestamp();

            channel.send(unmuteEmbed);

        } else{
            message.reply('I could not find that member!')
        }
    } else{
        message.reply('You do not have the permissions to use this command!')
    }


    }
}