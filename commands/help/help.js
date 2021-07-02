module.exports = {
	name: 'help',
	description: "PCN Help Command",
	execute(client, Discord, message, args, color, thumb) {

		if(!args[0]) {

		const helpEmbed = new Discord.MessageEmbed()
		.setColor(`${color}`)
		.setTitle('Help Menu - Categories')
		.setAuthor('The PlagueCraft Network', `${thumb}`, "https://plaguecraft.xyz")
		.addFields(
			{ name: 'Category Name (case sensitive)', value: 'Description' },
			{ name: 'general', value: 'General Commands help (suggest, bug, etc)', inline: true },
			{ name: 'support', value: 'Support Commands (ticket, reports)', inline: false }
		)
		// .setDescription('The PlagueCraft Network is a Minecraft Network of gamemodes, with things like Prison and more!\nThis command details our Bot commands.\n\nOur prefix is pcn!\n\n**pcn!help** - This embed lol\n\n**pcn!ip** - Displays the MC Server IP\n\n**pcn!ticket** - Creates a help ticket (check out #ticket-help for more info).\n\n**pcn!suggest [suggestion]** - Make a suggestion to the server\n\n**pcn!report** - Reports a user to the PlagueCraft Network Moderation Team\n\n**pcn!playerreport** - Used ***only*** for reporting in-game players. Use **pcn!report** for reporting Discord users.\n\n**pcn!status** - Shows the PlagueCraft Network Server Status \n\n **pcn!invite** - Invite to this Discord server')
		.setTimestamp();

		return message.channel.send(helpEmbed);
		} else if(args[0] === 'general') {
			const genEmbed = new Discord.MessageEmbed()
			.setColor(`${color}`)
			.setTitle('Help Menu - General')
			.setAuthor('The PlagueCraft Network', `${thumb}`, 'https://plaguecraft.xyz')
			.addFields(
				{ name: '`bug`', value: `Sends a bug report to the bug channel`},
				{ name: '`suggest`', value: 'Sends a suggestion to the suggestion channel' },
				{ name: '`ip`', value: 'Sends the IP to the server'}, 
				{ name: '`ping`', value: 'Sends bot ping from the Discord API' },
				{ name: '`status`', value: 'Sends status of the Minecraft server'}
			)
			.setTimestamp();

			return message.channel.send(genEmbed)
		} else if (args[0] === `support`) {
			const supportEmbed = new Discord.MessageEmbed()
			.setColor(`${color}`)
			.setTitle(`Help Menu - Support`)
			.setAuthor(`The PlagueCraft Network`, `${thumb}`, `https://plaguecraft.xyz`)
			.addFields(
				{ name: '`ticket`', value: 'Sends a ticket to the PlagueCraft Team' },
				{ name: '`playerreport`', value: 'Sends a report to the PCN Mod Team (ONLY FOR REPORTING MC PLAYERS)' },
				{ name: '`report`', value: 'Sends a report for a Discord user to the PCN Mod Team (ONLY FOR REPORTING DISCORD USERS' },
			)
			.setTimestamp();

			return message.channel.send(supportEmbed)
		} else if (args[0] != 'general' || 'support') {
			const notfoundEmb = new Discord.MessageEmbed()
			.setAuthor(`The PlagueCraft Network`, `${thumb}`, `https://plaguecraft.xyz/`)
			.settitle(`Help Menu - Not Found`)
			.setDescription(`The page you tried to access doesn't exist. Make sure your casing (it should be all lowercase) and spelling is correct.`)
		}
	}
}