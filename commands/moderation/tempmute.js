module.exports = {
    name: 'tempmute',
    execute(client, Discord, message, args, ms) {
        const member = message.mentions.users.first();

        if(!message.member.roles.cache.some(r => r.name === "Mod Bot User")){ // Returns a message if the user is not a mod
            return message.channel.send('You do not have the permissions to run this command!')
        } else if (!args[0]) {
            return message.reply(`you need to specify a user to mute!`)
        } else if (member === message.author) {
            return message.channel.send(`You can't tempmute yourself, ${message.author}!`)
        } else if (!args[1]) {
            return message.reply(`you need to specify a time to mute this user for!`)
        } else if (!args[2]) {
            return message.reply(`you need to specify why you're muting this user!`)
        }

        if(member) {
            const reason = args.slice(2).join(' ');
            let muteRole = message.guild.roles.cache.find(role => role.name === 'Muted');
            let memberTarget = message.guild.members.cache.get(target.id);

            try {
                memberTarget.roles.add(muteRole.id); // Add the muted role
                message.react('✔️')
                console.log(`UID ${memberTarget} has been muted for ${ms(ms(args[1]))}\nReason: ${reason}`) // Console log the mute
                const muteTimedEmbed = new Discord.MessageEmbed() // Create and send an embed
    
                .setTitle('Muted!')
                .setThumbnail('https://plaguecraft.xyz/storage/assets/img/logo.png')
                .setDescription(`${message.author} has muted ${memberTarget} for ${ms(ms(args[1]))}!\n**Reason: ${reason}**`)
                .setColor('#c7002e')
                .setFooter(`PCN Mutes`)
                .setTimestamp();
    
                const channel = client.channels.cache.find(channel => channel.name === "📞bot-notifications📞") // Define Channel
                channel.send(muteTimedEmbed) // Send the embed to channel
                
                setTimeout(function () {
                    memberTarget.roles.remove(muteRole.id); // Removes the role when time is up.
                }, ms(args[1]));
            }
            catch (err) {
                console.log(`There was an error tempmuting ${memberTarget.username}:`, err)
                return message.channel.send(`I couldn't ban ${memberTarget} due to an internal error. Please contact Awex or someone from the dev team.`)
            }
        }
    }
}