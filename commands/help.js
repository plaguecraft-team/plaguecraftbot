module.exports = {
	name: 'help',
	description: "PCN Help Command",
	execute(client, Discord, message, args) {

		const helpEmbed = new Discord.MessageEmbed()
		.setColor('#c7002e')
		.setTitle('PlagueCraftBot Help')
		.setURL('https://plaguecraft.xyz')
		.setAuthor('The PlagueCraft Network')
		.setDescription('The PlagueCraft Network is a Minecraft Network of gamemodes, with things like UHC, SkyWars, and more!\nThis command details our Bot commands.\n\nOur prefix is pcn!\n\n**pcn!help** - This embed lol\n\n**pcn!stats [econ, skywars] [player-name]** - Allows users to lookup economy and SkyWars data in the PlagueCraft Network Backend\n\n**pcn!ip** - Displays the MC Server IP\n\n**pcn!ticket** - Creates a help ticket (check out #ticket-help for more info).\n\n**pcn!suggest [suggestion]** - Make a suggestion to the server\n\n**pcn!report** - Reports a user to the PlagueCraft Network Moderation Team\n\n**pcn!status** - Shows the PlagueCraft Network Server Status\n\n**pcn!apis** - Details the APIs used by this bot')
		.setThumbnail('https://plaguecraft.xyz/assets/img/logo.png')
		.setFooter(`PCN`)
		.setTimestamp();

		message.channel.send(helpEmbed);
	}
}