module.exports = {
    name: 'kick',
    execute (client, Discord, message, args, color, thumb) {
        const member = message.mentions.users.first();

		if(!message.member.roles.cache.some(r => r.name === "Mod Bot User")){
			return message.channel.send('You do not have the permissions to run this command!')
		} else if (member === message.author) {
            const synEmbed = new Discord.MessageEmbed()
            .setAuthor(`The PlagueCraft Network`, `${thumb}`, `https://plaguecraft.xyz`)
            .setTitle(`pcn!kick`)
            .setColor(color)
            .addFields(
                { name: 'Description', value: 'Kicks specified user (CANNOT BE YOURSELF).'},
                { name: 'Syntax', value: 'pcn!kick [user] [reason]' },
                { name: 'Missing Field', value: 'Self-punishment (I SAID STOP WHYYYY)'}
            )

            return message.channel.send(synEmbed)
        } else if(!args[0]) {
            const synEmbed = new Discord.MessageEmbed()
            .setAuthor(`The PlagueCraft Network`, `${thumb}`, `https://plaguecraft.xyz`)
            .setTitle(`pcn!kick`)
            .setColor(color)
            .addFields(
                { name: 'Description', value: 'Kicks specified user (CANNOT BE YOURSELF).'},
                { name: 'Syntax', value: 'pcn!kick [user] [reason]' },
                { name: 'Missing Field', value: 'No user supplied'}
            )

            return message.channel.send(synEmbed)
        } else if (!args[1]) {
            const synEmbed = new Discord.MessageEmbed()
            .setAuthor(`The PlagueCraft Network`, `${thumb}`, `https://plaguecraft.xyz`)
            .setTitle(`pcn!kick`)
            .setColor(color)
            .addFields(
                { name: 'Description', value: 'Kicks specified user (CANNOT BE YOURSELF).'},
                { name: 'Syntax', value: 'pcn!kick [user] [reason]' },
                { name: 'Missing Field', value: 'No reason supplied'}
            )

            return message.channel.send(synEmbed)
        }

        if (member) {
            const reason = args.slice(1).join(' ');
            const memberTarget = message.guild.members.cache.get(member.id)
            try {
            memberTarget.kick();
			message.react('✔️')
            console.log(`User ${member.tag} was kicked by ${message.author.tag} for ${reason}`)
        }
        catch (err) {
            return message.channel.send(`Sorry, but there was an issue banning ${member.tag}. The team has been notified of this issue.`)
        }

            const kickEmbed = new Discord.MessageEmbed()
            .setAuthor(`The PlagueCraft Network`, `${thumb}`, `https://plaguecraft.xyz/`)
            .setTitle(`User Kicked!`)
            .setColor(color)
            .addFields(
                { name: 'User', value: member.tag }, 
                { name: 'Kicked By', value: message.author.tag },
                { name: 'Reason', value: reason }
            )
            .setTimestamp();

			const channel = client.channels.cache.find(channel => channel.id === process.env.punishmentLog)

			channel.send(kickEmbed);
        }
    } 
}