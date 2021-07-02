module.exports = {
    name: 'playerreport',
    async execute(Discord, client, message, args, minecraftPlayer, color, thumb) {

		if(!args[0]) {
            const synEmbed = new Discord.MessageEmbed()
            .setAuthor(`The PlagueCraft Network`, `${thumb}`, `https://plaguecraft.xyz`)
            .setTitle(`pcn!playerreport`)
            .setColor(color)
            .addFields(
				{ name: 'Description', value: 'Submits a MC player report to the team via Discord.'},
                { name: 'Syntax', value: 'pcn!playerreport [ign-to-report]' },
				{ name: 'Missing Field', value: 'No IGN supplied'}
            )

            return message.channel.send(synEmbed)
		}

		if(!args[1]) {
            const synEmbed = new Discord.MessageEmbed()
            .setAuthor(`The PlagueCraft Network`, `${thumb}`, `https://plaguecraft.xyz`)
            .setTitle(`pcn!playerreport`)
            .setColor(color)
            .addFields(
				{ name: 'Description', value: 'Submits a MC player report to the team via Discord.'},
                { name: 'Syntax', value: 'pcn!playerreport [ign-to-report]' },
				{ name: 'Missing Field', value: 'No reason supplied'}
            )

            return message.channel.send(synEmbed)
		}

		try{
        const { uuid } = await minecraftPlayer(`${args[0]}`)

		const reason = args.slice(1).join(' ');

		message.delete();

		const reportEmbed = new Discord.MessageEmbed()
		.setAuthor(`The PlagueCraft Network`, `${thumb}`, `https://plaguecraft.xyz`)
		.setTitle(`In-Game Player Report!`)
		.setColor(color)
		.addFields(
			{ name: 'Reported User', value: args[0] },
			{ name: 'Reporter', value: message.author.tag },
			{ name: 'Reported Users UUID', value: uuid }
		)
		.setTimestamp();

            const channel = client.channels.cache.find(channel => channel.id === process.env.reportsLog)
			channel.send(reportEmbed);
			console.log(`${message.author.tag} has made a report on ${args[0]}`)
		}
			catch(err){
				return message.channel.send(`That player could not be found via their Mojang UUID! If you're tagging someone in this Discord, that won't work (use **pcn!report** for that). You'll need to do it with their in-game name.`)
			}
		}
}