module.exports = {
    name: 'mute',
    execute(client, Discord, message, args) {
        const member = message.mentions.users.first();

        if(!message.member.roles.cache.some(r => r.name === "Mod Bot User")){
            return message.channel.send('You do not have the permissions to run this command!')
        } else if(member === message.author) {
            return message.channel.send(`You can't mute yourself, ${message.author}!`)
        } else if(!args[0]) {
            return message.reply(`you didn't specify a user!`);
        } else if(!args[1]) {
            return message.reply(`you didn't specify a reason!`)
        }

        if(member) {
            const reason = args.slice(1).join(' ');
            let muteRole = message.guild.roles.cache.find(role => role.name === 'Muted');
            let memberTarget = message.guild.members.cache.get(member.id);
            try {
                memberTarget.roles.add(muteRole.id)
                message.react('✔️')
                console.log(`${memberTarget.username} was muted by ${message.author.username} for ${reason}.`)

                const muteEmbed = new Discord.MessageEmbed()
            
                .setTitle('Muted!')
                .setThumbnail('https://plaguecraft.xyz/storage/assets/img/logo.png')
                .setDescription(`${message.author} has muted ${memberTarget}!\nReason: "${reason}"`)
                .setColor('#c7002e')
                .setFooter('PCN Mutes')
                .setTimestamp();
    
                const channel = client.channels.cache.find(channel => channel.id === "856717402447675392")
                channel.send(muteEmbed)
            }
            catch (err) {
                console.log(`There was an error trying to mute ${memberTarget.username}:`, err)
                return message.channel.send(`I couldn't mute ${memberTarget.username} due to an internal error. Please contact Awex or someone from the dev team.`)
            }

        } else if (!member) {
            return message.channel.send(`I couldn't find ${member.username}.`)
        }
    }
}