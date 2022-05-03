const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');

module.exports = {
    name: 'bug',
    data: new SlashCommandBuilder()
    .setName(`bug`)
    .setDescription(`Report a bug!`)
    .addStringOption(option => 
        option.setName('bug')
            .setDescription("Bug to report")
            .setRequired(true)),
    info: {
        "name": 'Bug',
        "description": "Report a bug!",
        "image": null,
        "usage": "/bug [bug-to-report]",
        "requireArgs": true
    },
    async execute(interaction, args, author) {
        const bug = args.slice(0).join(' ');
        const channel = interaction.client.channels.cache.find(channel => channel.id == "971055728230039552");
        interaction.client.users.fetch(`${author.id}`).then(async function(result) {
            const imgUrl = result.displayAvatarURL();

            const bugEmbed = new MessageEmbed()
            .setTitle(`Bug Report!`)
            .setDescription(`**${author} submitted a bug report!**\n\n**Bug:** ${bug}`)
            .setFooter({ text: `PlagueCraft Network`, iconURL: `https://plaguecraft.xyz/static/img/logo.png` })
            .setTimestamp();

            channel.send({ embeds: [bugEmbed], ephemeral: true });
            return await interaction.reply("Thanks for your report! We'll look into it :)");
        })
    }
}