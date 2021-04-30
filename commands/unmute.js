module.exports = {
    name: 'unmute',
    description: "PCN Unmute Command",
    execute(client, Discord, message, args) {
            const target = message.mentions.users.first();
        
            if(!message.member.roles.cache.some(r => r.name === "Mod Bot User")){
			    return message.channel.send('You do not have the permissions to run this command!')
		    }
        
            if(!args.length) {
                return message.reply(`You didn't specify a user to unmute!`);
            }
        
            if (target === message.author) { // Makes sure the user isn't the same as the message author
                return message.channel.send(`How are you expecting to unmute yourself when you can't even mute yourself in the first place?`)
            }

            if (message.member.hasPermission("ADMINISTRATOR") || message.member.hasPermission("KICK_MEMBERS")) {
                return message.channel.send(`${target} is too high in the role hierarchy to unmute!`)
            }

        if(target){
            
            let muteRole = message.guild.roles.cache.find(role => role.name === 'Muted');
            let memberTarget = message.guild.members.cache.get(target.id);

            memberTarget.roles.remove(muteRole.id);
            message.channel.send(`${memberTarget} has been unmuted.`)  
            console.log(`UID ${memberTarget} has been unmuted!`)     
            
            const channel = client.channels.cache.find(channel => channel.name === "punishments")

            const unmuteEmbed = new Discord.MessageEmbed()
            
            .setTitle('Unmuted!')
            .setThumbnail('https://plaguecraft.xyz/storage/assets/img/logo.png')
            .setDescription(`${message.author} has unmuted ${memberTarget}!`)
            .setColor('#03fc41')  
            .setFooter(`PCN Unmutes`)
            .setTimestamp();

            channel.send(unmuteEmbed);

        } else{
            message.reply('I could not find that member!')
        }
    }
}