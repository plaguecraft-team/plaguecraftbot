module.exports = {
    name: 'mute',
    description: "PCN Mute Command",
    execute(message, args, Discord, client) {
        
        if(message.member.roles.cache.some(r => r.name === "Mod Bot User")){
        const target = message.mentions.users.first();
        

        if(!args[0]) {
                return message.reply(`you didn't specify a user!`);
            }

        if(!args[1]) {
            return message.reply(`you didn't specify a reason!`)
        }

        if (target) {
            const reason = args.slice(1).join(' ');

             let muteRole = message.guild.roles.cache.find(role => role.name === 'Muted');
 
            let memberTarget = message.guild.members.cache.get(target.id);
 
                memberTarget.roles.add(muteRole.id);
                message.channel.send(`<@${memberTarget.user.id}> has been muted`);
                console.log(`UID ${memberTarget} has been muted! Reason: ${reason}`)
                
                const muteEmbed = new Discord.MessageEmbed()
            
            .setTitle('Muted!')
            .setThumbnail('https://plaguecraft.xyz/assets/img/logo.png')
            .setDescription(`${message.author} has muted ${memberTarget}!\nReason: "${reason}"`)
            .setColor('#c7002e')
            .setFooter('PCN Mutes')
            .setTimestamp();

            const channel = client.channels.cache.find(channel => channel.name === "punishments")
            channel.send(muteEmbed)
            const notichannel = client.channels.cache.find(channel => channel.name === "muted-notifications")
                notichannel.send(`Hey ${memberTarget}, you were muted indefinitely for the reason: ${reason}\nIf you'd like to appeal, please follow the steps listed in the **muted-users** channel.`)
                    return
        } else {
            message.channel.send(`I can't find that member!`);
            }
        } else {
            message.reply('You do not have the permissions to use this command!')
        }
    }
}