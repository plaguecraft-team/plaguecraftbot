const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');
const {isAuth,fetchGameData} = require('../modules/wrapper')

module.exports = {
    name: 'stats',
    data: new SlashCommandBuilder()
        .setName("stats")
        .setDescription("Get your player stats!")
        .addStringOption(option => 
            option.setName("player")
                .setDescription("The IGN of the player to fetch stats for")
                .setRequired(true))
        .addStringOption(option => 
            option.setName("game")
                .setDescription("The game to fetch stats for")
                .setRequired(true)
                .addChoices(
                    {
                        "name": "Bridges",
                        "label": "Bridges",
                        "value": "Bridges"
                    },
                    {
                        "name": "TNTRUN",
                        "label": "TNTRUN",
                        "value": "TNTRUN"
                    }
                )),
    info: {
        name: 'stats',
        description: 'Get your player stats!',
        usage: "/stats [ign] [game]",
        requireArgs: true
    },
    async execute(interaction, args, author) {
        if (await isAuth(author.id)) {
            const embed = new MessageEmbed()
            .setTitle(`${args[0]} - ${args[1]} Player Stats`)
            .setAuthor({ name: `${author.username}`, iconURL: author.avatarURL()})
            .setColor()
            .setFooter({ text: `PlagueCraft Network`, iconURL: `https://plaguecraft.xyz/static/img/logo.png` })
            .setTimestamp();
            if (args[1].toLowerCase() == "bridges") {
                var d = await fetchGameData("bridges", args[0])
                embed.addFields(
                    {
                        "name": "Kills",
                        "value": d.user.kills,
                        "inline": true
                    }, 
                    {
                        "name": "Points",
                        "value": d.user.points,
                        "inline": true
                    }
                )
            } else if (args[1].toLowerCase() == "tntrun") {
                var d = await fetchGameData("tntrun", args[0])
                embed.addFields(
                    {
                        "name": "Points",
                        "value": d.points,
                        "inline": true
                    }
                )
            }

            return interaction.reply({embeds:[embed]})
        } else return interaction.reply();
    }
}