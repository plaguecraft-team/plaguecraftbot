module.exports = {
    name: 'temp',
    async execute(client, Discord, message, args, ms, color, thumb) {

        const member = message.mentions.users.first();
        if(!message.member.roles.cache.some(r => r.name === "Mod Bot User")){ // Returns a message if the user is not a mod
            return message.channel.send('You do not have the permissions to run this command!')
        } else if (!args[0]) {
            return message.channel.send(`You need to specify what you want to do (ban or mute)!`)
        } else if (!args[1]) {
            return message.channel.send(`You need to specify a user to ${args[0]}!`)
        } else if (!args[2]) {
            return message.channel.send(`You didn't specify a duration of time to ${args[0]} this user for!`)
        } else if (isNaN(args[0])) {
            return message.channel.send(`Please provide a real number (with s, m, or h) for the duration.`)
        } else if (member === message.author) {
            return message.channel.send(`You can't ${args[0]} yourself!`)
        } else {
            try {
                if(args[0] === 'ban') {
                    const reason = args.slice(3).join(' ');
                    let memberTarget = message.guild.members.cache.get(member.id);
                memberTarget.ban(); // Add the muted role
                message.react('✔️')
                console.log(`User ${member.tag} has been tempbanned for ${ms(ms(args[2]))} by ${message.author.tag}\nReason: ${reason}`) // Console log the mute
                const banTimedEmbed = new Discord.MessageEmbed() // Create and send an embed
    
                .setAuthor(`The PlagueCraft Network`, `${thumb}`, `https://plaguecraft.xyz`)
                .setTitle('Banned!')
                .addFields(
                    { name: 'User', value: member.tag },
                    { name: 'Banned by', value: message.author.tag },
                    { name: 'Length of punishment', value: ms(ms(args[2])) },
                    { name: 'Reason', value: reason }
                )
                .setColor(color)
                .setTimestamp();
    
                const channel = client.channels.cache.find(channel => channel.id === process.env.punishmentLog)
                channel.send(banTimedEmbed) // Send the embed to channel  

                setTimeout(function () {
                    message.guild.members.unban(memberTarget.id); // Removes the ban
                }, ms(args[2]));
            }
            }
            catch (err) {
                return message.channel.send(`I couldn't ban that user due to an internal error. The team has been notified of this error.`)
            }

            if(args[0] === 'mute') {
                try{
                const reason = args.slice(3).join(' ');
                let muteRole = message.guild.roles.cache.find(role => role.name === 'Muted');
                let memberTarget = message.guild.members.cache.get(member.id);

                memberTarget.roles.add(muteRole.id); // Add the muted role
                message.react('✔️')
                console.log(`User ${member.username} has been muted for ${ms(ms(args[2]))}\nReason: ${reason}`) // Console log the mute

                const muteTimedEmbed = new Discord.MessageEmbed() // Create and send an embed
                .setAuthor(`The PlagueCraft Network`, `${thumb}`, `https://plaguecraft.xyz`)
                .setTitle('Muted!')
                .addFields(
                    { name: 'User', value: member.tag },
                    { name: 'Muted by', value: message.author.tag },
                    { name: 'Length of mute', value: ms(ms(args[2])) },
                    { name: 'Reason', value: reason } 
                )
                .setColor(color)
                .setTimestamp();
    
                const channel = client.channels.cache.find(channel => channel.id === process.env.punishmentLog)
                channel.send(muteTimedEmbed) // Send the embed to channel
                
                setTimeout(function () {
                    memberTarget.roles.remove(muteRole.id); // Removes the role when time is up.
                }, ms(args[2]));
            }
                catch (err) {
                    return message.channel.send(`I couldn't ban ${member.tag} due to an internal error. The team has been notified of this error.`)
                }
            }
        }
    }
}