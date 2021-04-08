const ms = require('ms');

module.exports = {
    name: 'mute',
    description: "PCN Mute Command",
    execute(message, args, Discord, client) {
        
        if(message.member.roles.cache.some(r => r.name === "Mod Bot User")){
        const target = message.mentions.users.first();
        

        if(!args.length) {
                return message.reply(`you didn't specify a user!`);
            }

        if (target) {
 
             let muteRole = message.guild.roles.cache.find(role => role.name === 'Muted');
 
            let memberTarget = message.guild.members.cache.get(target.id);
 
            if (!args[1]) {
                memberTarget.roles.add(muteRole.id);
                message.channel.send(`<@${memberTarget.user.id}> has been muted`);
                console.log(`UID ${memberTarget} has been muted!`)
                
                    let messageArgs = args.join(' ');
                const muteEmbed = new Discord.MessageEmbed()
            
            .setTitle('Muted!')
            .setThumbnail('https://plaguecraft.xyz/assets/img/logo.png')
            .setDescription(`${message.author} has muted ${memberTarget}!`)
            .setColor('#c7002e')
            .setFooter('PCN Mutes')
            .setTimestamp();

            const channel = client.channels.cache.find(channel => channel.name === "punishments")
            channel.send(muteEmbed)
            const notichannel = client.channels.cache.find(channel => channel.name === "muted-notifications")
                notichannel.send(`Hey ${memberTarget}, you were muted indefinitely.\nIf you'd like to appeal, please follow the steps listed in the **muted-users** channel.`)

            
                return
            }
            memberTarget.roles.add(muteRole.id);
            message.channel.send(`<@${memberTarget.user.id}> has been muted for ${ms(ms(args[1]))}`);
            console.log(`UID ${memberTarget} has been muted for ${ms(ms(args[1]))}`)
            const muteTimedEmbed = new Discord.MessageEmbed()
            
            .setTitle('Muted!')
            .setThumbnail('https://plaguecraft.xyz/assets/img/logo.png')
            .setDescription(`${message.author} has muted ${memberTarget} for ${ms(ms(args[1]))}!`)
            .setColor('#c7002e')
            .setFooter(`PCN Mutes`)
            .setTimestamp();

            const channel = client.channels.cache.find(channel => channel.name === "punishments")
            channel.send(muteTimedEmbed)

            const notitimedchannel = client.channels.cache.find(channel => channel.name === "muted-notifications")
            notitimedchannel.send(`Hey ${memberTarget}, you were muted for ${ms(ms(args[1]))}.\nIf you'd like to appeal, please follow the steps listed in the **muted-users** channel.`)
 
            setTimeout(function () {
                memberTarget.roles.remove(muteRole.id);
            }, ms(args[1]));
        } else {
            message.channel.send(`I can't find that member!`);
            }
        } else {
            message.reply('You do not have the permissions to use this command!')
        }

    }
}