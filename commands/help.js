const Discord = require('discord.js');

module.exports = {
	name: 'help',
	description: "PCN Help Command",
	execute(messages, args) {

		const helpEmbed = new Discord.MessageEmbed()
		.setColor('#c7002e')
		.setTitle('PlagueCraftBot Help')
		.setURL('https://plaguecraft.xyz')
		.setAuthor('The PlagueCraft Network')
		.setDescription('The PlagueCraft Network is a Minecraft Network of gamemodes, with things like UHC, SkyWars, and more!\nThis command details our Bot commands.\n\nOur prefix is pcn!\n\n**pcn!help** - This embed lol\n\n**pcn!stats [econ, skywars] [player-name]** - Allows users to lookup economy and SkyWars data in the PlagueCraft Network Backend\n\n**pcn!ip** - Displays the MC Server IP\n\n**pcn!ticket** - Creates a help ticket (check out #ticket-help for more info).\n**pcn!suggest [suggestion]** - Make a suggestion to the server\n\n**pcn!report** - Reports a user to the PlagueCraft Network Moderation Team\n\n**pcn!status** - Shows the PlagueCraft Network Server Status')
		.setFooter(`PCN`)
		.setTimestamp()
		.setThumbnail('https://plaguecraft.xyz/assets/img/logo.png')

		messages.channel.send(helpEmbed);
	}
}