module.exports = {
	name: 'report',
	description: 'Allows someone to report a user',
	execute(client, Discord, message, args, color, thumb) {

		const member = message.mentions.users.first();

		if(!args[0]) {
			return message.channel.send(`You didn't specify a user!`)
		} else if(!args[1]) {
			return message.channel.send(`You didn't specify a reason!`)
		}

		const reason = args.slice(1).join(' ');
		message.delete();

		const reportEmbed = new Discord.MessageEmbed()
		.setTitle(`Report!`)
		.setAuthor(`The PlagueCraft Network`, `${thumb}`, `https://plaguecraft.xyz`)
		.setColor(color)
		.addFields(
			{ name: 'Reported User', value: member.tag },
			{ name: 'Reporter', value: message.author.tag },
			{ name: 'Reason', value: reason }
		)
		.setTimestamp();

            const channel = client.channels.cache.find(channel => channel.id === process.env.reportsLog)
			channel.send(reportEmbed);
			console.log(`${message.author.username} has made a report on ${member.username} for "${reason}"`)
	}
}