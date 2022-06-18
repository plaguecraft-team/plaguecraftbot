const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed, MessageAttachment } = require('discord.js');
const {isAuth,fetchGameData,updateInventory,fetchUsername} = require('../modules/wrapper');
// const fetch = require('node-fetch');
module.exports = {
    name: 'inventory',
    data: new SlashCommandBuilder()
        .setName("inventory")
        .setDescription("Update or see your inventory!")
        .addSubcommand(subcommand =>
            subcommand
                .setName("get")
                .setDescription("Get your inventory!")
                .addStringOption(option =>
                    option.setName("ign")
                        .setDescription("Your IGN")
                        .setRequired(true)
                        ))
        .addSubcommand(subcommand =>
            subcommand
                .setName("update")
                .setDescription("Update your inventory")
                .addStringOption(option =>
                    option
                        .setName("sword")
                        .setDescription("The slot number (1-9) of your item")
                        .setRequired(true))
                .addStringOption(option =>
                    option
                        .setName("concrete1")
                        .setDescription("The slot number (1-9) of your item")
                        .setRequired(true))
                .addStringOption(option =>
                    option
                        .setName("concrete2")
                        .setDescription("The slot number (1-9) of your item")
                        .setRequired(true))
                .addStringOption(option =>
                    option
                    .setName("pickaxe")
                    .setDescription("The slot number (1-9) of your item")
                    .setRequired(true))
                .addStringOption(option =>
                    option
                    .setName("bow")
                    .setDescription("The slot number (1-9) of your item")
                    .setRequired(true))
                .addStringOption(option =>
                    option
                    .setName("gap")
                    .setDescription("The slot number (1-9) of your item")
                    .setRequired(true))
        ),
    info: {
        name: 'inventory',
        description: 'Manage your inventory!',
        usage: "/inventory [get|update] [items]",
        requireArgs: true
    },
    async execute(interaction, args, author) {
        if (args.length == 1) {
            const itemData = await fetchGameData("bridges", args[0]);
            if (!itemData) return interaction.reply({content:`Uh oh`, ephemeral:true});

            const e = new MessageEmbed()
            .setTitle(`${args[0]}'s Inventory`)
            .setAuthor({ name: `${author.username}`, iconURL: author.avatarURL()})
            .setColor()
            .setFooter({ text: `PlagueCraft Network`, iconURL: `https://plaguecraft.xyz/static/img/logo.png` })
            .setTimestamp();
            
            const attachment = new MessageAttachment(Buffer.from(itemData.user.hotbarImage.split(',')[1], 'base64'), 'hotbar.png');
            e.setImage(`attachment://hotbar.png`)
            e.addFields(
                {
                    "name": "⚔",
                    "value": "Slot " + itemData.user.itemData.sword,
                    inline: true
                },
                {
                    "name": "⛏",
                    "value": "Slot " + itemData.user.itemData.pickaxe,
                    inline: true
                },
                {
                    "name": "🏹",
                    "value": "Slot " + itemData.user.itemData.bow,
                    inline: true
                },
                {
                    "name": "<:concrete:979718826767810560>",
                    "value": "Slots " + itemData.user.itemData.concrete1 + " & " + itemData.user.itemData.concrete2,
                    inline: true
                },
                {
                    "name": "🍎",
                    "value": "Slot " + itemData.user.itemData.gap,
                    inline: true
                }
            )

            return interaction.reply({embeds:[e],files:[attachment]})
        } else {
            skip = false;
            if (args.findIndex(v => parseInt(v) > 9 || parseInt(v) < 1) != -1) return interaction.reply({content:'Sorry, you provided a slot number bigger than 9 or smaller than 1!',ephemeral:true});
            args.forEach((val, ind) => {
                if (!skip && args.indexOf(val) != args.lastIndexOf(val)) {
                    skip = true;
                } 
            })

            if (skip) return interaction.reply({content: 'Uh oh! You provided a slot number twice.', ephemeral:true })
            else if (await isAuth(author.id)) {
                const obj = {
                    "user": await fetchUsername(author.id),
                    "itemData": {
                        "sword": `${Math.round(args[0] - 1)}`,
                        "concrete1": `${Math.round(args[1] - 1)}`,
                        "concrete2": `${Math.round(args[2] - 1)}`,
                        "pickaxe": `${Math.round(args[3] - 1)}`,
                        "bow": `${Math.round(args[4] - 1)}`,
                        "gap": `${Math.round(args[5] - 1)}`
                    }
                }

                await updateInventory(obj, author.id)
                .then(function(b) {
                    if (b) return interaction.reply({content:'Updated your inventory :)',ephemeral:true})
                    else return interaction.reply({content:'Uh oh! Something went wrong when updating your inventory.',ephemeral:true})
                })
            } else return interaction.reply({ content: "Nice try. You're not linked to that account. Now everyone can see you."});
        }
    }
}