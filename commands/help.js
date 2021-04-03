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
		.setDescription('The PlagueCraft Network is a Minecraft Network of gamemodes, with things like UHC, SkyWars, and more!\nThis command details our Bot commands.\n\nOur prefix is pcn!\n\n**pcn!help** - This embed lol\n\n**pcn!econlookup [mc-user]** - Allows you to lookup user economy stats in the PlagueCraft Network backend\n\n**pcn!swlookup [mc-user]** - Allows you to lookup user SkyWars stats in the PlagueCraft Network Backend')
		.setFooter(`PCN`)
		.setTimestamp()
		.setThumbnail('https://plaguecraft.xyz/assets/img/logo.png')

		messages.channel.send(helpEmbed);
	}
}