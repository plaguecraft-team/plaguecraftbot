module.exports = {
    name: 'mute',
    async execute(client, Discord, message, args, color, thumb) {

        const member = message.mentions.users.first();

        if(!message.member.roles.cache.some(r => r.name === "Mod Bot User")){
            return message.channel.send('You do not have the permissions to run this command!')
        } else if(member === message.author) {
            const synEmbed = new Discord.MessageEmbed()
            .setAuthor(`The PlagueCraft Network`, `${thumb}`, `https://plaguecraft.xyz`)
            .setTitle(`pcn!mute`)
            .setColor(color)
            .addFields(
                { name: 'Description', value: 'Mutes specified user (CANNOT BE YOURSELF).'},
                { name: 'Syntax', value: 'pcn!mute [user] [reason]' },
                { name: 'Missing Field', value: 'Not a valid user (stop trying to mute yourself!)'}
            )

            return message.channel.send(synEmbed)
        } else if(!args[0]) {
            const synEmbed = new Discord.MessageEmbed()
            .setAuthor(`The PlagueCraft Network`, `${thumb}`, `https://plaguecraft.xyz`)
            .setTitle(`pcn!mute`)
            .setColor(color)
            .addFields(
                { name: 'Description', value: 'Mutes specified user (CANNOT BE YOURSELF).'},
                { name: 'Syntax', value: 'pcn!mute [user] [reason]' },
                { name: 'Missing field', value: 'No user tagged' }
            )

            return message.channel.send(synEmbed)
        } else if(!args[1]) {
            const synEmbed = new Discord.MessageEmbed()
            .setAuthor(`The PlagueCraft Network`, `${thumb}`, `https://plaguecraft.xyz`)
            .setTitle(`pcn!mute`)
            .setColor(color)
            .addFields(
                { name: 'Description', value: 'Mutes specified user (CANNOT BE YOURSELF).'},
                { name: 'Syntax', value: 'pcn!mute [user] [reason]' },
                { name: 'Missing Field', value: 'reason' }
            )

            return message.channel.send(synEmbed)
        }

        if(member) {
            const reason = args.slice(1).join(' ');
            let muteRole = message.guild.roles.cache.find(role => role.name === 'Muted');
            let memberTarget = message.guild.members.cache.get(member.id);

            try {
                memberTarget.roles.add(muteRole.id)
                message.react('✔️')
                console.log(`${member.tag} was muted by ${message.author.tag} for ${reason}.`)

                const muteEmbed = new Discord.MessageEmbed()
                .setAuthor(`The PlagueCraft Network`, `${thumb}`, `https://plaguecraft.xyz`)
                .setTitle('Muted!')
                .addFields(
                    { name: `User`, value: member.tag },
                    { name: 'Muted by', value: message.author.tag },
                    { name: `Reason`, value: reason }
                )
                .setColor(color)
                .setTimestamp();
    
                const channel = await message.guild.channels.cache.find(channel => channel.id === process.env.punishmentLog)
                channel.send(muteEmbed)
            }
            catch (err) {
                return message.channel.send(`I couldn't mute ${member.tag} due to an internal error. The team has been notified of this error.`)
            }

        } else if (!member || !memberTarget) {
            return message.channel.send(`I couldn't find that user.`)
        }
    }
}