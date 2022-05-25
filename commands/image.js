const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed, MessageAttachment } = require('discord.js');
const fetch = require('node-fetch');
module.exports = {
    name: 'image',
    data: new SlashCommandBuilder()
        .setName("image")
        .setDescription("Get your player hotbar image!")
        .addStringOption(option => 
            option.setName("player")
                .setDescription("The IGN of the player to fetch a hotbar image for")
                .setRequired(true)),
    info: {
        name: 'image',
        description: 'Get your player hotbar image!',
        usage: "/image [ign]",
        requireArgs: true
    },
    async execute(interaction, args, author) {
        await fetch ("https://api.plaguecraft.xyz/bridges/image?username=" + args[0])
        .then(async function(response) {
            if (response.status != 200) return interaction.reply({"content": "Hey friend. That didn't work. If you have joined the server before, please let the devs know this happened!", ephemeral: true});
            else {
                const image = await response.arrayBuffer();
                const attachment = new MessageAttachment(Buffer.from(image, 'utf-8'), 'hotbar.png');

                const e = new MessageEmbed()
                .setTitle(`${args[0]}'s Hotbar`)
                .setAuthor({ name: `${author.username}`, iconURL: author.avatarURL()})
                .setImage(`attachment://hotbar.png`)
                .setColor()
                .setFooter({ text: `PlagueCraft Network`, iconURL: `https://plaguecraft.xyz/static/img/logo.png` })
                .setTimestamp();
                return interaction.reply({ embeds: [e], files: [attachment] });
            }
        });
    }
}