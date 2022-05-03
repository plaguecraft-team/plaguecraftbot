const { SlashCommandBuilder } = require('@discordjs/builders');
module.exports = {
	name: 'ip',
	data: new SlashCommandBuilder()
		.setName('ip')
		.setDescription('Responds with the PCN IP'),
	info: {
		"name": "IP",
		"description": "Responds with the PCN IP",
		"image": null,
		"requireArgs": null,
		"usage": "/ip"
	},
	async execute(interaction, author) {
		return await interaction.reply(`Hey ${message.author}, the IP is **play.plaguecraft.xyz**!`)
	}
}