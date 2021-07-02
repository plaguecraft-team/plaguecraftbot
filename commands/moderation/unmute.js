module.exports = {
    name: 'unmute',
    execute(client, Discord, message, args, color, thumb) {
        const member = message.mentions.users.first();

        if(!message.member.roles.cache.some(r => r.name === "Mod Bot User")){
            return message.channel.send('You do not have the permissions to run this command!')
        } else if (!args.length) {
            return message.reply(`You didn't specify a user to unmute!`);
        } else if (member === message.author) {
            return message.channel.send(`How are you expecting to unmute yourself when you can't even mute yourself in the first place?`)
        }

        if(member) {
            let muteRole = message.guild.roles.cache.find(role => role.name === 'Muted');
            let memberTarget = message.guild.members.cache.get(member.id);

            try {
                memberTarget.roles.remove(muteRole.id);
                message.react('✔️')  
                console.log(`User ${member.tag} has been unmuted!`)     
                
                const channel = client.channels.cache.find(channel => channel.id === process.env.punishmentLog)
    
                const unmuteEmbed = new Discord.MessageEmbed()
                
                .setAuthor(`The PlagueCraft Network`, `${thumb}`, `https://plaguecraft.xyz`)
                .setTitle('Unmuted!')
                .addFields(
                    { name: 'User', value: member.tag }, 
                    { name: 'Unmuted by', value: message.author.tag }
                )
                .setColor(color)  
                .setTimestamp();
    
                channel.send(unmuteEmbed);
            }
            catch (err) {
                return message.channel.send(`I couldn't unmute ${member.tag} due to an internal error. The team has been notified of this error.`)
            }
        }
    }
}