module.exports = {
    name: 'temp',
    async execute(client, Discord, message, args, ms) {
        const member = message.mentions.users.first();
        if(!message.member.roles.cache.some(r => r.name === "Mod Bot User")){ // Returns a message if the user is not a mod
            return message.channel.send('You do not have the permissions to run this command!')
        } else if (!args[0]) {
            return message.reply(`you need to specify what you want to do (ban or mute)!`)
        } else if (!args[1]) {
            return message.channel.send(`You need to specify a user to ${args[0]}!`)
        } else if (member === message.author) {
            return message.channel.send(`You can't ${args[0]} yourself!`)
        } else {
            try {
                if(args[0] === 'ban') {
                    const reason = args.slice(3).join(' ');
                    let memberTarget = message.guild.members.cache.get(member.id);
                memberTarget.ban(); // Add the muted role
                message.react('✔️')
                console.log(`UID ${memberTarget} has been tempbanned for ${ms(ms(args[2]))}\nReason: ${reason}`) // Console log the mute
                const banTimedEmbed = new Discord.MessageEmbed() // Create and send an embed
    
                .setTitle('Banned!')
                .setThumbnail('https://plaguecraft.xyz/storage/assets/img/logo.png')
                .setDescription(`${message.author} has tempbanned ${memberTarget} for ${ms(ms(args[2]))}!\n**Reason: ${reason}**`)
                .setColor('#c7002e')
                .setFooter(`PCN Bans`)
                .setTimestamp();
    
                // const channel = client.channels.cache.find(channel => channel.name === "📞bot-notifications📞") // Define Channel
                const channel = client.channels.cache.find(channel => channel.id === "856717402447675392")
                channel.send(banTimedEmbed) // Send the embed to channel  

                setTimeout(function () {
                    message.guild.members.unban(memberTarget.id); // Removes the role when time is up.
                }, ms(args[2]));
            }
            }
            catch (err) {
                console.log(`There was an error banning that user:`, err)
                return message.channel.send(`I couldn't ban that user due to an internal error. Please contact Awex or someone from the dev team.`)
            }

            if(args[0] === 'mute') {
                try{
                const reason = args.slice(3).join(' ');
                let muteRole = message.guild.roles.cache.find(role => role.name === 'Muted');
                let memberTarget = message.guild.members.cache.get(member.id);

                memberTarget.roles.add(muteRole.id); // Add the muted role
                message.react('✔️')
                console.log(`UID ${memberTarget} has been muted for ${ms(ms(args[2]))}\nReason: ${reason}`) // Console log the mute
                const muteTimedEmbed = new Discord.MessageEmbed() // Create and send an embed
    
                .setTitle('Muted!')
                .setThumbnail('https://plaguecraft.xyz/storage/assets/img/logo.png')
                .setDescription(`${message.author} has muted ${memberTarget} for ${ms(ms(args[2]))}!\n**Reason: ${reason}**`)
                .setColor('#c7002e')
                .setFooter(`PCN Mutes`)
                .setTimestamp();
    
                const channel = client.channels.cache.find(channel => channel.id === "856717402447675392") // Define Channel
                channel.send(muteTimedEmbed) // Send the embed to channel
                
                setTimeout(function () {
                    memberTarget.roles.remove(muteRole.id); // Removes the role when time is up.
                }, ms(args[2]));
            }
                catch (err) {
                    let memberTarget = message.guild.members.cache.get(member.id);
                    console.log(`There was an error tempmuting ${memberTarget.username}:`, err)
                    return message.channel.send(`I couldn't ban ${memberTarget.username} due to an internal error. Please contact Awex or someone from the dev team.`)
                }
            }
        }
    }
}