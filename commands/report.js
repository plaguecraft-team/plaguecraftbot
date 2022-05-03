const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');

const player = require('minecraft-player');
module.exports = {
	name: 'report',
	data: new SlashCommandBuilder()
		.setName("report")
		.setDescription("Report a player!")
		.addStringOption(option => 
			option.setName("player")
				.setDescription("The IGN of the player you want to report")
				.setRequired(true))
		.addStringOption(option =>
			option.setName("reason")
				.setDescription("Why you're reporting this user")
				.setRequired(true)),
	info: {
		name: 'report',
		description: "Report a player!",
		usage: "/report [ign] [reason]",
		requireArgs: true,
		image: null
	},
	async execute(interaction, args, author) {
		const { uuid } = await player(`${args[0]}`)
		const reason = args.slice(1).join(' ');

		const reportEmbed = new MessageEmbed()
		.setTitle(`In-Game Player Report!`)
		.setDescription(reason)
		.addFields(
			{ name: 'Reported User', value: args[0] },
			{ name: 'Reporter', value: author.tag },
			{ name: 'Reported Users UUID', value: uuid }
		)
		.setFooter({ text: `PlagueCraft Network`, iconURL: `https://plaguecraft.xyz/static/img/logo.png` })
		.setTimestamp();

		const channel = interaction.client.channels.cache.find(channel => channel.id == "971055728230039552")
		channel.send({ embeds: [reportEmbed]});
		return await interaction.reply({ content: "We reported " + args[0] + " to the team for you. Someone from the team may reach out for more information.", ephemeral: true });
	}
}