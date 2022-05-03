const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');

module.exports = {
    name: 'suggest',
    info: {
        "name": "Suggest",
        "usage": "/suggest [suggestions]",
        "image": null,
        "description": "Suggest features/games to us!",
        "requireArgs": true
    },
    data: new SlashCommandBuilder()
        .setName("suggest")
        .setDescription("Suggest features/games to us!")
        .addStringOption(option =>
            option.setName("suggestion")
                .setDescription("What you're suggesting to us")
                .setRequired(true)),
    async execute(interaction, args, author) {
        const channel = interaction.client.channels.cache.find(channel => channel.id == "971055728230039552"); // Find the suggestions channel

        const messageArgs = args.join(' ');
        const suggestionEmbed = new MessageEmbed() // embed
        .setTitle(`New Suggestion!`)
        .setAuthor({ name: `${author.username}`, iconURL: author.avatarURL()})
        .setDescription(`${messageArgs}`)
        .setFooter({ text: `PlagueCraft Network`, iconURL: `https://plaguecraft.xyz/static/img/logo.png` })
        .setTimestamp();

        channel.send({ embeds: [suggestionEmbed] });
        return interaction.reply("Thanks! We've submitted your suggestion :)")
    }
}