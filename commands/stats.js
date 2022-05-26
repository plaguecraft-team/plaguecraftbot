const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');
const fetch = require('node-fetch');
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
        await fetch("https://api.plaguecraft.xyz/" + args[1].toLowerCase() + "?username=" + args[0], {
            method: 'get',
            headers: {
                'content-type': 'application/json'
            }
        }).then(async function(response) {
            if (response.status != 200) return interaction.reply({"content": "Hey friend. That didn't work. If you have joined the server before, please let the devs know this happened!", ephemeral: true});
            else {
                const j = await response.json();
                const embed = new MessageEmbed()
                .setTitle(`${args[0]} - ${args[1]} Player Stats`)
                .setAuthor({ name: `${author.username}`, iconURL: author.avatarURL()})
                .setColor()
                .setFooter({ text: `PlagueCraft Network`, iconURL: `https://plaguecraft.xyz/static/img/logo.png` })
                .setTimestamp();
                if (args[1].toLowerCase() == "bridges") {
                    embed.addFields(
                        {
                            "name": "Kills",
                            "value": j.user.kills,
                            "inline": true
                        }, 
                        {
                            "name": "Points",
                            "value": j.user.points,
                            "inline": true
                        }
                    )
                } else if (args[1].toLowerCase() == "tntrun") {
                    embed.addFields(
                        {
                            "name": "Points",
                            "value": j.points,
                            "inline": true
                        }
                    )
                }

                return interaction.reply({ embeds: [embed] });
            }
        });
    }
}