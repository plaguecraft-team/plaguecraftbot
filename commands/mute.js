module.exports = {
    name: 'mute',
    description: "PCN Mute Command",
    execute(client, Discord, message, args) {
        
        const target = message.mentions.users.first();

            if(!message.member.roles.cache.some(r => r.name === "Mod Bot User")){
                return message.channel.send('You do not have the permissions to run this command!')
            }

            if(!args[0]) {
                return message.reply(`you didn't specify a user!`);
            }


            if (target === message.author) {
                return message.channel.send(`You can't mute yourself, ${message.author}!`)
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
            .setThumbnail('https://plaguecraft.xyz/storage/assets/img/logo.png')
            .setDescription(`${message.author} has muted ${memberTarget}!\nReason: "${reason}"`)
            .setColor('#c7002e')
            .setFooter('PCN Mutes')
            .setTimestamp();

            const channel = client.channels.cache.find(channel => channel.name === "📞bot-notifications📞")
            channel.send(muteEmbed)

            try {
                memberTarget.send(`You were muted indefinitely in the PlagueCraft Network server.\nReason: ${reason}`)
            }
            catch(err) {
                console.log(`Could not send message to ${memberTarget}`)
            }

        } else {
            message.channel.send(`I can't find that member!`);
        }
    }
}