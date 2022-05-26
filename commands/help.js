const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');
module.exports = {
	name: 'help',
	data: new SlashCommandBuilder()
		.setName("help")
		.setDescription("Find out what all these commands do!")
		.addStringOption(option =>
			option.setName("command")
				.setDescription("Command to search for")
				.setRequired(true)),
	info: {
		"name": "Help",
		"description": "Find out what all these commands do!",
		"usage": "/help [command]",
		"image": null,
		"requireArgs": true
	},
	async execute(interaction, args, author) {
		try {
			var command = require(__dirname + `/${args[0]}.js`);
		} catch(err) {
			if(err) {
				return interaction.reply(`Sorry, something went wrong. That command likely doesn't exist on the server.`)
			}
		}

		if (!command.info) return interaction.reply(`Sorry, something went wrong. That command likely doesn't exist on the server.`)
	
			const helpEmbed = new MessageEmbed()
			.setTitle(`Command Help - ${command.info.name}`)
			.setDescription(command.info.description)
			.addFields(
				{ name: 'Usage', value: `${command.info.usage}` }
			)
			.setColor(`#2c1178`)
			.setFooter({ text: `PlagueCraft Network`, iconURL: `https://plaguecraft.xyz/static/img/logo.png` })
			.setTimestamp();
	
			if(command.info.image !== null) {
				helpEmbed.setImage(command.info.image)
			}
	
			return await interaction.reply({ embeds: [ helpEmbed ] })
	}
}